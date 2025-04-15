import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Input, Divider } from '@ui-kitten/components';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const { changePassword } = useAuth();

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Error, please enter your email.');
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(FIREBASE_AUTH, email);
      if (signInMethods.length === 0) {
        Alert.alert("Error", "Email is not registered.");
        return;
      }
      await changePassword(email);
      Alert.alert(`Reset link has been sent to ${email}!`);
      navigation.navigate("LoginScreen");
      setEmail("");
    } catch (error) {
      Alert.alert('Email not registered to an account', error.message);
    }
  };

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

          <Input
            style={styles.input}
            label='Email'
            placeholder='Enter Email'
            value={email}
            autoCapitalize='none'
            onChangeText={setEmail}
          />

          <Button style={styles.submit} onPress={handleReset}>
            Send Email
          </Button>
        </View>

        <Button appearance="ghost" style={styles.backButton} onPress={() => navigation.navigate('LoginScreen')}>
          Back to Login Screen
        </Button>

        <View style={styles.footerContainer}>
          <Text style={styles.footerLine1}>Stay curious. Stay coding.</Text>
          <Text style={styles.footerLine2}>EliteCode © 2025 — Red Panda Studios</Text>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C496B',
    paddingHorizontal: 20,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
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
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9B7C6',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#253243',
    borderRadius: 10,
    marginBottom: 12,
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

export default ResetPassword;
