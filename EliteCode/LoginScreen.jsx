import * as React from 'react';
import {Text } from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {default as theme} from './custom-theme.json'
import { ApplicationProvider, Button, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';



function LoginScreen() {
    const navigation = useNavigation();
  
    return (
        <Layout>
            <Text>Login</Text>
            <Button onPress={() => navigation.navigate('Home')}>
          Go to Details
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