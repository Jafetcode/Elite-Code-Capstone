import * as React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const MyTabs = createBottomTabNavigator({
  screens:{
    Home:HomeScreen,
    Login: LoginScreen,
  }
})

const RootStack = createNativeStackNavigator({
  screens: {
    Login: LoginScreen,
    Home: HomeScreen,
  },
})




const Navigation = createStaticNavigation(RootStack)

export default function App() {
  return(
    <>
    <Navigation/>
    </>
  )
}