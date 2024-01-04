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
} from 'react-native';

const ShowDataComponent = ({route}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentFactor, setCurrentFactor] = useState('');
  const {data} = route.params;
  console.log('data컴포넌트 : ', data);
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
              // sendData(inputValue, connectedDeviceId);
              setCurrentFactor(inputValue);
              setInputValue('');
              console.log('currentFactor : ', currentFactor);
            }}
            android_ripple={{color: 'lightgray'}}>
            <Text style={styles.scanButtonText}>전송</Text>
          </Pressable>
        </View>
        <Text style={styles.factor_text}>현재 Factor : {currentFactor}</Text>
        <View style={styles.data_container}>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img1.png')}
              style={styles.icon_img}
            />
            <Text style={styles.data_num}>120</Text>
            <Text style={styles.data_name}>HEART RATE</Text>
          </View>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img2.png')}
              style={styles.icon_img}
            />
            <Text style={styles.data_num}>95%</Text>
            <Text style={styles.data_name}>SPO2</Text>
          </View>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img3.png')}
              style={styles.icon_img}
            />
            <Text style={styles.data_num}>30</Text>
            <Text style={styles.data_name}>BREATHING</Text>
          </View>
          <View style={styles.data_box}>
            <Image
              source={require('../assets/images/icon_img4.png')}
              style={styles.icon_img}
            />
            <Text style={styles.data_num}>120</Text>
            <Text style={styles.data_name}>TEMPERATURE</Text>
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
    borderWidth: 1,
    borderColor: 'red',
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
    justifyContent: 'space-around',
    borderRadius: 15,
    marginTop: 20,
  },
  pet_breed: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
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
    width: 40,
    height: 20,
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
    width: '65%',
    height: '65%',
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
