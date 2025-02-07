import * as React from 'react';
import * as eva from '@eva-design/eva';

import {default as theme} from './custom-theme.json'
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import SignUp from './SignUp';
import StudentRegister from './StudentRegister';
import FirstScreen from './FirstScreen'
import TeacherRegister from './TeacherRegister'
import ProfileScreen from './ProfileScreen';
import NavigateScreen from './NavigateScreen';

const RegisterTabs = createNativeStackNavigator({
  screens:{
    Student:{ 
      screen: StudentRegister,
      options: {
        title: 'Student Register',
        headerShown: false 
      }
    },
    Teacher: { 
      screen: TeacherRegister,
      options: {
        title: 'Teacher Register',
        headerShown: false 
      }
    },
  },
  screenOptions: {
    headerStyle: {
      backgroundColor: '#526F8C',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

const HomeTabs = createBottomTabNavigator({
  screens:{
    Navigate:{screen:NavigateScreen,
      options: {
        title: 'Navigate'
      }
    } ,
    Home: {screen:HomeScreen,
      options: {
        title: 'Home'
      }
    } ,
    Profile:{screen:ProfileScreen,
      options: {
        title: 'Profile'
      }
    } ,
    Settings: SettingsScreen,
    
  },
  screenOptions:{
    title: 'EliteCode'
  }
})

const LoginTabs = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false
      }
    },
    SignUp: {
      screen: SignUp,
      options: {
        headerShown: false
      }
    },
    RegisterGroup:{
      screen: RegisterTabs,
      options: {
        title: 'Register',
        headerShown: false
      }
    }
  },
 
})

const RootStack = createNativeStackNavigator({
  screens: {
    First:{
      screen: FirstScreen,
      options:{headerShown:false},
    },
    LoginGroup: {
      screen: LoginTabs,
      options:{
        headerShown: false
      }
    },
    HomeGroup: {
      screen: HomeTabs,
      options:{
        headerShown: false
      }
    },
  },
  
})




const Navigation = createStaticNavigation(RootStack)

export default function App() {
  return(
    <>
    <ApplicationProvider {...eva} theme={eva.dark}>
    <Navigation/>
  </ApplicationProvider>
    </>
  )
}