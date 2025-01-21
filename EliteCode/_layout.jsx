import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import App from './App'
import Stack  from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options = {{ headerShown: false}}></Stack.Screen>
    </Stack>
  )
}

export default _layout