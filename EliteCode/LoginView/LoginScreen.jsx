import * as React from 'react';
import { Text, StyleSheet, View, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Input, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useEffect, useState } from 'react';
import { ApplicationProvider, theme } from '@ui-kitten/components';
import { useAuth } from '../AuthContext';

function LoginScreen() {
  const navigation = useNavigation();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Invalid Login', error.message);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'teacher') {
        navigation.reset({ index: 0, routes: [{ name: 'TeacherHome' }] });
      } else if (user.role === 'student') {
        navigation.reset({ index: 0, routes: [{ name: 'StudentHome' }] });
      }
    }
  }, [user, navigation]);

  const renderEyeIcon = (props) => (
    <Icon {...props} name={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />
  );

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentWrapper} showsVerticalScrollIndicator={false}>

          <Image
            source={require("../assets/images/welcomeBack.png")}
            style={{ width: 200, height: 200, marginTop: -30, marginBottom: 10, alignSelf: 'center' }}
          />

          <View style={styles.card}>
            <Text style={styles.subtitle}>Please log in to continue</Text>

            <Input
              style={styles.input}
              textStyle={{ color: 'white' }}
              label='Email'
              placeholder='Enter Email'
              placeholderTextColor="#7A8CA0"
              value={email}
              autoCapitalize='none'
              onChangeText={setEmail}
            />

            <Input
              style={styles.input}
              textStyle={{ color: 'white' }}
              label='Password'
              placeholder='Enter Password'
              placeholderTextColor="#7A8CA0"
              value={password}
              secureTextEntry={!showPassword}
              accessoryRight={renderEyeIcon}
              onChangeText={setPassword}
            />

            <Text style={styles.resetLink} onPress={() => navigation.navigate('ResetPassword')}>
              Forgot Password?
            </Text>

            <Button style={styles.loginButton} onPress={handleLogin}>
              Submit
            </Button>
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
    marginTop: -25,
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
  loginButton: {
    backgroundColor: '#3A4B5C',
    borderRadius: 10,
    marginTop: 10,
  },
  resetLink: {
    fontSize: 14,
    color: '#A9B7C6',
    textAlign: 'right',
    paddingRight: 4,
    fontWeight: '600',
    marginBottom: 16,
  },
  backButton: {
    marginTop: -5,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
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

export default LoginScreen;
