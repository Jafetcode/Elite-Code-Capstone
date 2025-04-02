import * as eva from '@eva-design/eva';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Layout, Button, Text, Input, Divider } from '@ui-kitten/components';

const SignUp = () => {
  const navigation = useNavigation();
  const { signUp, logout } = useAuth();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorsObj, setErrorsObj] = useState("");

  const validateForm = () => {
    let errorsObj = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errorsObj.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errorsObj.email = 'Invalid email, Please enter a valid email';
    }
    if (!password) {
      errorsObj.password = 'Password is required';
    } else if (password.length < 6 || password.length > 20) {
      errorsObj.password = 'Password must be between 6 and 20 characters';
    } else if (password.search(/[A-Z][a-z]/i) < 0) {
      errorsObj.password = 'Password must contain at least one letter';
    } else if (password.search(/[0-9]/) < 0) {
      errorsObj.password = 'Password must contain at least one digit';
    }
    if (!role) {
      errors.role = 'Please select a role';
    }

    setErrorsObj(errorsObj);
    return Object.keys(errorsObj).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log('Valid email and password');
      handleSignUp();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Invalid Logout');
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await signUp(email, password);
      const newUser = userCredential.user;

      const response = await fetch('https://elitecodecapstone24.onrender.com/newUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fname, lname, role }),
      });

      // Log raw response before parsing
      const textResponse = await response.text();
      console.log('Raw API Response:', textResponse);

      // Parse JSON only if response is valid
      const data = JSON.parse(textResponse);
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user in MySQL.');
      }

      // Once user is created, sign them out and reset navigation
      await handleLogout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirstScreen' }],
      });

    } catch (error) {
      console.error('Sign-up error:', error);
      alert(error.message || 'Invalid Email or Password. Must have a valid Email & Password > 6 characters long.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()}>
          {'<'}
        </Button>
        <Text category="h1" style={styles.headerText}>
          Elite Code
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.innerText} category="h1">
          Register
        </Text>

        <Input
          style={styles.inputs}
          label="FirstName"
          placeholder="First Name"
          value={fname}
          onChangeText={(text) => setFname(text)}
          autoCapitalize="none"
        />
        <Input
          style={styles.inputs}
          label="LastName"
          placeholder="Last Name"
          value={lname}
          onChangeText={(text) => setLname(text)}
          autoCapitalize="none"
        />
        <Input
          style={styles.inputs}
          label="Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        {errorsObj.email ? <Text style={{ color: 'red' }}>{errorsObj.email}</Text> : null}
        <Input
          style={styles.inputs}
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Text style={styles.roleLabel}>Select Role</Text>
        <View style={styles.roleButtons}>
          <Button
            appearance={role === 'student' ? 'filled' : 'outline'}
            onPress={() => setRole('student')}
            style={styles.roleButton}
          >
            Student
          </Button>
          <Button
            appearance={role === 'instructor' ? 'filled' : 'outline'}
            onPress={() => setRole('instructor')}
            style={styles.roleButton}
          >
            Instructor
          </Button>
        </View>

        {errorsObj.password ? <Text style={{ color: 'red' }}>{errorsObj.password}</Text> : null}
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button style={styles.submit} onPress={handleSubmit}>
            Submit
          </Button>
        )}
      </View>
      <View style={styles.tempButtons}>
        {/* <Button onPress={() => navigation.navigate('HomeGroup', { screen: 'Home' })}>
          Skip to Home
        </Button> */}
        <Button onPress={() => navigation.navigate('LoginScreen')}>
          Back to Login
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 10,
    height: 100,
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
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 'auto'
  },
  outerText: {
    alignItems: 'center',
    alignSelf: 'center',
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
    marginTop: 'auto',
  },
  roleLabel: {
    marginTop: 15,
    fontSize: 16,
    color: 'white',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
    marginVertical: 10,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  tempButtons: {
    marginTop: 200,
  },
  submit: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
  },
  pickerStyle: {
    height: 200,
    color: 'white',
    backgroundColor: '#526F8C',
    borderRadius: 10,
    fontSize: 10,
  }
});

export default () => (
  <>
    {/* <IconRegistry icons={EvaIconsPack} /> */}
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SignUp />
    </ApplicationProvider>
  </>
);