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
import {useNavigation} from '@react-navigation/native';
const ListComponent = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.list_box}>
      {data.map((petData, index) => {
        return (
          <View style={styles.pet_box} key={index}>
            <TouchableOpacity
              style={styles.touch_box}
              onPress={() => {
                navigation.navigate('ShowData', {data: petData});
              }}>
              <Text style={styles.pet_title}>{petData.title}</Text>
              <View style={styles.content_box}>
                <Text style={styles.pet_content}>{petData.name}</Text>
              </View>
              <View style={styles.content_box}>
                <Text style={styles.pet_content}>{petData.breed}</Text>
              </View>
              <View style={styles.content_box_container}>
                <View style={styles.content_box2}>
                  <Text style={styles.pet_content2}>{petData.weight}kg</Text>
                </View>
                <View style={styles.content_box2}>
                  <Text style={styles.pet_content2}>
                    {petData.age} years old
                  </Text>
                </View>
              </View>
              <View style={styles.content_box}>
                <Text style={styles.pet_content}>{petData.sex}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ConnectBle', {data: petData});
              }}>
              <Text style={styles.connect_btn}>Connection Settings</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  list_box: {
    width: '90%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pet_box: {
    width: '49%',
    height: 270,
    borderWidth: 1,
    borderColor: '#1EA3D6',
    backgroundColor: '#0B3E53',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  touch_box: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  pet_title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
  },
  content_box: {
    width: '90%',
    height: 35,
    backgroundColor: '#031314',
    borderWidth: 1,
    borderColor: '#1EA3D6',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  pet_content: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  content_box_container: {
    width: '90%',
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  content_box2: {
    width: '46%',
    height: '100%',
    backgroundColor: '#031314',
    borderWidth: 1,
    borderColor: '#1EA3D6',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  pet_content2: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  connect_btn: {
    fontSize: 12,
    color: '#707070',
  },
});
export default ListComponent;
