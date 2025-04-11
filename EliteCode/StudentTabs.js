import React from 'react';
import StudentStack from './StudentStack';
import StudentProfile from './StudentView/StudentProfile';
import StudentSettings from './StudentView/StudentSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
const Tab = createBottomTabNavigator();

const HomeIcon = () => (
  <Icon
  fill='#8F9BB3'
  name='home-outline'
  />
);

const ProfileIcon = ()=> (
  <Icon
  fill='#8F9BB3'
  name='person-outline'
  />
);

const SettingsIcon = () => (
  <Icon
  fill='#8F9BB3'
  name='settings-outline'
  />
);

const StudentTabs = () => (
  <Tab.Navigator lazy={true}>
    <Tab.Screen 
      name="Home" 
      component={StudentStack} 
      options={{ tabBarIcon:() => <HomeIcon/>, headerShown: false }}
    />
    <Tab.Screen name="Profile" component={StudentProfile} options = {{tabBarIcon:() => <ProfileIcon/>}}/>
    <Tab.Screen name="Settings" component={StudentSettings} options={{ tabBarIcon:() => <SettingsIcon/> }}/>
  </Tab.Navigator>
);

export default StudentTabs;
