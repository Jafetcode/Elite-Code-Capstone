import * as React from 'react';
import {Text,  StyleSheet,View} from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {default as theme} from './custom-theme.json'
import { Button, Layout, Input, Divider,} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import react from 'react';




function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = react.useState('');
    const [password, setPassword] = react.useState('');
    return (
        <Layout >
          <Text
        style={styles.text}
        category='H1'
      >Welcome!</Text>
         <Layout style={styles.row}>
         <Text
        style={styles.text}
        category='H1'
      >User Login</Text>
      <Divider/>
      <View style= {styles.InputContainer}>
            <Input style={styles.inputs}
            label='Username'
            placeHolder = 'Enter username'
            value={username}
            onChangeText={nextUsername=> setUsername(nextUsername)}></Input>
             <Input style={styles.inputs}
             label='Password'
            placeHolder = 'Enter Password'
            value={password}
            onChangeText={nextPassword=> setPassword(nextPassword)}></Input>
      </View>
      <View style={styles.tempButtons}>
            <Button onPress={() => navigation.navigate('HomeGroup')}>
          Go to Home
            </Button>
            <Button onPress={() => navigation.navigate('HomeGroup',{screen:'Settings'})}>
          Go to Settings
            </Button>
        </View>
        </Layout>
        </Layout>
    );
  }
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 808080,
      width: 400,
      height: 200,
    },
    text: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 2,
      fontSize: 20,
      
    },
    inputs: {
      width: 250,
    },
    tempButtons: {
     marginTop: 200,
    }
  });
  
export default ()=> (

        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoginScreen/>
        </Layout>

);
  

// ... other code from the previous section