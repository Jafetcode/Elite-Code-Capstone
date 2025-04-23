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
import QsAssginedToStudent from './TeacherView/QsAssignedToStudent';
import QsByCourse from './TeacherView/QsByCourse';
import QuestionsLibrary from './TeacherView/QuestionsLibrary';
import Assigning from './TeacherView/Assigning';
import TeacherManageCourse from './TeacherView/TeacherManageCourse';
import TeacherManageQuestion from './TeacherView/TeacherManageQuestion';
import EditProfile from './TeacherView/EditProfile';
import ViewSubmission from './TeacherView/ViewSubmission';
import MCQSubmission from './TeacherView/MCQSubmission';
// import SubmitQuestion from './TeacherView/SubmitQuestion';

const Stack = createNativeStackNavigator();

const TeacherStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Course Library">
    <Stack.Screen name="Course Library" component={TeacherHome} options={{ headerShown: false }}/>
    <Stack.Screen name="TeacherCourse" component={TeacherCourse} />
    <Stack.Screen name="TeacherProfile" component={TeacherProfile} options={{ headerShown: false }} />
    <Stack.Screen name="Question" component={GradingScreen} />
    <Stack.Screen name="TeacherSettings" component={TeacherSettings} options={{ headerShown: false }} />
    <Stack.Screen name="TeacherCreateCourse" component={TeacherCreateCourse} options={{ headerShown: false }}/>
    <Stack.Screen name="TeacherCreateQuestion" component={TeacherCreateQuestion } options={{ headerShown: false }} />
    <Stack.Screen name="Classlist" component={TeacherCourseClasslist} options={{ headerShown: false }}/>
    <Stack.Screen name="QuestionsAssignedToStudent" component={QsAssginedToStudent}  options={{ headerShown: false }}/>
    <Stack.Screen name="QsByCourse" component={QsByCourse}  options={{ headerShown: false }}/>
    <Stack.Screen name="Questions Library" component={QuestionsLibrary} options={{ headerShown: false }}/>
    <Stack.Screen name="Assign a question" component={Assigning} options={{ headerShown: false }}/>
    <Stack.Screen name="Manage Course" component={TeacherManageCourse} options={{ headerShown: false }}/>
    <Stack.Screen name="TeacherManageQuestion" component={TeacherManageQuestion} options={{ headerShown: false }}/>
    <Stack.Screen name="EditProfile" component={EditProfile}/>
    {/* <Stack.Screen name="SubmitQuestion" component={SubmitQuestion} /> */}
    <Stack.Screen name="Submission" component={ViewSubmission} options={{ headerShown: false }}/>
    <Stack.Screen name="MCQSubmission" component={MCQSubmission} options={{headerShown: false}}/>    

  </Stack.Navigator>
);

export default TeacherStack;
