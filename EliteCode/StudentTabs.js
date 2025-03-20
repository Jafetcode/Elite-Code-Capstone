import React from 'react';
import StudentStack from './StudentStack';
import StudentProfile from './StudentView/StudentProfile';
import StudentSettings from './StudentView/StudentSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const StudentTabs = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={StudentStack} 
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Profile" component={StudentProfile} />
    <Tab.Screen name="Settings" component={StudentSettings} />
  </Tab.Navigator>
);

export default StudentTabs;
