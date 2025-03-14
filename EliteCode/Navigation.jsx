import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './AuthContext';

import LoginScreen from './LoginScreen';
import StudentDashboard from './HomeScreen';
import TeacherDashboard from './HomeScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    user.role === 'teacher' ? (
                        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
                    ) : (
                        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
                    )
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
