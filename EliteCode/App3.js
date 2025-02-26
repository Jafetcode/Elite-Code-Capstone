import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import RoleBasedRedirect from './API/roleRedirect';  // Your RoleBasedRedirect component
import { FIREBASE_AUTH } from './firebaseConfig'; // Your Firebase config
import { onAuthStateChanged, User } from "firebase/auth";
import {AsyncStorage} from 'react-native'
import * as eva from '@eva-design/eva';
import { default as theme } from './custom-theme.json';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './StudentView/ProfileScreen';
import TeacherHome from './TeacherView/TeacherHome';
import TeacherCourse from './TeacherView/TeacherCourse';
import TeacherLesson from './TeacherView/TeacherLesson';
import TeacherQuestion from './TeacherView/TeacherQuestion';
import TeacherCreateCourse from './TeacherView/TeacherCreateCourse';
import TeacherCreateLesson from './TeacherView/TeacherCreateLesson';
import TeacherCreateQuestion from './TeacherView/TeacherCreateQuestion';
import NavigateScreen from './NavigateScreen';
const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="Navigate" component={NavigateScreen} options={{ title: 'Navigate' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ tile: 'Login' }} />
      <Stack.Screen name="TeacherHome" component={TeacherHome} options={{ title: 'Teacher Home' }} />
      <Stack.Screen name="TeacherCourse" component={TeacherCourse} options={{ title: 'Course' }} />
      <Stack.Screen name="TeacherLesson" component={TeacherLesson} options={{ title: 'Lesson', headerBackVisible: false }} />
      <Stack.Screen name="TeacherQuestion" component={TeacherQuestion} options={{ title: 'Question', headerBackVisible: false }} />
      <Stack.Screen name="TeacherCreateCourse" component={TeacherCreateCourse} options={{ title: 'Create Course' }} />
      <Stack.Screen name="TeacherCreateLesson" component={TeacherCreateLesson} options={{ title: 'Create Lesson' }} />
      <Stack.Screen name="TeacherCreateQuestion" component={TeacherCreateQuestion} options={{ title: 'Create Question', headerBackVisible: false }} />
    </Stack.Navigator>
  );
}

// teacher pages 
const TStack = createNativeStackNavigator();
function teacherPages() {
  return (
    <TStack.Navigator initialRouteName="TeacherHome">
      <TStack.Screen name="TeacherHome" component={TeacherHome} options={{ title: 'Teacher Home' }} />
      <TStack.Screen name="TeacherCourse" component={TeacherCourse} options={{ title: 'Course' }} />
      <TStack.Screen name="TeacherLesson" component={TeacherLesson} options={{ title: 'Lesson', headerBackVisible: false }} />
      <TStack.Screen name="TeacherQuestion" component={TeacherQuestion} options={{ title: 'Question', headerBackVisible: false }} />
      <TStack.Screen name="TeacherCreateCourse" component={TeacherCreateCourse} options={{ title: 'Create Course' }} />
      <TStack.Screen name="TeacherCreateLesson" component={TeacherCreateLesson} options={{ title: 'Create Lesson' }} />
      <TStack.Screen name="TeacherCreateQuestion" component={TeacherCreateQuestion} options={{ title: 'Create Question', headerBackVisible: false }} />
    </TStack.Navigator>
  )
}

// student pages
const StStack = createNativeStackNavigator();
function studentPages() {
  return (
    <StStack.Navigator initialRouteName="StudentHome">
      <StStack.Screen name="StudentHome" component={HomeScreen} options={{ headerShown: false }} />
      <StStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </StStack.Navigator>
  )
}

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  // const [data, setUserData] = useState<any>(null);
  // Check if user is authenticated and fetch role
  useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user)
      if (user) {
        try {
          const response = await fetch(`http://ec2-18-118-218-180.us-east-2.compute.amazonaws.com/userRole?email=${user.email}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setRole(data.role); // Set the role (student/teacher)
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setRole(null); // Reset role if user is logged out
      }
    });
  } );


  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' >
          {user ? (<Stack.Screen name='Inside' component= {InsideLayout} />
          ) : (
            <Stack.Screen name='Login' component= {LoginScreen} options= {{title:'Login'}}/>
          )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
  // Role-based redirection
  // if (role === null) {
  //   return <RoleBasedRedirect />;  // A loading component or redirection component
  // }
  // return (
  //   <ApplicationProvider {...eva} theme={eva.dark}>
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName={role === 'teacher' ? 'TeacherHome' : 'StudentHome'}>
  //         {/* Conditional routes */}
  //         {role === 'teacher' ? (
  //           <>
  //             <Stack.Screen name="TeacherHome" component={TeacherHome} options={{ title: 'Teacher Home' }} />
  //             <Stack.Screen name="TeacherCourse" component={TeacherCourse} options={{ title: 'Course' }} />
  //             <Stack.Screen name="TeacherLesson" component={TeacherLesson} options={{ title: 'Lesson' }} />
  //             <Stack.Screen name="TeacherQuestion" component={TeacherQuestion} options={{ title: 'Question' }} />
  //             <Stack.Screen name="TeacherCreateCourse" component={TeacherCreateCourse} options={{ title: 'Create Course' }} />
  //             <Stack.Screen name="TeacherCreateLesson" component={TeacherCreateLesson} options={{ title: 'Create Lesson' }} />
  //             <Stack.Screen name="TeacherCreateQuestion" component={TeacherCreateQuestion} options={{ title: 'Create Question' }} />
  //           </>
  //         ) : (
  //           <>
  //             <Stack.Screen name="StudentHome" component={HomeScreen} options={{ headerShown: false }} />
  //             <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
  //           </>
  //         )}

  //         {/* Common Routes */}
  //         <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </ApplicationProvider>
  // );

export default App;
