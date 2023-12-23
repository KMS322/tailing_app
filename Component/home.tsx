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
const windowWidth = Dimensions.get('window').width;
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import {useNavigation} from '@react-navigation/native';

const HomeComponent = () => {
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
      },
    ],
  });

  const navigation = useNavigation();
  const handleBle = () => {
    navigation.navigate('BleConnect');
  };
  const goDetail = () => {
    navigation.navigate('Detail', {id: 1});
  };
  const goRegister = () => {
    navigation.navigate('PetRegister');
  };
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
    // if (data.value) {
    //   const asciiResult: string = convertToAscii(data.value);
    //   const numbers = asciiResult.match(/-?\d+/g);
    //   setDatas(prev => ({
    //     ...prev,
    //     connectState: 1,
    //     healthDatas: [
    //       {...prev.healthDatas[0], data: parseInt(numbers[0])},
    //       {...prev.healthDatas[1], data: parseInt(numbers[1])},
    //       {...prev.healthDatas[2], data: parseInt(numbers[2])},
    //       {...prev.healthDatas[3], data: parseInt(numbers[3])},
    //     ],
    //   }));
    // }
  };
  const handleDisconnectedPeripheral = (
    event: BleDisconnectPeripheralEvent,
  ) => {
    setDatas(prev => ({
      ...prev,
      connectState: 0,
    }));
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

  return (
    <>
      <View style={home_styles.container}>
        <View style={home_styles.header}>
          <Text style={home_styles.name}>크림오프 동물병원</Text>
          {/* <Image
            source={
              connectState
                ? require('../assets/images/home_connect_image1.png')
                : require('../assets/images/home_connect_image2.png')
            }
            style={home_styles.ble_image}
          /> */}
          <TouchableOpacity style={home_styles.ble_btn} onPress={handleBle}>
            <Text style={home_styles.btn_text}>Bluetooth</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={home_styles.pet_box} onPress={goDetail}>
          <Image
            source={require('../assets/images/home_dog_image1.png')}
            style={home_styles.box_image}
          />
          <View style={home_styles.text_container}>
            <Text style={home_styles.text_name}>건빵</Text>
            <Text style={home_styles.text_kind}>Maltese</Text>
            <Text style={home_styles.text_weight}>0.9kg</Text>
            <Text style={home_styles.text_neutral}>중성화 안함</Text>
            <Text style={home_styles.text_age}>Age : 4m</Text>
          </View>
          <View style={home_styles.icon_container}>
            <Image
              source={require('../assets/images/home_sex_image1.png')}
              style={home_styles.icon_sex}
            />
            <Image
              source={
                datas.healthDatas.some(item => item.warning === 1)
                  ? require('../assets/images/home_condition_image2.png')
                  : require('../assets/images/home_condition_image1.png')
              }
              style={home_styles.icon_condition}
            />
            <View style={home_styles.icon_state_box}>
              <TouchableOpacity onPress={handleBle}>
                {/* 블루투스 연결 */}
                {/* <Image
                  source={
                    datas.connectState
                      ? require('../assets/images/home_connect_image1.png')
                      : require('../assets/images/home_connect_image2.png')
                  }
                  style={home_styles.icon_connect}
                /> */}
              </TouchableOpacity>

              <Image
                source={require('../assets/images/home_battery_image1.png')}
                style={home_styles.icon_battery}
              />
            </View>
          </View>

          <View style={home_styles.health_container}>
            {datas.healthDatas.map(healthData => {
              const imageNames: {[key: string]: any} = {
                bpm: require('../assets/images/home_bpm_image.png'),
                rpm: require('../assets/images/home_rpm_image.png'),
                spo2: require('../assets/images/home_spo2_image.png'),
                temp: require('../assets/images/home_temp_image.png'),
              };
              return (
                <TouchableOpacity
                  style={home_styles.health_state}
                  key={healthData.id}
                  onPress={() => {
                    // navigation.navigate('Detail', {id: healthData.id});
                  }}>
                  <Image
                    source={imageNames[healthData.name]}
                    style={home_styles.health_image}
                  />
                  <Text style={home_styles.health_data}>{healthData.data}</Text>
                  <Text style={home_styles.health_unit}>{healthData.unit}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={home_styles.empty_box} onPress={goRegister}>
          <Image
            source={require('../assets/images/home_plus_image.png')}
            style={home_styles.circle}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const home_styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: windowWidth * 0.86,
    height: 31,
    flexDirection: 'row',
    marginTop: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 70,
  },
  ble_image: {
    width: 15,
    height: 23,
  },
  ble_btn: {
    width: 95,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#12B6D1',
  },
  btn_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  pet_box: {
    width: windowWidth * 0.86,
    height: windowWidth * 0.48,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginTop: 45,
    position: 'relative',
  },
  box_image: {
    position: 'absolute',
    top: -15,
    left: 0,
    width: 143,
    height: 143,
  },
  text_container: {
    width: 134,
    height: 115,
    marginLeft: 160,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  text_name: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  text_kind: {
    fontSize: 13,
    color: '#717171',
    fontWeight: 'bold',
  },
  text_weight: {
    fontSize: 13,
    color: '#717171',
  },
  text_neutral: {
    fontSize: 13,
    color: '#717171',
  },
  text_age: {
    fontSize: 13,
    color: '#717171',
  },
  icon_container: {
    width: 59,
    height: 107,
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  icon_sex: {
    width: 23,
    height: 23,
    marginBottom: 20,
  },
  icon_condition: {
    width: 23,
    height: 23,
    marginBottom: 20,
  },
  icon_state_box: {
    width: 59,
    height: 18,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon_connect: {
    width: 11,
    height: 18,
  },
  icon_battery: {
    width: 34,
    height: 17,
  },
  health_container: {
    width: windowWidth * 0.86 * 0.96,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginLeft: 8,
  },
  health_state: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  health_image: {
    width: 20,
    height: 20,
  },
  health_data: {
    width: 20,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  health_unit: {
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 2,
  },
  empty_box: {
    width: windowWidth * 0.86,
    height: windowWidth * 0.44,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginTop: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 70,
    height: 70,
  },
});
export default HomeComponent;
