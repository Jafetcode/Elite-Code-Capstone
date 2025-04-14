import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeacherProfile from './TeacherView/TeacherProfile';
import EditProfile from './TeacherView/EditProfile';
const Stack = createNativeStackNavigator();
const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TeacherProfile">
      <Stack.Screen name="TeacherProfile" component={TeacherProfile}/>
      <Stack.Screen name="EditProfile" component={EditProfile}/>
    </Stack.Navigator>
  );

  export default ProfileStack;