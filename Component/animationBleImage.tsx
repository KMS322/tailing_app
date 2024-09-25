import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';

const AnimationBleImage = () => {
  const imagePaths = [
    require('../assets/images/bleReady_img1.png'),
    require('../assets/images/bleReady_img2.png'),
    require('../assets/images/bleReady_img3.png'),
    require('../assets/images/bleReady_img4.png'),
  ];

  const fadeAnims = useRef(imagePaths.map(() => new Animated.Value(0))).current;

  const durations = [500, 500, 500, 500]; // 각 이미지에 대한 duration 값
  const delays = [0, 1000, 1300, 1500]; // 각 이미지에 대한 delay 값

  const animations = useRef([]);

  useEffect(() => {
    animations.current = imagePaths.map((_, index) =>
      animateImage(fadeAnims[index], durations[index], delays[index]),
    );

    return () => {
      animations.current.forEach(anim => anim.stop());
    };
  }, []); // useEffect 의존성 배열은 빈 배열로 설정하여 한 번만 실행

  return (
    <TouchableOpacity style={styles.image_container}>
      {imagePaths.map((path, index) => (
        <Animated.Image
          key={index}
          source={path}
          style={[
            styles.ble_img,
            {
              opacity: fadeAnims[index],
            },
          ]}
        />
      ))}
    </TouchableOpacity>
  );
};

const animateImage = (fadeAnim, duration, delay) => {
  const animationSequence = Animated.sequence([
    Animated.delay(delay),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }),
    Animated.delay(delay),
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: false,
    }),
  ]);

  const loopedAnimation = Animated.loop(animationSequence);

  loopedAnimation.start();

  return loopedAnimation;
};

const styles = StyleSheet.create({
  image_container: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  ble_img: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default AnimationBleImage;
