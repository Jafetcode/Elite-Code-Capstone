// import * as React from 'react';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { default as theme } from './custom-theme.json'
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import SignUp from './SignUp';
import StudentRegister from './StudentRegister';
import FirstScreen from './FirstScreen'
import TeacherRegister from './TeacherRegister'
import ProfileScreen from './StudentView/ProfileScreen';
import NavigateScreen from './NavigateScreen';
import TeacherHome from './TeacherView/TeacherHome';
import TeacherCourse from './TeacherView/TeacherCourse';
import TeacherLesson from './TeacherView/TeacherLesson';
import TeacherQuestion from './TeacherView/TeacherQuestion';
import TeacherCreateCourse from './TeacherView/TeacherCreateCourse';
import TeacherCreateLesson from './TeacherView/TeacherCreateLesson';
import TeacherCreateQuestion from './TeacherView/TeacherCreateQuestion';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import RoleBasedRedirect from './API/roleRedirect';

// import { Stack } from 'expo-router';
// import UserModel from './API/server2'; 


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

// export default function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <ApplicationProvider {...eva} theme={eva.dark}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           {user ? (
//             <Stack.Screen name="InsideLayout" component={InsideLayout} options={{ headerShown: false }} />
//           ) : (
//             <Stack.Screen name="Login" component={StudentRegister} options={{ headerShown: false }} />
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </ApplicationProvider>
//   );
// }

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await fetch(`http://10.40.24.129:3300/userRole?email=${firebaseUser.email}`);
          const userData = await response.json();
          if (response.ok) {
            setUser(userData.userID);
            setRole(userData.role);
            console.log("User Role:", userData.role);
          } else {
            console.error("Error fetching user data:", userData.error);
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Redirect">
        <Stack.Screen name="Redirect" component={RoleBasedRedirect} options={{ headerShown: false }} />
        <Stack.Screen name="StudentHome" component={HomeScreen} />
        <Stack.Screen name="TeacherHome" component={TeacherHome} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Redirect">
//         <Stack.Screen name="Redirect" component={RoleBasedRedirect} options={{ headerShown: false }} />
//         <StStack.Screen name="StudentHome" component={HomeScreen} />
//         <TStack.Screen name="TeacherHome" component={TeacherHome} />
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// useEffect(() => {
//   onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
//     if (firebaseUser) {
//       try {
//         const userData = await UserModel.getUserData(firebaseUser.email);
//         setUser(userData.userID);
//         setRole(userData.role);
//         console.log("User Role:", userData.role);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     } else {
//       setUser(null);
//       setRole(null);
//     }
//   });
// }, []);