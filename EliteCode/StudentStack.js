import React from 'react';
import StudentHome from './StudentView/StudentHome';
import StudentCourse from './StudentView/StudentCourse';
import StudentLesson from './StudentView/StudentLesson';
import StudentProfile from './StudentView/StudentProfile';
import StudentQuestion from './StudentView/StudentQuestion';
import StudentSettings from './StudentView/StudentSettings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StudentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="StudentHome">
    <Stack.Screen name="StudentHome" component={StudentHome} />
    <Stack.Screen name="StudentCourse" component={StudentCourse} />
    <Stack.Screen name="StudentLesson" component={StudentLesson} />
    <Stack.Screen name="StudentProfile" component={StudentProfile} />
    <Stack.Screen name="StudentQuestion" component={StudentQuestion} />
    <Stack.Screen name="StudentSettings" component={StudentSettings} />
  </Stack.Navigator>
);

export default StudentStack;
