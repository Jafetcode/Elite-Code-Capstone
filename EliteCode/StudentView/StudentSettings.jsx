import * as React from 'react';
import { Text, StyleSheet, Image, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Layout,
  Card,
  Divider,
  IconRegistry,
  ApplicationProvider,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useAuth } from '../AuthContext';

const StudentSettings = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      Alert.alert('Logout failed');
    }
  };

  return (
    <Layout style={styles.containerMain}>
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>EliteCode</Text>
        <Text style={styles.tagline}>
          Built for the next generation of developers.
        </Text>
      </View>

      <Card style={styles.cardContainer}>
        <Button style={styles.button} onPress={handleLogout}>
          Sign Out
        </Button>
        <Divider style={styles.divider} />
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Forgot Password
        </Button>
      </Card>

      <Text style={styles.subtagline}>Learn. Build. Level Up.</Text>
      <View style={styles.footerContainer}>
              <Text style={styles.footerLine1}>Stay curious. Stay coding.</Text>
              <Text style={styles.footerLine2}>EliteCode © 2025 — Red Panda Studios</Text>
            </View>
    </Layout>
  );
};

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <StudentSettings />
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#2C496B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  },
  welcome: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  tagline: {
    color: '#A9B7C6',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  cardContainer: {
    width: '80%',
    backgroundColor: '#1E2A38',
    borderRadius: 15,
    padding: 20,
    borderColor: '#334154',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#3A4B5C',
    borderRadius: 10,
  },
  divider: {
    backgroundColor: '#334154',
    marginVertical: 10,
  },
  subtagline: {
    color: '#7A8CA0',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
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
