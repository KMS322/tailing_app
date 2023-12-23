import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const BleDataComponent = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>aaaa</Text>
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
});
export default BleDataComponent;
