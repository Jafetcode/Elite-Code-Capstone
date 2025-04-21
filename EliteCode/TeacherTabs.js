import React from 'react';
import TeacherStack from './TeacherStack';
import ProfileStack from './ProfileStack';
import TeacherSettings from './TeacherView/TeacherSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
const Tab = createBottomTabNavigator();

const HomeIcon = ({ color }) => (
  <Icon
  fill={color}  
  name='home-outline'
  />
);

const ProfileIcon = ({ color })=> (
  <Icon
  fill={color}  
  name='person-outline'
  />
);

const SettingsIcon = ({ color }) => (
  <Icon
  fill={color}  
  name='settings-outline'
  />
);

const TeacherTabs = () => (
  <Tab.Navigator
  lazy={true}
  screenOptions={{
    tabBarStyle: {
      backgroundColor: '#1E2A38',
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: '#D02C32',
    tabBarInactiveTintColor: '#A9B7C6',
  }}
  >
    <Tab.Screen 
      name="Home" 
      component={TeacherStack} 
      options={{ tabBarIcon:({ color }) => <HomeIcon color={color} />, headerShown: false }}
    />

    <Tab.Screen 
      name="Profile" 
      component={ProfileStack}  
      options = {{ tabBarIcon:({ color }) => <ProfileIcon color={color} />}}/>

    <Tab.Screen 
      name="Settings" 
      component={TeacherSettings} 
      options={{  tabBarIcon:({ color }) => <SettingsIcon color={color} /> }}/>
  </Tab.Navigator>
);

export default TeacherTabs;
