import React from 'react';
import StudentHome from './StudentView/StudentHome';
import StudentCourse from './StudentView/StudentCourse';
import StudentProfile from './StudentView/StudentProfile';
import StudentQuestion from './StudentView/StudentQuestion';
import StudentSettings from './StudentView/StudentSettings';
import ErikaStudentHome from './StudentView/ErikaStudentHome';
import AndryStudentHome from './StudentView/AndryStudentHome';
import JafetStudentHome from './StudentView/JafetStudentHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubmitQuestion from './StudentView/SubmitQuestion';
const Stack = createNativeStackNavigator();

const StudentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="StudentHome">
    <Stack.Screen name="StudentHome" options={{ headerShown: false }} component={StudentHome}/>
    <Stack.Screen name="StudentCourse" options={{ headerShown: false }} component={StudentCourse} />
    <Stack.Screen name="StudentProfile" component={StudentProfile} />
    <Stack.Screen name="StudentQuestion" component={StudentQuestion} />
    <Stack.Screen name="StudentSettings" component={StudentSettings} />
    <Stack.Screen name="AndryStudentHome" options={{ headerShown: false }}  component={AndryStudentHome} />
    <Stack.Screen name="ErikaStudentHome" component={ErikaStudentHome} options={{ headerShown: false }}  />
    <Stack.Screen name="JafetStudentHome" component={JafetStudentHome} />
    <Stack.Screen name="SubmitQuestion" component={SubmitQuestion} />
  </Stack.Navigator>
);

export default StudentStack;
