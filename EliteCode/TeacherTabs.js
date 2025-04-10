import React from 'react';
import TeacherStack from './TeacherStack';
import TeacherProfile from './TeacherView/TeacherProfile';
import TeacherSettings from './TeacherView/TeacherSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
const Tab = createBottomTabNavigator();
const TabIcon = (name) => ({ focused, size }) => (
  <Icon name={name} fill={focused ? '#3366FF' : '#8F9BB3'} style={{ width: size, height: size }} />
);
const TeacherTabs = () => (
  <Tab.Navigator lazy={true}>
    <Tab.Screen 
      name="Home" 
      component={TeacherStack} 
      options={{ tabBarIcon: TabIcon('home-outline'), headerShown: false }}
    />
    <Tab.Screen name="Profile" component={TeacherProfile}  options = {{tabBarIcon: TabIcon('person-outline')}}/>
    <Tab.Screen name="Settings" component={TeacherSettings}options={{ tabBarIcon: TabIcon('settings-outline') }}/>
  </Tab.Navigator>
);

export default TeacherTabs;
