import React from 'react';
import LoginStack from './LoginStack';
import { useAuth } from './AuthContext';
import TeacherTabs from './TeacherTabs';
import StudentTabs from './StudentTabs';
import { NavigationContainer } from '@react-navigation/native';


const AppNavigator = () => {
  const { user } = useAuth();

  // Checks if there is a user, if no user then back to login
  if (!user) {
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  }

  // Once logged in, check the role
  if (user.role === 'instructor') {
    return (
      <NavigationContainer>
        <TeacherTabs />
      </NavigationContainer>
    );
  } else if (user.role === 'student') {
    return (
      <NavigationContainer>
        <StudentTabs />
      </NavigationContainer>
    );
  }
  else{
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  }
};

export default AppNavigator;
