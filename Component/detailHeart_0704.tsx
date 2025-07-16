import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, InteractionManager } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import { useBLE } from './BLEContext';

type IRDataPoint = {
  timestamp: number;
  value: number;
};

const DetailHeart = ({ screen }: { screen: string }) => {
  const { state } = useBLE();
  const { chartData } = state;
  const [data, setData] = useState<IRDataPoint[]>([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const prevLengthRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const screenWidth = Dimensions.get('window').width;
  const pointsPerView = 100;
  const pointWidth = screenWidth / pointsPerView;
  const chartWidth = Math.max(screenWidth, pointsPerView * pointWidth);
  const chartHeight = 200;
  const padding = 40; // Y축 레이블을 위한 패딩 추가
  const graphHeight = chartHeight - padding;

  // Y축 범위 계산
  const getYAxisRange = () => {
    try {
      if (!data || data.length === 0) {
        return { min: 0, max: 20000 };
      }

      const values = data
        .map(point => point.value)
        .filter(value => typeof value === 'number' && !isNaN(value) && isFinite(value));

      if (values.length === 0) {
        return { min: 0, max: 20000 };
      }

      const min = Math.min(...values);
      const max = Math.max(...values);
      
      // 최소값과 최대값이 같은 경우 처리
      if (min === max) {
        return { min: Math.max(0, min - 1000), max: max + 1000 };
      }

      const padding = (max - min) * 0.1; // 10% 패딩
      return {
        min: Math.max(0, min - padding),
        max: max + padding
      };
    } catch (error) {
      console.error('Error in getYAxisRange:', error);
      return { min: 0, max: 20000 };
    }
  };

  // BLE 데이터를 그래프 데이터로 변환 - 50개씩 묶음 처리 + 1초 애니메이션
  useEffect(() => {
    try {
      if (!isAutoScrolling || !chartData || !Array.isArray(chartData) || chartData.length === 0) return;
      if (isAnimating) return; // 애니메이션 중이면 새로운 데이터 처리 안함

      const newDataCount = chartData.length - prevLengthRef.current;
      
      // 50개씩 묶인 데이터가 들어왔을 때만 처리
      if (newDataCount >= 50) {
        const newBatch = chartData.slice(-50); // 최근 50개 데이터
        
        // 애니메이션 시작
        animateData(newBatch);
      }
    } catch (error) {
      console.error('Error processing BLE data:', error);
    }
  }, [chartData.length, isAutoScrolling, isAnimating]);

  // 자동 스크롤 효과 - 안전한 구현
  useEffect(() => {
    if (!isAutoScrolling) return;

    const scrollInterval = setInterval(() => {
      InteractionManager.runAfterInteractions(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: false });
        }
      });
    }, 2000); // 2초 간격으로 더 늘려서 안정성 확보

    return () => {
      clearInterval(scrollInterval);
    };
  }, [isAutoScrolling]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);



  // Y축 레이블 생성
  const getYLabels = () => {
    try {
      const { min, max } = getYAxisRange();
      const range = max - min;
      if (range <= 0) return ['0', '5000', '10000', '15000', '20000'];

      const step = range / 4;
      return Array.from({ length: 5 }, (_, i) => 
        Math.round(min + step * i).toString()
      ).reverse();
    } catch (error) {
      console.error('Error generating Y labels:', error);
      return ['0', '5000', '10000', '15000', '20000'];
    }
  };

  // SVG Path 생성 - 메모이제이션 최적화
  const createPath = useMemo(() => {
    try {
      if (!data || data.length === 0) return '';
      
      const { min, max } = getYAxisRange();
      const range = max - min;
      
      if (range <= 0) return '';

      // 데이터 포인트 수를 줄임 (모든 포인트를 사용하지 않고 일부만 사용)
      const step = Math.max(1, Math.floor(data.length / 100));
      const points = data
        .filter((_, index) => index % step === 0) // 데이터 포인트 샘플링
        .filter(point => typeof point.value === 'number' && !isNaN(point.value) && isFinite(point.value))
        .map((item, index) => {
          const x = index * pointWidth * step + padding;
          const y = chartHeight - padding - ((item.value - min) / range) * graphHeight;
          return `${x},${y}`;
        });

      return points.length > 0 ? `M ${points.join(' L ')}` : '';
    } catch (error) {
      console.error('Error creating path:', error);
      return '';
    }
  }, [data, pointWidth, padding, chartHeight, graphHeight]);

  // 최적화된 데이터 설정 함수
  const setDataOptimized = useCallback((newDataPoints: IRDataPoint[]) => {
    setData(prevData => {
      const updatedData = [...prevData, ...newDataPoints];
      const slicedData = updatedData.slice(-100);
      
      // 실제로 변경이 있을 때만 업데이트
      if (prevData.length === slicedData.length && 
          prevData.every((item, index) => 
            item.value === slicedData[index]?.value && 
            item.timestamp === slicedData[index]?.timestamp
          )) {
        return prevData; // 변경 없으면 이전 데이터 반환
      }
      
      return slicedData;
    });
  }, []);

  const animateData = (newBatch: number[]) => {
    // 이미 애니메이션 중이면 중단
    if (isAnimating) {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    
    setIsAnimating(true);
    
    let currentIndex = 0;
    const startTime = Date.now();
    const duration = 1000; // 1초
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 현재까지 표시해야 할 포인트 수 계산
      const targetIndex = Math.floor(progress * newBatch.length);
      
      // 새로운 포인트들 추가
      while (currentIndex < targetIndex && currentIndex < newBatch.length) {
        const newDataPoint: IRDataPoint = {
          timestamp: Date.now() + currentIndex * 20,
          value: newBatch[currentIndex]
        };
        
        setDataOptimized([newDataPoint]);
        currentIndex++;
      }
      
      // 애니메이션 계속
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // 애니메이션 완료
        prevLengthRef.current = chartData.length;
        setIsAnimating(false);
        animationFrameRef.current = null;
      }
    };
    
    // 애니메이션 시작
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const yLabels = getYLabels();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chart_container}>
        <View style={styles.chart_wrapper}>
          <View style={styles.yAxisLabels}>
            {yLabels.map((label, index) => (
              <Text key={index} style={styles.yAxisLabel}>
                {label}
              </Text>
            ))}
          </View>
          <ScrollView 
            ref={scrollViewRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.graphContainer}
          >
            <Svg width={chartWidth} height={chartHeight}>
              {/* 그리드 라인 */}
              {yLabels.map((_, index) => (
                <Line
                  key={index}
                  x1={padding}
                  y1={padding + (graphHeight * index) / 4}
                  x2={chartWidth}
                  y2={padding + (graphHeight * index) / 4}
                  stroke="#E0E0E0"
                  strokeWidth="1"
                />
              ))}
              
              {/* 데이터 라인 */}
              {data.length > 0 && (
                <Path
                  d={createPath}
                  stroke="#F5B75C"
                  strokeWidth="2"
                  fill="none"
                />
              )}
            </Svg>
          </ScrollView>
        </View>
        
        {/* 자동 스크롤 제어 버튼 */}
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={() => setIsAutoScrolling(!isAutoScrolling)}
        >
          <Text style={styles.playButtonText}>
            {isAutoScrolling ? '정지' : '재생'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
  },
  chart_container: {
    paddingHorizontal: 0, 
    paddingVertical: 12, 
    backgroundColor: '#ffffff',
    borderRadius: 0,
    marginHorizontal: 0, 
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chart_wrapper: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'center',
  },
  graphContainer: {
    flex: 1,
  },
  yAxisLabels: {
    width: 50,
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginRight: 5,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    paddingRight: 5,
  },
  playButton: {
    backgroundColor: '#F5B75C',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 16,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DetailHeart; 