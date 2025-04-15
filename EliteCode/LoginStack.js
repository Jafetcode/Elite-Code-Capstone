import React from 'react';
import SignUp from './LoginView/SignUp';
import FirstScreen from './LoginView/FirstScreen';
import LoginScreen from './LoginView/LoginScreen';
import LoadingScreen from './LoginView/LoadingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResetPassword from './LoginView/ResetPassword';

const Stack = createNativeStackNavigator();

const LoginStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoadingScreen">
    <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
    <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
  </Stack.Navigator>
);

export default LoginStack;
