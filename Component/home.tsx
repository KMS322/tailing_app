import React, {useState} from 'react';
import {View, StyleSheet, Image, FlatList, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const HomeComponent = () => {
  const carouselImgs = [
    {
      id: 1,
      src: require('../assets/images/banner_img1.jpg'),
    },
    {
      id: 2,
      src: require('../assets/images/banner_img2.jpg'),
    },
    {
      id: 3,
      src: require('../assets/images/banner_img3.jpg'),
    },
  ];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const renderCarouselItem = ({item, index}) => (
    <Image
      source={item.src}
      style={[
        styles.carousel_img,
        {
          width: index === currentImgIndex ? '95%' : '5%',
        },
      ]}
    />
  );

  const handleTouchStart = event => {
    // 터치 시작 지점 처리
    const {locationX} = event.nativeEvent;
    console.log('Touch start at X:', locationX);
  };

  const handleTouchEnd = event => {
    // 터치 끝 지점 처리
    const {locationX} = event.nativeEvent;
    console.log('Touch end at X:', locationX);
  };
  const handleTouch = event => {
    const {nativeEvent} = event;
    console.log('nativeEvent : ', nativeEvent);

    // 첫 번째 터치가 끝났을 때만 이벤트 처리
    // if (gestureState && gestureState.state === 'ENDED') {
    //   // 화면 전체의 가로 너비를 기준으로 왼쪽 또는 오른쪽으로 터치가 발생했는지 확인
    //   const isSwipeLeft = dx < 0;

    //   // 현재 이미지 인덱스를 복사
    //   let newIndex = currentImgIndex;

    //   // 좌에서 우로 스와이프할 때
    //   if (isSwipeLeft) {
    //     newIndex = Math.max(0, currentImgIndex - 1); // 최소 인덱스 0으로 제한
    //     console.log('left side currentImgIndex', currentImgIndex);
    //   } else {
    //     // 우에서 좌로 스와이프할 때
    //     newIndex = Math.min(carouselImgs.length - 1, currentImgIndex + 1); // 최대 인덱스로 제한
    //     console.log('right side currentImgIndex', currentImgIndex);
    //   }

    //   // 인덱스 업데이트
    //   setCurrentImgIndex(newIndex);
    // }
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.carousel_container}
        data={carouselImgs}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCarouselItem}
        horizontal
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        onResponderGrant={handleTouchStart}
        onResponderRelease={handleTouchEnd}
        // onResponderGrant={handleTouch}
        snapToAlignment="start"
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  carousel_container: {
    width: '100%',
    height: 180,

    borderWidth: 1,
    borderColor: 'white',
  },
  carousel_img: {
    width: '95%',
    height: '100%',
    borderWidth: 3,
    borderColor: 'red',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
export default HomeComponent;
