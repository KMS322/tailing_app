import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './Component/intro';
import LogInComponent from './Component/logIn';
import HomeComponent from './Component/home';
import UserComponent from './Component/user';
import BleConnectComponent from './Component/bleConnect';
import PetDetailComponent from './Component/petDetail';
import SignInComponent from './Component/signIn';
import PetRegisterComponent from './Component/petRegister';
import ShowComponent from './Component/showData';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: '#121212'},
          }}
          initialRouteName="Intro">
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Login" component={LogInComponent} />
          <Stack.Screen name="Home" component={HomeComponent} />
          {/*<Stack.Screen name="Detail" component={PetDetailComponent} />
          <Stack.Screen name="BleConnect" component={BleConnectComponent} />
          <Stack.Screen name="SignIn" component={SignInComponent} />
          <Stack.Screen name="PetRegister" component={PetRegisterComponent} />
          <Stack.Screen name="User" component={UserComponent} /> */}
          {/* <Stack.Screen name="Show" component={ShowComponent} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#121212',
  },
});
export default App;
