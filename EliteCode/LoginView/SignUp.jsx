import * as eva from '@eva-design/eva';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { ApplicationProvider, Layout, Button, Text, Input } from '@ui-kitten/components';
import { ActivityIndicator, StyleSheet, View, ScrollView, Alert } from 'react-native';

const SignUp = () => {
  const navigation = useNavigation();
  const { signUp, logout } = useAuth();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorsObj, setErrorsObj] = useState({});

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
      errorsObj.role = 'Please select a role';
    }

    setErrorsObj(errorsObj);
    return Object.keys(errorsObj).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
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

      const textResponse = await response.text();
      const data = JSON.parse(textResponse);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user in MySQL.');
      }

      await handleLogout();
      navigation.reset({ index: 0, routes: [{ name: 'FirstScreen' }] });

    } catch (error) {
      console.error('Sign-up error:', error);
      alert(error.message || 'Invalid Email or Password. Must be at least 6 characters.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentWrapper} showsVerticalScrollIndicator={false}>

          <View style={styles.card}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Create your account</Text>

            <Input
              style={styles.input}
              label="First Name"
              placeholder="First Name"
              value={fname}
              onChangeText={setFname}
              autoCapitalize="none"
            />
            <Input
              style={styles.input}
              label="Last Name"
              placeholder="Last Name"
              value={lname}
              onChangeText={setLname}
              autoCapitalize="none"
            />
            <Input
              style={styles.input}
              label="Email"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            {errorsObj.email && <Text style={styles.error}>{errorsObj.email}</Text>}

            <Input
              style={styles.input}
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {errorsObj.password && <Text style={styles.error}>{errorsObj.password}</Text>}

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
            {errorsObj.role && <Text style={styles.error}>{errorsObj.role}</Text>}

            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Button style={styles.submit} onPress={handleSubmit}>
                Submit
              </Button>
            )}
          </View>

          <Button appearance="ghost" style={styles.backButton} onPress={() => navigation.navigate('FirstScreen')}>
            Back to First Screen
          </Button>

          <View style={styles.footerContainer}>
            <Text style={styles.footerLine1}>Stay curious. Stay coding.</Text>
            <Text style={styles.footerLine2}>EliteCode © 2025 — Red Panda Studios</Text>
          </View>
        </ScrollView>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C496B',
    paddingHorizontal: 20,
    position: 'relative',
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 120,
  },
  card: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: '#1E2A38',
    borderRadius: 15,
    padding: 20,
    borderColor: '#334154',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 120,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9B7C6',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#253243',
    borderRadius: 10,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  roleLabel: {
    marginTop: 0,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  submit: {
    backgroundColor: '#3A4B5C',
    borderRadius: 10,
    marginTop: 10,
  },
  backButton: {
    marginTop: -5,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  footerLine1: {
    color: '#A9B7C6',
    fontSize: 12,
    marginBottom: 2,
  },
  footerLine2: {
    color: '#A9B7C6',
    fontSize: 12,
    opacity: 0.7,
  },
});

export default SignUp;
