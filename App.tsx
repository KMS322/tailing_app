import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './Component/intro';
import LogInComponent from './Component/logIn';
import HomeComponent from './Component/home';
import ShowListComponent from './Component/showListComponent';
import ConnectBleComponent from './Component/connectBleComponent';
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
          <Stack.Screen name="ShowList" component={ShowListComponent} />
          <Stack.Screen name="ConnectBle" component={ConnectBleComponent} />
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
