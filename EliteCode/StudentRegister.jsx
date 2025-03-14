import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Layout, Button, Text, Divider, Input } from '@ui-kitten/components'
import { FIREBASE_AUTH } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';


const StudentRegister = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      // Step 1: Register in Firebase
      const userCredential = createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const response = await fetch('https://elitecodecapstone24.onrender.com/newUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fname, lname, role })
      });
       // Log raw response before parsing
       const textResponse = await response.text();
       console.log("Raw API Response:", textResponse);

       // Parse JSON only if response is valid
       const data = JSON.parse(textResponse);
      if (!response.ok) {
        throw new Error(data.error || "Failed to create user in MySQL.");
      }
      alert("Check your email for verification before logging in!");
    } catch (error) {
      console.error("Sign-up error:", error);
      alert(error.message || "Invalid Email or Password. Must have a valid Email & Password > 6 characters long.");
    } finally {
      setLoading(false);
    }
  }

  // const signIn = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await signInWithEmailAndPassword(auth, email, password);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Sign in failed: " + error.message)
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
        <Text style={styles.innerText} category='h1'> Register </Text>
        <Picker selectedValue={role} onValueChange={setRole}>
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Teacher" value="teacher" />
        </Picker>
        <Input
          style={styles.inputs}
          label='FirstName'
          placeholder='First Name'
          value={fname}
          onChangeText={(text) => setFname(text)}
          autoCapitalize='none' />
        <Input
          style={styles.inputs}
          label='LastName'
          placeholder='Last Name'
          value={lname}
          onChangeText={(text) => setLname(text)}
          autoCapitalize='none' />

        <Input style={styles.inputs} label='Email'
          placeholder='Enter Email' value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none' />

        <Input
          style={styles.inputs}
          label='Password'
          placeholder='Enter Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize='none'
          secureTextEntry={true} />
        {loading ? (
          <ActivityIndicator size='small' />
        ) : (
          <>
            <Button style={styles.submit} onPress={signUp}>
              Submit
            </Button>
          </>
        )
        }
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

export default StudentRegister;