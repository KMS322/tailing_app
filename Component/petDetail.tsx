import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import PetDetailChart from './petDetailChart';
import DetailHeader from './petDetailHeader';
import {useNavigation} from '@react-navigation/native';

const PetDetailComponent = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={detail_styles.container}>
        <View style={detail_styles.header}>
          <View style={detail_styles.header_name_box}>
            <Text style={detail_styles.header_name}>크림오프 동물병원</Text>
            {/* <TouchableOpacity style={detail_styles.btn_box}>
              <Image
                source={require('../assets/images/detail_down_btn.png')}
                style={detail_styles.down_btn}
              />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={detail_styles.back_btn}>돌아가기</Text>
          </TouchableOpacity>
        </View>
        <View style={detail_styles.detail_container}>
          <DetailHeader />
          <PetDetailChart />
        </View>
      </View>
    </>
  );
};

const detail_styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#12B6D1',
    alignItems: 'center',
  },
  header: {
    width: windowWidth * 0.86,
    height: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_name_box: {
    flexDirection: 'row',
  },
  header_name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  btn_box: {
    marginLeft: 7,
    justifyContent: 'center',
  },
  down_btn: {
    width: 16,
    height: 8,
  },
  back_btn: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  detail_container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
  },
});
export default PetDetailComponent;
