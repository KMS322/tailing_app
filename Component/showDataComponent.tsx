import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import BleManager, {
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleDisconnectPeripheralEvent,
} from 'react-native-ble-manager';
const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const CHARACTERISTIC_UUID_RX = '6e400002-b5a3-f393-e0A9-e50e24dcca9e';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import {useDeviceIdContext} from '../AppContext';

const ShowDataComponent = ({route}) => {
  const {deviceId, setDeviceId} = useDeviceIdContext();
  const [inputValue, setInputValue] = useState('');
  const [currentFactor, setCurrentFactor] = useState('');
  const {data} = route.params;
  const [connectedDeviceId, setConnectedDeviceId] = useState(deviceId);
  const id = 4;
  const [factor, setFactor] = useState(0);
  const [PPG, setPPG] = useState(0);
  const [pulse, setPulse] = useState(0);
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
        data: 20,
        unit: '%',
        warning: 0,
      },
    ],
  });
  const [totalData, setTotalData] = useState('');
  const [PPGData, setPPGData] = useState(0);
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
      const numbersAsStrings = asciiResult.split(',');
      const num1: number = parseInt(numbersAsStrings[0]);
      const num2: number = parseInt(numbersAsStrings[1]);
      let truncatedNum1: number = Math.floor(num1 / 100); // ppg
      let truncatedNum2: number = Math.round(num2 / 100);
      let num3: number = parseInt(numbersAsStrings[2]);
      setPPG(truncatedNum1);
      setFactor(num3);
      setPulse(truncatedNum2);
      setTotalData(asciiResult);
    }
    return;
  };

  const handleDisconnectedPeripheral = (
    event: BleDisconnectPeripheralEvent,
  ) => {
    setDatas(prev => ({
      ...prev,
      state: 0,
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
  const convertDataToByteArray = (data: string): number[] => {
    const byteArray: number[] = [];
    for (let i = 0; i < data.length; i++) {
      byteArray.push(data.charCodeAt(i));
    }
    return byteArray;
  };
  const sendData = (data: string, connectedDeviceId: string | null) => {
    console.log('입력한 데이터는 : ', inputValue);
    console.log('connectedDeviceId : ', connectedDeviceId);
    if (!connectedDeviceId) {
      console.log('연결된 장치가 없습니다.');
      return;
    } else {
      console.log('연결된 장치의 deviceID : ', connectedDeviceId);
    }

    const byteArray = convertDataToByteArray(data);
    // BLE 장치로 데이터 송신
    BleManager.write(
      connectedDeviceId,
      SERVICE_UUID,
      CHARACTERISTIC_UUID_RX,
      byteArray,
    )
      .then(() => {
        // 성공적으로 데이터를 씀
        console.log('데이터를 BLE 장치로 성공적으로 보냈습니다.', data);
      })
      .catch(error => {
        // 데이터 쓰기 중 오류 발생
        console.error('데이터를 BLE 장치로 보내는 동안 오류 발생:', error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.name_box}>
          <Text style={styles.pet_breed}>{data.breed}</Text>
          <Text style={styles.pet_name}>{data.name}</Text>
        </View>
        <View style={styles.img_box}>
          <Image
            source={require('../assets/images/battery_img.png')}
            style={styles.img}
          />
          <Image
            source={require('../assets/images/bluetooth_img.png')}
            style={styles.img}
          />
          <Image
            source={require('../assets/images/check_img.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.input_box}>
          <TextInput
            placeholderTextColor="#1EA3D6"
            onChangeText={text => setInputValue(text)}
            value={inputValue}
            keyboardType="numeric"
            style={{...styles.inputText, color: 'white'}}
          />
          <Pressable
            style={styles.scanButton}
            // onPress={handleSendData}
            onPress={() => {
              sendData(inputValue, connectedDeviceId);
              setCurrentFactor(inputValue);
              setInputValue('');
            }}
            android_ripple={{color: 'lightgray'}}>
            <Text style={styles.scanButtonText}>전송</Text>
          </Pressable>
        </View>
        <Text style={styles.factor_text}>Factor : {currentFactor}</Text>
        <View style={styles.data_container}>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img1.png')}
              style={styles.icon_img}
            />
            <Text style={styles.data_num}>{pulse}</Text>
            <Text style={styles.data_name}>HEART RATE</Text>
          </View>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img2.png')}
              style={styles.icon_img}
            />
            <Text style={styles.data_num}>{PPG}%</Text>
            <Text style={styles.data_name}>SPO2</Text>
          </View>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img3.png')}
              style={styles.icon_img}
            />
            {/* <Text style={styles.data_num}></Text>
            <Text style={styles.data_name}>BREATHING</Text> */}
            <Text style={styles.data_num}>{factor}</Text>
            <Text style={styles.data_name}>Received factor</Text>
          </View>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img4.png')}
              style={styles.icon_img}
            />
            {/* <Text style={styles.data_num}></Text>
            <Text style={styles.data_name}>TEMPERATURE</Text> */}
            <Text style={styles.data_num}>{totalData}</Text>
            <Text style={styles.data_name}>Total Data</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
  },
  name_box: {
    width: '90%',
    height: 80,
    backgroundColor: '#0B3E53',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-around',
    borderRadius: 15,
    marginTop: 20,
  },
  pet_breed: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
  },
  pet_name: {
    fontSize: 25,
    fontWeight: '700',
    color: '#1EA3D6',
  },
  img_box: {
    width: 130,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  img: {
    width: 41,
    height: 22,
  },
  data_container: {
    width: '90%',
    height: 400,
    borderWidth: 1,
    borderColor: '#1EA3D6',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    marginTop: 20,
  },
  data_box: {
    width: '40%',
    height: 150,
    display: 'flex',
    alignItems: 'center',
  },
  icon_img: {
    width: '40%',
    height: '40%',
  },
  data_num: {
    fontSize: 25,
    fontWeight: '700',
    color: '#1EA3D6',
  },
  data_name: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginTop: 20,
  },
  input_box: {
    width: '80%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  inputText: {
    width: 150,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#12B6D1',
  },
  scanButton: {
    width: 150,
    // width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B3E53',
    borderRadius: 6,
  },
  scanButtonText: {
    fontSize: 20,
    color: 'white',
  },
  factor_text: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
  },
});
export default ShowDataComponent;
