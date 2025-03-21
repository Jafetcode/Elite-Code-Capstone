import React from 'react';
import TeacherStack from './TeacherStack';
import TeacherProfile from './TeacherView/TeacherProfile';
import TeacherSettings from './TeacherView/TeacherSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TeacherTabs = () => (
  <Tab.Navigator lazy={true}>
    <Tab.Screen 
      name="Home" 
      component={TeacherStack} 
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Profile" component={TeacherProfile} />
    <Tab.Screen name="Settings" component={TeacherSettings} />
  </Tab.Navigator>
);

export default TeacherTabs;
