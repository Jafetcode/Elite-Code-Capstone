import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Layout, Button, Text, Divider, Input } from '@ui-kitten/components'
import { FIREBASE_AUTH } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function TeacherRegister() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Check your emails!")
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password. Must have valid Email & Password > 6 characters long.")
    } finally {
      setLoading(false);
    }
  }
  
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message)
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()}>
          {"<"}
        </Button>
        <Text category="h1" style={styles.headerText}>
          Elite Code
        </Text>
      </View>
   
      <View style={styles.inputContainer}>
        <Text
          style={styles.innerText}
          category='H1'
        >Register Teacher</Text>
        <Input
          style={styles.inputs}
          label='Email'
          placeholder='Enter Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
        />
        <Input
          style={styles.inputs}
          label='Password'
          placeholder='Enter Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize='none'
          secureTextEntry={true}
        />

        {loading ? (
          <ActivityIndicator size='small' />
        ) : (
          <>
            <Button style={styles.submit} onPress={signUp}>
              Submit
            </Button>
          </>
        )}
      </View>
      <View style={styles.tempButtons}>
        <Button onPress={() => navigation.navigate('HomeGroup', { screen: 'Home' })}>
          Skip to Home
        </Button>
        <Button onPress={() => navigation.navigate('Login')}>
          Back to Login
        </Button>
      </View>
    </Layout>
  )
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
    marginTop: 200,
  },
  submit: {
    position: 'relative',
    marginTop: 20,
  }
});

export default TeacherRegister;