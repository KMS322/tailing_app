import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native';
const Intro = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/intro_image.png')}
          style={styles.intro_image}
        />
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
  intro_image: {
    width: windowWidth * 0.5958,
    height: windowWidth * 0.5958 * (253 / 255),
    aspectRatio: 255 / 253,
  },
});
export default Intro;
