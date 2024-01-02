import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const ConnectBleComponent = ({route}) => {
  const {data} = route.params;
  console.log('data : ', data);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.img_box}>
        <Image
          source={require('../assets/images/bleConnect_img.png')}
          style={styles.ble_img}
        />
        <Text style={styles.ble_text}>
          Turn on the Bluetooth connection{'\n'}of the device.
        </Text>
      </View>
      <Text style={{...styles.title, marginTop: 20}}>Device list</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    padding: 0,
  },
  title: {
    marginTop: 80,
    marginLeft: 30,
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
  img_box: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  ble_img: {
    width: 300,
    height: 300,
  },
  ble_text: {
    fontSize: 15,
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
});
export default ConnectBleComponent;
