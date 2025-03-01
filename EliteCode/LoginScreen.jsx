import * as React from 'react';
import {Text } from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {default as theme} from './custom-theme.json'
import { ApplicationProvider, Button, Layout, Input} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {react, useEffect, useState} from 'react';



function LoginScreen() {
    const navigation = useNavigation();
    const [value, setValue] = useState('');
    useEffect(() => {
      fetch('https://elitecodecapstone24.onrender.com/user')
        .then(response => response.json()) 
        .then(data => {
          console.log(data); 
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);
    return (
        <Layout>
            <Input label='Username'
            placeHolder = 'Enter username'
            value={value}
            onChangeText={nextValue=> setValue(nextValue)}></Input>
            <Button onPress={() => navigation.navigate('Home')}>
          Go to Home
            </Button>
            <Button onPress={() => navigation.navigate('Settings')}>
          Go to Settings
            </Button>
        </Layout>
    );
  }
  
export default ()=> (
    <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoginScreen/>

        </Layout>
    </ApplicationProvider>

);
  

// ... other code from the previous section