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
import TeacherManageCourse from './TeacherView/TeacherManageCourse';
import TeacherManageQuestion from './TeacherView/TeacherManageQuestion';
import EditProfile from './TeacherView/EditProfile';

// import SubmitQuestion from './TeacherView/SubmitQuestion';

const Stack = createNativeStackNavigator();

const TeacherStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Course Library">
    <Stack.Screen name="Course Library" component={TeacherHome} options={{ headerShown: false }}/>
    <Stack.Screen name="TeacherCourse" component={TeacherCourse} />
    <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
    <Stack.Screen name="Question" component={GradingScreen} />
    <Stack.Screen name="TeacherSettings" component={TeacherSettings} />
    <Stack.Screen name="TeacherCreateCourse" component={TeacherCreateCourse} />
    <Stack.Screen name="TeacherCreateQuestion" component={TeacherCreateQuestion} />
    <Stack.Screen name="Classlist" component={TeacherCourseClasslist} />
    <Stack.Screen name="QuestionsAssignedToStudent" component={QsAssginedToStudent}/>
    <Stack.Screen name="QsByCourse" component={QsByCourse}/>
    <Stack.Screen name="Questions Library" component={QuestionsLibrary} options={{ headerShown: false }}/>
    <Stack.Screen name="Assign a question" component={Assigning} options={{ headerShown: false }}/>
    <Stack.Screen name="Manage Course" component={TeacherManageCourse}/>
    <Stack.Screen name="TeacherManageQuestion" component={TeacherManageQuestion}/>
    <Stack.Screen name="EditProfile" component={EditProfile}/>
    {/* <Stack.Screen name="SubmitQuestion" component={SubmitQuestion} /> */}
    {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}

  </Stack.Navigator>
);

export default TeacherStack;
