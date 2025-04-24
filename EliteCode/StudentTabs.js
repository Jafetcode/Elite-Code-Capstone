import React from 'react';
import StudentStack from './StudentStack';
import StudentProfile from './StudentView/StudentProfile';
import ProfileStack from './ProfileStack';
import StudentSettings from './StudentView/StudentSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
const Tab = createBottomTabNavigator();

const HomeIcon = ({ color }) => (
  <Icon
    fill={color}  
    name='home-outline'
    style={{ width: 24, height: 24 }}
  />
);

const ProfileIcon = ({ color }) => (
  <Icon
    fill={color}  
    name='person-outline'
    style={{ width: 24, height: 24 }}
  />
);

const SettingsIcon = ({ color }) => (
  <Icon
    fill={color}  
    name='settings-outline'
    style={{ width: 24, height: 24 }}
  />
);

const StudentTabs = () => (
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
      component={StudentStack} 
      options={{ 
        tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        headerShown: false 
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={StudentProfile} 
      options={{ tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
      headerShown: false  
    }}
    />
    <Tab.Screen 
      name="Settings" 
      component={StudentSettings} 
      options={{ tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
      headerShown: false 
     }}
    />
  </Tab.Navigator>
);


export default StudentTabs;
