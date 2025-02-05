import * as React from 'react';
import {Text,  StyleSheet} from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {default as theme} from './custom-theme.json'
import { Button, Layout, Input, Divider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import react from 'react';




function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = react.useState('');
    const [password, setPassword] = react.useState('');
    return (
        <Layout style={styles.row}>
           <Text
        style={styles.text}
        category='H1'
      >User Login</Text>
      <Divider/>
            <Input label='Username'
            placeHolder = 'Enter username'
            value={username}
            onChangeText={nextUsername=> setUsername(nextUsername)}></Input>
             <Input label='Password'
            placeHolder = 'Enter Password'
            value={password}
            onChangeText={nextPassword=> setPassword(nextPassword)}></Input>
            
            <Button onPress={() => navigation.navigate('HomeGroup')}>
          Go to Home
            </Button>
            <Button onPress={() => navigation.navigate('HomeGroup',{screen:'Settings'})}>
          Go to Settings
            </Button>
        </Layout>
    );
  }
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    text: {
      margin: 2,
    },
    button:{
  
    }
  });
  
export default ()=> (

        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoginScreen/>
        </Layout>

);
  

// ... other code from the previous section