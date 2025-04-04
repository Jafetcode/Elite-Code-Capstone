import React from 'react';
import TeacherHome from './TeacherView/TeacherHome';
import TeacherCourse from './TeacherView/TeacherCourse';
import TeacherProfile from './TeacherView/TeacherProfile';
import GradingScreen from './TeacherView/GradingScreen';
import TeacherSettings from './TeacherView/TeacherSettings';
import TeacherCreateCourse from './TeacherView/TeacherCreateCourse';
import TeacherCreateQuestion from './TeacherView/TeacherCreateQuestion';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeacherCourseClasslist from './TeacherView/TeacherCourseClasslist';
import TeacherQuestion from './TeacherView/TeacherQuestion'
import QsAssginedToStudent from './TeacherView/QsAssignedToStudent';
import QsByCourse from './TeacherView/QsByCourse';
import QuestionsLibrary from './TeacherView/QuestionsLibrary';
import Assigning from './TeacherView/Assigning';
const Stack = createNativeStackNavigator();

const TeacherStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Course Library">
    <Stack.Screen name="Course Library" component={TeacherHome} />
    <Stack.Screen name="TeacherCourse" component={TeacherCourse} />
    <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
    <Stack.Screen name="Question" component={GradingScreen} />
    <Stack.Screen name="TeacherSettings" component={TeacherSettings} />
    <Stack.Screen name="TeacherCreateCourse" component={TeacherCreateCourse} />
    <Stack.Screen name="TeacherCreateQuestion" component={TeacherCreateQuestion} />
    <Stack.Screen name="Classlist" component={TeacherCourseClasslist} />
    <Stack.Screen name="QuestionsAssignedToStudent" component={QsAssginedToStudent}/>
    <Stack.Screen name="QsByCourse" component={QsByCourse}/>
    <Stack.Screen name="Questions Library" component={QuestionsLibrary}/>
    <Stack.Screen name="Assign a question" component={Assigning}/>
  </Stack.Navigator>
);

export default TeacherStack;
