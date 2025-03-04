import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {Button,Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import FirstScreen from './FirstScreen';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Navigate</Text>
      <Button onPress={() => navigation.push('HomeGroup')}>
        Go back to Navigate
      </Button>
      <Button onPress={() => navigation.popToTop('FirstScreen')}>Go to First Screen</Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </Layout>
  );
}
  export default ()=> (
        <HomeScreen/>
);

const styles = StyleSheet.create({
  containerMain:{
      flex:1,
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center', 
      padding: 0,

  },
  containerInner:{
      justifyContent: 'center',
      alignItems: 'center', 
  },
  text:{
      fontSize:30,
      marginLeft: 100,
      alignSelf: "flex-start",
  },
  button:{
      width:200,
      marginTop:15,

  },
  outer:{
      fontSize: 40,
      marginBottom: 40,
  }
})