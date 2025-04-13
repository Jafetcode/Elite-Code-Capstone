import React from 'react';
import TeacherStack from './TeacherStack';
import ProfileStack from './ProfileStack';
import TeacherSettings from './TeacherView/TeacherSettings';
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

const TeacherTabs = () => (
  <Tab.Navigator lazy={true}>
    <Tab.Screen 
      name="Home" 
      component={TeacherStack} 
      options={{ tabBarIcon:() => <HomeIcon/>, headerShown: false }}
    />

    <Tab.Screen 
      name="Profile" 
      component={ProfileStack}  
      options = {{ tabBarIcon:() => <ProfileIcon/>}}/>

    <Tab.Screen 
      name="Settings" 
      component={TeacherSettings} 
      options={{  tabBarIcon:() => <SettingsIcon/> }}/>
  </Tab.Navigator>
);

export default TeacherTabs;
