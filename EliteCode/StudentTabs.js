import React from 'react';
import StudentStack from './StudentStack';
import StudentProfile from './StudentView/StudentProfile';
import StudentSettings from './StudentView/StudentSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
const Tab = createBottomTabNavigator();
const TabIcon = (name) => ({ focused, size }) => (
  <Icon name={name} fill={focused ? '#3366FF' : '#8F9BB3'} style={{ width: size, height: size }} />
);

const StudentTabs = () => (
  <Tab.Navigator lazy={true}>
    <Tab.Screen 
      name="Home" 
      component={StudentStack} 
      options={{ tabBarIcon: TabIcon('home-outline'), headerShown: false }}
    />
    <Tab.Screen name="Profile" component={StudentProfile} options = {{tabBarIcon: TabIcon('person-outline')}}/>
    <Tab.Screen name="Settings" component={StudentSettings} options={{ tabBarIcon: TabIcon('settings-outline') }}/>
  </Tab.Navigator>
);

export default StudentTabs;
