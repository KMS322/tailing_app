import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const PetDetailHeaderComponent = () => {
  return (
    <>
      <View style={detail_styles.detail_header}>
        <Image
          source={require('../assets/images/detail_dog_image1.png')}
          style={detail_styles.detail_header_image}
        />
        <View style={detail_styles.detail_header_text_box1}>
          <Text style={detail_styles.detail_header_text_box1_text}>건빵</Text>
          <Image
            source={require('../assets/images/home_sex_image1.png')}
            style={detail_styles.detail_header_text_box1_image}
          />
        </View>
        <View style={detail_styles.detail_header_text_box2}>
          <Text style={detail_styles.detail_header_text_box2_text1}>
            Maltese
          </Text>
          <View style={detail_styles.detail_header_text_box2_1}>
            <Text style={detail_styles.detail_header_text_box2_1_text1}>
              0.9kg
            </Text>
            <Text style={detail_styles.detail_header_text_box2_1_text2}>
              Age : 3개월
            </Text>
          </View>
        </View>
        <View style={detail_styles.detail_header_image_box}>
          <Image
            source={require('../assets/images/home_connect_image1.png')}
            style={detail_styles.detail_header_image_box_image1}
          />
          <Image
            source={require('../assets/images/home_battery_image1.png')}
            style={detail_styles.detail_header_image_box_image2}
          />
        </View>
      </View>
    </>
  );
};

const detail_styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail_header: {
    width: windowWidth * 0.86,
    height: 49,
    flexDirection: 'row',
    marginTop: 34,
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
    position: 'relative',
  },
  detail_header_image: {
    width: 34,
    height: 34,
  },
  detail_header_text_box1: {
    marginLeft: 6,
  },
  detail_header_text_box1_text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  detail_header_text_box1_image: {
    width: 11,
    height: 11,
  },
  detail_header_text_box2: {
    marginLeft: 6,
  },
  detail_header_text_box2_text1: {
    fontSize: 10,
    color: '#717171',
    fontWeight: 'bold',
    marginTop: 4,
  },
  detail_header_text_box2_1: {
    flexDirection: 'row',
    marginTop: 2,
  },
  detail_header_text_box2_1_text1: {
    fontSize: 10,
    color: '#717171',
    fontWeight: '500',
  },
  detail_header_text_box2_1_text2: {
    fontSize: 10,
    color: '#717171',
    fontWeight: '500',
    marginLeft: 10,
  },
  detail_header_image_box: {
    width: 59,
    height: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    right: 0,
  },
  detail_header_image_box_image1: {
    width: 11,
    height: 18,
  },
  detail_header_image_box_image2: {
    width: 34,
    height: 17,
  },
});
export default PetDetailHeaderComponent;
