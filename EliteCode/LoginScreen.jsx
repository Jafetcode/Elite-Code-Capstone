import * as React from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import { Button, Layout, Input, Divider, } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import react from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import { FIREBASE_AUTH } from './firebaseConfig';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const [userInfo, setInfo] = useState();
  const auth = FIREBASE_AUTH;

  // const {userData, setUserData} = React.useContext
  // state = {
  //   useremail: "",
  //   userid: "",
  //   role: "",
  //   name: ""
  // }

  const getUserData = async (email) => {
    try {
      console.log("fetching user data for: ", email)
      const response = await fetch(`https://ec2-18-118-218-180.us-east-2.compute.amazonaws.com/userRole?email=${email}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("User data received:", data);

      setInfo(data.userID);
      
      console.log(`email: ${email}, id: ${data.userID}`);
      return data;
    } catch (err) {
      console.error("Error fetching user role:", err);
      return null;
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log('Login successful! Welcome, ', email);
      const data = await getUserData(email);
      if (!data) {
        throw new Error("User data not received.");
      }

      await AsyncStorage.setState('useremail', email)
      await AsyncStorage.setItem('role', data.role)
      await AsyncStorage.setItem('userid', data.userID)
      await AsyncStorage.setItem('name', data.fname)
      console.log("User info stored in AsyncStorage.");

    } catch (err) {
      Alert.alert('Invalid Login');
      console.log("Login failed:" + err.message)
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
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
          <Text style={styles.innerText} category='H1'> Login </Text>
          <Input style={styles.inputs} label='Email' placeholder='Enter email' autoCapitalize="none" value={email} onChangeText={nextEmail => setEmail(nextEmail)} />
          <Input style={styles.inputs} label='Password' placeholder='Enter Password' autoCapitalize="none" value={password} onChangeText={nextPassword => setPassword(nextPassword)} />
          <Button style={styles.submit} onPress={handleLogin}>
            Submit
          </Button>
        </View>
        <View style={styles.tempButtons}>
          <Button onPress={() => navigation.navigate('HomeGroup', { screen: 'Home' })}>
            Skip to Home
          </Button>
          <Button onPress={() => navigation.popToTop()}>
            Back to First Screen
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Layout >
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
    alignItems: 'center',
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
    marginTop: 200,
  },
  submit: {
    position: 'relative',
    marginTop: 20,
  }

});

export default () => (

  <Layout style={{ flex: 1 }}>
    <LoginScreen />
  </Layout>

);
