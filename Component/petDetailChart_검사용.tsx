import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleDisconnectPeripheralEvent,
} from 'react-native-ble-manager';
import {LineChart} from 'react-native-chart-kit';
import {useNavigation, useRoute} from '@react-navigation/native';
import DetailRecordComponent from './detailRecord';
const windowWidth = Dimensions.get('window').width;
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const PetDetailComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = 4;
  const [datas, setDatas] = useState({
    connectState: 0,
    healthDatas: [
      {
        id: 1,
        name: 'bpm',
        data: 0,
        unit: 'BPM',
        warning: 0,
      },
      {
        id: 2,
        name: 'rpm',
        data: 0,
        unit: 'RPM',
        warning: 0,
      },
      {
        id: 3,
        name: 'temp',
        data: 0,
        unit: '℃',
        warning: 0,
      },
      {
        id: 4,
        name: 'spo2',
        data: 0,
        unit: '%',
        warning: 0,
        cnt: 0,
      },
    ],
  });
  const _datas = datas.healthDatas.filter(data => data.id !== id);
  const [graphDatas, setGraphDatas] = useState<number[]>([50]);

  const [graphLabels, setGraphLabels] = useState([
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
  ]);

  const convertToAscii = (numbers: number[]): string => {
    const asciiChars: string[] = numbers.map(number =>
      String.fromCharCode(number),
    );
    const asciiString: string = asciiChars.join('');
    return asciiString;
  };

  const handleUpdateValueForCharacteristic = (
    data: BleManagerDidUpdateValueForCharacteristicEvent,
  ) => {
    if (data.value) {
      const asciiResult: string = convertToAscii(data.value);
      // const numbers = asciiResult.match(/-?\d+/g);
      const numbersAsStrings = asciiResult.split(',');
      const num1: number = parseInt(numbersAsStrings[0]);
      const num2: number = parseInt(numbersAsStrings[1]);
      let truncatedNum1: number = Math.floor(num1 / 100);
      let truncatedNum2: number = Math.round((num2 / 100) * 20);
      let num3: number = parseInt(numbersAsStrings[2]);
      let temp = 0;
      let pulse = 0;
      if (truncatedNum1 >= 100 && truncatedNum1 <= 104) {
        truncatedNum1 -= 4;
      } else if (truncatedNum1 > 104) {
        truncatedNum1 = Math.floor(Math.random() * 1 + 96);
      }

      if (truncatedNum1 > 90) {
        temp = Math.floor(Math.random() * 2 + 35);
        // pulse = Math.floor(Math.random() * 2 + 73);
      }

      if (datas.healthDatas[3].cnt == num1) {
        truncatedNum1 = 0;
        temp = 0;
        pulse = 0;
        setDatas(prev => ({
          ...prev,
          healthDatas: [
            {...prev.healthDatas[0], data: pulse},
            {...prev.healthDatas[1], data: 0},
            {...prev.healthDatas[2], data: temp},
            {...prev.healthDatas[3], data: truncatedNum1},
          ],
        }));
        return;
      } else {
        setDatas(prev => ({
          ...prev,
          connectState: 1,
          healthDatas: [
            {...prev.healthDatas[0], data: truncatedNum2},
            {...prev.healthDatas[1], data: 0},
            {...prev.healthDatas[2], data: temp},
            {...prev.healthDatas[3], data: truncatedNum1},
          ],
        }));
        datas.healthDatas[3].cnt = num1;
      }
      console.log('num1 : ', num1);
      console.log('cnt : ', datas.healthDatas[3].cnt);
    }
  };

  const handleDisconnectedPeripheral = (
    event: BleDisconnectPeripheralEvent,
  ) => {
    setDatas(prev => ({
      ...prev,
      state: 0,
    }));
  };

  const imageNames: {[key: string]: any} = {
    bpm: require('../assets/images/home_bpm_image.png'),
    rpm: require('../assets/images/home_rpm_image.png'),
    spo2: require('../assets/images/home_spo2_image.png'),
    temp: require('../assets/images/home_temp_image.png'),
  };

  useEffect(() => {
    if (bleManagerEmitter) {
      const listeners = [
        bleManagerEmitter.addListener(
          'BleManagerDidUpdateValueForCharacteristic',
          handleUpdateValueForCharacteristic,
        ),
        bleManagerEmitter.addListener(
          'BleManagerDisconnectPeripheral',
          handleDisconnectedPeripheral,
        ),
      ];

      return () => {
        for (const listener of listeners) {
          listener.remove();
        }
      };
    }
  }, []);
  // useEffect(() => {
  //   if (graphLabels.length < 15) {
  //     setGraphDatas(prevGraphDatas => [
  //       ...prevGraphDatas,
  //       datas.healthDatas[id - 1].data,
  //     ]);
  //     setGraphLabels(prevGraphLabels => [...prevGraphLabels, cnt]);
  //   } else {
  //     setGraphDatas(prevGraphDatas => {
  //       const newGraphDatas = [
  //         ...prevGraphDatas.slice(1),
  //         datas.healthDatas[id].data,
  //       ];
  //       return newGraphDatas;
  //     });

  //     setGraphLabels(prevGraphLabels => {
  //       const newGraphLabels = [...prevGraphLabels.slice(1), cnt];
  //       return newGraphLabels;
  //     });
  //   }
  //   cnt++;
  // }, [datas.healthDatas[id - 1].data]);
  return (
    <>
      <View style={styles.container}>
        {/* <LineChart
          data={{
            labels: graphLabels,
            datasets: [
              {
                data: graphDatas,
                strokeWidth: 1,
              },
            ],
          }}
          xLabelsOffset={10}
          width={Dimensions.get('window').width * 0.85}
          height={154}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          yAxisLabel=""
          yAxisInterval={1}
          chartConfig={{
            width: 1,
            backgroundColor: '#ffffff',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2,
            color: (opacity = 1) => `#009111`,
            labelColor: (opacity = 1) => `#009111`,
            propsForDots: {
              r: '0',
              strokeWidth: '0',
              stroke: '#009111',
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
            },
          }}
          bezier
          style={{
            borderRadius: 16,
            paddingRight: 2,
            paddingLeft: 0,
            paddingTop: 0,
            marginBottom: -20,
          }}
        /> */}
        <View style={styles.data_container}>
          <View style={styles.data_main}>
            <Image
              source={imageNames[datas.healthDatas[id - 1].name]}
              style={styles.data_main_image}
            />
            <Text style={styles.data_main_value}>
              {datas.healthDatas[id - 1].data}
            </Text>
            <Text style={styles.data_main_unit}>
              {datas.healthDatas[id - 1].unit}
            </Text>
            <Image
              source={
                datas.healthDatas[id - 1].warning === 1
                  ? require('../assets/images/home_condition_image2.png')
                  : require('../assets/images/home_condition_image1.png')
              }
              style={styles.data_main_state}
            />
          </View>

          <View style={styles.data_sub}>
            {_datas.map((_data, index) => {
              return (
                <View style={styles.data_sub_1} key={_data.id}>
                  <Image
                    source={
                      _data.warning === 1
                        ? require('../assets/images/home_condition_image2.png')
                        : require('../assets/images/home_condition_image1.png')
                    }
                    style={styles.data_sub_state}
                  />
                  {index === 1 ? (
                    <View style={styles.data_sub_2_1}>
                      <Image
                        source={imageNames[_data.name]}
                        style={styles.data_sub_image}
                      />
                      <Text style={styles.data_sub_value}>{_data.data}</Text>
                      <Text style={styles.data_sub_unit}>{_data.unit}</Text>
                    </View>
                  ) : (
                    <View style={styles.data_sub_2}>
                      <Image
                        source={imageNames[_data.name]}
                        style={styles.data_sub_image}
                      />
                      <Text style={styles.data_sub_value}>{_data.data}</Text>
                      <Text style={styles.data_sub_unit}>{_data.unit}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        <DetailRecordComponent />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.86,
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  data_container: {
    width: '100%',
    height: 112,
  },
  data_main: {
    width: '100%',
    height: 61,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#CBCBCB',
  },
  data_main_image: {
    width: 51,
    height: 48,
    marginLeft: 7,
  },
  data_main_value: {
    width: 58,
    textAlign: 'right',
    fontSize: 32,
    fontWeight: '500',
    color: '#4A4A4A',
    marginLeft: 14,
  },
  data_main_unit: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4A4A4A',
    marginLeft: 6,
  },
  data_main_state: {
    width: 33,
    height: 28,
    position: 'absolute',
    right: 6,
  },
  data_sub: {
    width: '100%',
    height: 51,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  data_sub_1: {
    width: '33.33%',
    height: '100%',
    alignItems: 'center',
  },
  data_sub_state: {
    width: 14,
    height: 12,
    marginTop: 3,
  },
  data_sub_2: {
    width: '100%',
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  data_sub_2_1: {
    width: '100%',
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#CBCBCB',
  },
  data_sub_image: {
    width: 24,
    height: 21,
    marginLeft: 3,
  },
  data_sub_value: {
    fontSize: 17,
    color: '#4A4A4A',
  },
  data_sub_unit: {
    fontSize: 12,
    color: '#4A4A4A',
    marginRight: 3,
  },
});
export default PetDetailComponent;
