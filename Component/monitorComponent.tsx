import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePetContext} from '../AppContext';
const MonitorComponent = () => {
  const {pets} = usePetContext();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LIST UP</Text>
      <View style={styles.list_container}>
        {pets.map((pet, index) => {
          return (
            <TouchableOpacity
              style={styles.list_box}
              onPress={() => {
                navigation.navigate('ShowData', {data: pet});
              }}
              key={index}>
              <Text style={styles.list_title}>{pet.title}</Text>
              <Text style={styles.list_name}>{pet.name}</Text>
              <View style={styles.icon_box}>
                <Image
                  source={require('../assets/images/icon_img1.png')}
                  style={styles.icon}
                />
                <Image
                  source={require('../assets/images/icon_img2.png')}
                  style={styles.icon}
                />
                <Image
                  source={require('../assets/images/icon_img3.png')}
                  style={styles.icon}
                />
                <Image
                  source={require('../assets/images/icon_img4.png')}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
    fontSize: 25,
    fontWeight: '700',
    color: '#1EA3D6',
    marginTop: 20,
  },
  list_container: {
    width: '90%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  list_box: {
    width: '48%',
    height: 110,
    borderWidth: 2,
    borderColor: '#0B3E53',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  list_title: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  list_name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1EA3D6',
  },
  icon_box: {
    width: '80%',
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: '15%',
    height: '100%',
  },
});

export default MonitorComponent;
