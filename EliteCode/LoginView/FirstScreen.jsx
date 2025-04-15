import * as React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Card, Divider } from '@ui-kitten/components';

function FirstScreen() {
  const navigation = useNavigation();

  return (
    <Layout style={styles.containerMain}>
      <Image
        source={require("../assets/images/FinalLogo2.png")}
        style={{ width: 300, height: 150, marginTop: -55 }}
      />

      {/* ✅ NEW View to only raise the text */}
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>Welcome to EliteCode</Text>
        <Text style={styles.tagline}>Built for the next generation of developers.</Text>
      </View>

      {/* Card stays in natural position to avoid squishing */}
      <Card style={styles.cardContainer}>
        <Button style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          Login
        </Button>

        <Divider style={styles.divider} />

        <Button style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Button>
      </Card>
      <Text style={styles.subtagline}>Learn. Build. Level Up.</Text>

      {/* Footer stays the same */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerLine1}>Stay curious. Stay coding.</Text>
        <Text style={styles.footerLine2}>EliteCode © 2025 — Red Panda Studios</Text>
      </View>
    </Layout>
  );
}

export default () => <FirstScreen />;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#2C496B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  textContainer: {
    alignItems: 'center',
    marginTop: -30, 
  },

  welcome: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  tagline: {
    color: '#A9B7C6',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtagline: {
    color: '#7A8CA0',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 5,
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
