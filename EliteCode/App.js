<<<<<<< Updated upstream
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working start</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
import * as React from 'react';
import * as eva from '@eva-design/eva';
import {BottomNavigation, BottomNavigationTab, IconRegistry, Icon, IconElement} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: LoginScreen,
    Home: HomeScreen,
  },
})




const Navigation = createStaticNavigation(RootStack)

export default function App() {
  return(
    <>
    <IconRegistry icons={EvaIconsPack} />
    <Navigation/>
    </>
  )
}
>>>>>>> Stashed changes
