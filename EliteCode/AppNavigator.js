import React from 'react';
import LoginStack from './LoginStack';
import { useAuth } from './AuthContext';
import TeacherTabs from './TeacherTabs';
import StudentTabs from './StudentTabs';
import { NavigationContainer } from '@react-navigation/native';

const AppNavigator = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  }

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
  else {
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  }
};

export default AppNavigator;

// import React from 'react';
// import LoginStack from './LoginStack';
// import { useAuth } from './AuthContext';
// import TeacherTabs from './TeacherTabs';
// import StudentTabs from './StudentTabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ResetPassword from './LoginView/ResetPassword';

// const RootStack = createNativeStackNavigator();

// const AppNavigator = () => {
//   const { user } = useAuth();

//   return (
//     <NavigationContainer>
//       <RootStack.Navigator screenOptions={{ headerShown: false }}>
//         {!user ? (
//           <RootStack.Screen name="LoginStack" component={LoginStack} />
//         ) : user.role === 'instructor' ? (
//           <RootStack.Screen name="TeacherTabs" component={TeacherTabs} />
//         ) : (
//           <RootStack.Screen name="StudentTabs" component={StudentTabs} />
//         )}

//         {/* This makes ResetPassword always accessible */}
//         <RootStack.Screen
//           name="ResetPassword"
//           component={ResetPassword}
//           options={{ headerShown: false }}
//         />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;