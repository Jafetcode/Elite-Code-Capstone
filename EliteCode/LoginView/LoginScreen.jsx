import * as React from 'react';
import {Text,  StyleSheet,View} from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import { Button, Layout, Input, Divider,} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ApplicationProvider, theme } from '@ui-kitten/components';
import {useAuth} from '../AuthContext';


function LoginScreen() {
  const navigation = useNavigation();
  const {login, user} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      // Changed: Using error.message instead of error object for the Alert
      Alert.alert('Invalid Login', error.message);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'teacher') {
        navigation.reset({
          index: 0,
          routes: [{name:'TecaherHome'}],
        });
      } else if (user.role === 'student') {
        navigation.reset({
          index: 0,
          routes: [{name:'StudentHome'}],
        });
      }
    }
  }, [user, navigation]);

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()}>
          {"<"}
        </Button>
        <Text category="H1" style={styles.headerText}>
          Elite Code
        </Text>
      </View>
      <Divider />
      <View style={styles.inputContainer}>
        <Text
          style={styles.innerText}
          category='H1'
        >Login</Text>
        <Input
          style={styles.inputs}
          label='Email'
          placeholder='Enter Email'
          value={email}
          autoCapitalize='none'
          onChangeText={nextEmail => setEmail(nextEmail)} />

        <Input style={styles.inputs}
          label='Password'
          placeholder='Enter Password'
          value={password}
          secureTextEntry={true}
          onChangeText={nextPassword => setPassword(nextPassword)}
        />

        <Text style={styles.resetLink} onPress= {() => navigation.navigate('ResetPassword')}> Forgot Password? </Text>
        
        <Button style={styles.submit} onPress={handleLogin}>
          Submit
        </Button>
      </View>
      <View style={styles.tempButtons}>
        {/* <Button onPress={() => navigation.navigate('HomeGroup', { screen: 'Home' })}>
          Skip to Home
        </Button> */}
        <Button onPress={() => navigation.navigate('FirstScreen')}> Back to First Screen </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 10,
    height: 80,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    paddingRight: 50,
    color: 'white',
  },
  backButton: {
    width: 40,
  },
  inputContainer: {
    flexDirection: 'column',
    backgroundColor: '#526F8C',
    borderRadius: 10,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems:'center', 
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  outerText: {
    fontSize: 20,
    color: 'white',
  },
  innerText: {
    flexDirection: 'column',
    margin: 2,
    fontSize: 20,
    color: 'white',
  },
  inputs: {
    width: 250,
  },
  tempButtons: {
    marginTop: 50,
  },
    submit: {
    position: 'relative',
    marginTop: 20,
  },
  resetLink: {
    fontSize : 14,
    color: "white",
    paddingTop: 10,
    alignSelf: "flex-end",
    paddingRight: 25,
    fontWeight: 600
  }
    
  });
  

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoginScreen />
    </Layout>
  </ApplicationProvider>
)