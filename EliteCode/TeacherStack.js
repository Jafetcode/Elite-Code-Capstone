import React from 'react';
import TeacherHome from './TeacherView/TeacherHome';
import TeacherCourse from './TeacherView/TeacherCourse';
import TeacherLesson from './TeacherView/TeacherLesson';
import TeacherProfile from './TeacherView/TeacherProfile';
import TeacherQuestion from './TeacherView/TeacherQuestion';
import TeacherSettings from './TeacherView/TeacherSettings';
import TeacherCreateCourse from './TeacherView/TeacherCreateCourse';
import TeacherCreateLesson from './TeacherView/TeacherCreateLesson';
import TeacherCreateQuestion from './TeacherView/TeacherCreateQuestion';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeacherCourseClasslist from './TeacherView/TeacherCourseClasslist';
import QsAssginedToStudent from './TeacherView/QsAssignedToStudent';
import QsByCourse from './TeacherView/QsByCourse';
const Stack = createNativeStackNavigator();

const TeacherStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="TeacherHome">
    <Stack.Screen name="TeacherHome" component={TeacherHome} />
    <Stack.Screen name="TeacherCourse" component={TeacherCourse} />
    <Stack.Screen name="TeacherLesson" component={TeacherLesson} />
    <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
    <Stack.Screen name="TeacherQuestion" component={TeacherQuestion} />
    <Stack.Screen name="TeacherSettings" component={TeacherSettings} />
    <Stack.Screen name="TeacherCreateCourse" component={TeacherCreateCourse} />
    <Stack.Screen name="TeacherCreateLesson" component={TeacherCreateLesson} />
    <Stack.Screen name="TeacherCreateQuestion" component={TeacherCreateQuestion} />
    <Stack.Screen name="TeacherCourseClasslist" component={TeacherCourseClasslist} />
    <Stack.Screen name="QuestionsAssignedToStudent" component={QsAssginedToStudent}/>
    <Stack.Screen name="QsByCourse" component={QsByCourse}/>
  </Stack.Navigator>
);

export default TeacherStack;
