import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const UserComponent = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>여기는 유저화면이다.</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  intro_image: {
    marginTop: 121,
    width: windowWidth * 0.5958, // 부모 컴포넌트의 너비의 50%
    height: windowWidth * 0.5 * (253 / 255), // 비율 유지를 위한 높이 계산
    aspectRatio: 255 / 253,
  },
});
export default UserComponent;
