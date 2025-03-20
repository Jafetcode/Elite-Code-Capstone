import React from 'react';
import SignUp from './LoginView/SignUp';
import FirstScreen from './LoginView/FirstScreen';
import LoginScreen from './LoginView/LoginScreen';
import NavigateScreen from './LoginView/NavigateScreen';
import StudentRegister from './LoginView/StudentRegister';
import TeacherRegister from './LoginView/TeacherRegister';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const LoginStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FirstScreen">
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="FirstScreen" component={FirstScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="NavigateScreen" component={NavigateScreen} />
    <Stack.Screen name="StudentRegister" component={StudentRegister} />
    <Stack.Screen name="TeacherRegister" component={TeacherRegister} />
  </Stack.Navigator>
);

export default LoginStack;
