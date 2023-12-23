import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {BleManagerDidUpdateValueForCharacteristicEvent} from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const ShowComponent = ({emitter}) => {
  const [showData, setShowData] = useState(0);
  const handleUpdateValueForCharacteristic = (
    data: BleManagerDidUpdateValueForCharacteristicEvent,
  ) => {
    console.log(data.value);
    // const parts = data.value
    //   .toString()
    //   .split(',')
    //   .map(part => parseInt(part.trim(), 10));
    // const number1 = parts[0];
    // setShowData(number1);
    const asciiResult: string = convertToAscii(data.value);
    const numbersOnly = asciiResult.match(/-?\d+/g);
    const num1: number = parseInt(numbersOnly[0]);
    const num2: number = parseInt(numbersOnly[1]);
    const num3: number = parseInt(numbersOnly[2]);
    const num4: number = parseInt(numbersOnly[3]);

    console.log('num1:', num1);
    console.log('num2:', num2);
    console.log('num3:', num3);
    console.log('num4:', num4);
  };
  const convertToAscii = (numbers: number[]): string => {
    const asciiChars: string[] = numbers.map(number =>
      String.fromCharCode(number),
    );
    const asciiString: string = asciiChars.join('');
    return asciiString;
  };
  useEffect(() => {
    if (bleManagerEmitter) {
      const listeners = [
        bleManagerEmitter.addListener(
          'BleManagerDidUpdateValueForCharacteristic',
          handleUpdateValueForCharacteristic,
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
      <View style={styles.container}>
        {/* <Text style={styles.text}>{showData}</Text> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
});
export default ShowComponent;
