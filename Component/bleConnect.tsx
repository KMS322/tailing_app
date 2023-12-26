/**
 * Sample BLE React Native App
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  Pressable,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS: string[] = [];
const windowWidth = Dimensions.get('window').width;
// const SERVICE_UUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const CHARACTERISTIC_UUID_RX = '6e400002-b5a3-f393-e0A9-e50e24dcca9e';
// const CHARACTERISTIC_UUID_TX = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';
const CHARACTERISTIC_UUID_TX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
// const targetDeviceId = 'A0:76:4E:E7:42:02';
// const targetDeviceId = 'A0:76:4E:E7:42:02';
// const targetDeviceId = 'A0:76:4E:E8:23:A6';
const targetDeviceId = 'A0:76:4E:E7:FC:6E';
// const targetDeviceId = 'A0:76:4E:E4:83:B2';
// const targetDeviceId = 'A0:76:4E:E4:48:8E';
// const targetDeviceName = 'BLE_test_esp32s3';
const targetDeviceName = 'ESP32_231001';
const ALLOW_DUPLICATES = true;
const convertToAscii = (numbers: number[]): string => {
  const asciiChars: string[] = numbers.map(number =>
    String.fromCharCode(number),
  );
  const asciiString: string = asciiChars.join('');
  return asciiString;
};
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
import HomeComponent from './home_origin';
import {parse} from 'react-native-svg';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'App needs access to your location for Bluetooth functionality.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
      // 위치 권한이 부여되었습니다. BLE 작업을 계속할 수 있습니다.
    } else {
      console.log('Location permission denied');
      // 위치 권한이 거부되었습니다. 적절한 처리를 해야 합니다.
    }
  } catch (err) {
    console.warn(err);
  }
}

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}
const initialAsciiString = '+11111,+222,+333';
////////////////////////////////////////////////////
const BleConnectComponent = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>(),
  );
  // const [rawDatas, setRawDatas] = useState(initialAsciiString);
  const [rawDatas, setRawDatas] = useState('');
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [connectedDeviceId, setConnectedDeviceId] = useState('');
  const [factor, setFactor] = useState(0);
  const [PPG, setPPG] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [pulse, setPulse] = useState(0);

  <HomeComponent bleData={rawDatas} />;

  peripherals.get;

  const addOrUpdatePeripheral = (id: string, updatedPeripheral: Peripheral) => {
    // new Map() enables changing the reference & refreshing UI.
    // TOFIX not efficient.
    setPeripherals(map => new Map(map.set(id, updatedPeripheral)));
  };

  const startScan = () => {
    if (!isScanning) {
      // reset found peripherals before scan
      setPeripherals(new Map<Peripheral['id'], Peripheral>());
      try {
        console.debug('[startScan] starting scan...');
        setIsScanning(true);
        BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
          matchMode: BleScanMatchMode.Sticky,
          scanMode: BleScanMode.LowLatency,
          callbackType: BleScanCallbackType.AllMatches,
        })
          .then(() => {
            console.debug('[startScan] scan promise returned successfully.');
          })
          .catch(err => {
            console.error('[startScan] ble scan returned in error', err);
          });
      } catch (error) {
        console.error('[startScan] ble scan error thrown', error);
      }
    }
  };

  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
  };

  const handleDisconnectedPeripheral = (
    event: BleDisconnectPeripheralEvent,
  ) => {
    let peripheral = peripherals.get(event.peripheral);
    if (peripheral) {
      console.debug(
        `[handleDisconnectedPeripheral][${peripheral.id}] previously connected peripheral is disconnected.`,
        event.peripheral,
      );
      addOrUpdatePeripheral(peripheral.id, {...peripheral, connected: false});
    }
    console.debug(
      `[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
    );
    // setRawDatas(0);
  };

  const handleUpdateValueForCharacteristic = (
    data: BleManagerDidUpdateValueForCharacteristicEvent,
  ) => {
    const asciiResult: string = convertToAscii(data.value);
    const numbersAsStrings = asciiResult.split(',');
    const num1: number = parseInt(numbersAsStrings[0]);
    const num2: number = parseInt(numbersAsStrings[1]);
    let truncatedNum1: number = Math.floor(num1 / 100); // ppg
    let truncatedNum2: number = Math.round((num2 / 100) * 20);
    let num3: number = parseInt(numbersAsStrings[2]);
    setPPG(truncatedNum1);
    setFactor(num3);
    setPulse(truncatedNum2);
  };

  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    if (peripheral.name === targetDeviceName) {
      addOrUpdatePeripheral(peripheral.id, peripheral);
    }
  };

  const togglePeripheralConnection = async (peripheral: Peripheral) => {
    if (peripheral && peripheral.connected) {
      try {
        // await BleManager.disconnect(peripheral.id);
        console.log('연결되었습니다.');
      } catch (error) {
        console.error(
          `[togglePeripheralConnection][${peripheral.id}] error when trying to disconnect device.`,
          error,
        );
      }
    } else {
      await connectPeripheral(peripheral);
      // await connectToDevice(peripheral);
    }
  };

  const connectPeripheral = async (peripheral: Peripheral) => {
    try {
      if (peripheral) {
        console.log('연결된 device의 peripheral.id : ', peripheral.id);
        console.log(
          '연결된 device의 peripheral.id의 타입 : ',
          typeof peripheral.id,
        );
        addOrUpdatePeripheral(peripheral.id, {...peripheral, connecting: true});
        await BleManager.connect(peripheral.id);
        console.debug(`[connectPeripheral][${peripheral.id}] connected.`);

        addOrUpdatePeripheral(peripheral.id, {
          ...peripheral,
          connecting: false,
          connected: true,
        });
        await BleManager.checkState().then(state =>
          console.log(`current BLE state = '${state}'.`),
        );
        console.debug(`[connectPeripheral][${peripheral.id}] connected.`);
        await BleManager.startNotification(
          peripheral.id,
          '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
          '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
        )
          .then(() => {
            // Success code
            console.log('Notification started');
          })
          .catch(error => {
            // Failure code
            console.log('에러는 : ', error);
          });

        await sleep(900);

        /* Test read current RSSI value, retrieve services first */
        const peripheralData = await BleManager.retrieveServices(peripheral.id);
        console.debug(
          `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
          peripheralData,
        );

        const rssi = await BleManager.readRSSI(peripheral.id);
        console.debug(
          `[connectPeripheral][${peripheral.id}] retrieved current RSSI value: ${rssi}.`,
        );

        if (peripheralData.characteristics) {
          for (let characteristic of peripheralData.characteristics) {
            if (characteristic.descriptors) {
              for (let descriptor of characteristic.descriptors) {
                try {
                  let data = await BleManager.readDescriptor(
                    peripheral.id,
                    characteristic.service,
                    characteristic.characteristic,
                    descriptor.uuid,
                  );
                  console.debug(
                    `[connectPeripheral][${peripheral.id}] descriptor read as:`,
                    data,
                  );
                } catch (error) {
                  console.error(
                    `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
                    error,
                  );
                }
              }
            }
          }
        }
        console.log('peripheral.connected : ', peripheral.connected);
        let p = peripherals.get(peripheral.id);
        if (p) {
          addOrUpdatePeripheral(peripheral.id, {...peripheral, rssi});
        }
        setConnectedDeviceId(peripheral.id);
      }
    } catch (error) {
      console.error(
        `[connectPeripheral][${peripheral.id}] connectPeripheral error`,
        error,
      );
      console.log('연결에 실패했다.');
    }
  };

  function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    try {
      BleManager.start({showAlert: false})
        .then(() => {
          console.debug('BleManager started.');
          requestLocationPermission();
        })
        .catch(error =>
          console.error('BeManager could not be started.', error),
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }

    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
      bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      ),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      ),
      bleManagerEmitter.addListener(
        'BleManagerConnectPeripheral',
        peripheral => {
          const isConnected = peripheral.connected;
          console.log('연결 상태 변경:', isConnected);

          // 연결 상태를 상태에 업데이트
          const updatedPeripheral = {
            ...peripheral,
            connected: isConnected,
          };
          addOrUpdatePeripheral(updatedPeripheral.id, updatedPeripheral);
        },
      ),
    ];

    handleAndroidPermissions();

    return () => {
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAndroidPermissions = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then(result => {
        if (result) {
          console.debug(
            '[handleAndroidPermissions] User accepts runtime permissions android 12+',
          );
        } else {
          console.error(
            '[handleAndroidPermissions] User refuses runtime permissions android 12+',
          );
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(checkResult => {
        if (checkResult) {
          console.debug(
            '[handleAndroidPermissions] runtime permission Android <12 already OK',
          );
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(requestResult => {
            if (requestResult) {
              console.debug(
                '[handleAndroidPermissions] User accepts runtime permission android <12',
              );
            } else {
              console.error(
                '[handleAndroidPermissions] User refuses runtime permission android <12',
              );
            }
          });
        }
      });
    }
  };

  const renderItem = ({item}: {item: Peripheral}) => {
    if (item.id === targetDeviceId) {
      const backgroundColor = item.connected ? '#12B6D1' : Colors.white;
      return (
        <TouchableHighlight
          onPress={() => {
            togglePeripheralConnection(item);
          }}
          key={item.id}>
          <View style={styles.row}>
            {/* <Text style={styles.peripheralName}>{targetDeviceName}</Text> */}
            <Text style={styles.peripheralName}>{item.id}</Text>
            <Text style={styles.state}>
              {rawDatas === '' ? '연결 안 됨' : '연결됨'}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }
    return null;
  };

  const sendData = (data: string, connectedDeviceId: string | null) => {
    console.log('입력한 데이터는 : ', inputValue);
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

  // 데이터를 바이트 배열로 변환
  const convertDataToByteArray = (data: string): number[] => {
    const byteArray: number[] = [];
    for (let i = 0; i < data.length; i++) {
      byteArray.push(data.charCodeAt(i));
    }
    return byteArray;
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btn_box}>
        <Text style={styles.back_btn}>돌아가기</Text>
      </TouchableOpacity>
      <StatusBar />
      <SafeAreaView style={styles.body}>
        <Pressable
          style={styles.scanButton}
          onPress={startScan}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>
            {isScanning ? '탐색중...' : '주변 기기 탐색'}
          </Text>
        </Pressable>
        <FlatList
          data={Array.from(peripherals.values())}
          contentContainerStyle={{rowGap: 12}}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TextInput
          placeholder="숫자를 입력하세요"
          onChangeText={text => setInputValue(text)}
          value={inputValue}
          keyboardType="numeric"
          style={styles.inputText}
        />

        <Pressable
          style={styles.scanButton}
          // onPress={handleSendData}
          onPress={() => {
            sendData(inputValue, connectedDeviceId);
            setInputValue('');
          }}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>전송</Text>
        </Pressable>
        <Pressable style={styles.scanButton}>
          <Text style={styles.scanButtonText}>
            <Text style={styles.scanButtonText}>{factor}</Text>
          </Text>
          <Text style={styles.scanButtonText}>
            <Text style={styles.scanButtonText}>
              ppg : {PPG}, pulse: {pulse}, factor : {factor}
            </Text>
          </Text>
        </Pressable>

        <Pressable
          style={styles.scanButton}
          onPress={() => {
            setRawDatas('');
            console.log(rawDatas);
          }}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>
            <Text style={styles.scanButtonText}>초기화</Text>
          </Text>
        </Pressable>

        {/* <Pressable
          style={styles.scanButton}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>{connectedDeviceId}</Text>
        </Pressable> */}

        {/* <Pressable
          style={styles.scanButton}
          onPress={() => {
            navigation.navigate('Show', {emitter: bleManagerEmitter});
          }}>
          <Text style={styles.scanButtonText}>Click</Text>
        </Pressable> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  btn_box: {
    paddingTop: 13,
    // backgroundColor: 'white',
  },
  back_btn: {
    fontSize: 12,
    color: '#12B6D1',
    fontWeight: 'bold',
    marginLeft: 31,
  },
  body: {
    // backgroundColor: 'white',
    alignItems: 'center',
  },
  scanButton: {
    width: 207,
    // width: '100%',
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#12B6D1',
    marginTop: 22,
    borderRadius: 6,
  },
  scanButtonText: {
    fontSize: 12,
    color: 'white',
  },
  row: {
    width: windowWidth * 0.86,
    height: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
    elevation: 2,
    backgroundColor: 'gray',
    borderRadius: 6,
    shadowColor: '#000000',
    // shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginTop: 36,
  },
  peripheralName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  state: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#ADADAD',
    color: 'white',
  },
  inputText: {
    width: 207,
    height: 41,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#12B6D1',
  },
});

export default BleConnectComponent;
