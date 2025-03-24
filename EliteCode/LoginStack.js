import React from 'react';
import SignUp from './LoginView/SignUp';
import FirstScreen from './LoginView/FirstScreen';
import LoginScreen from './LoginView/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResetPassword from './LoginView/ResetPassword';

const Stack = createNativeStackNavigator();

const LoginStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FirstScreen">
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="FirstScreen" component={FirstScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
  </Stack.Navigator>
);

export default LoginStack;
