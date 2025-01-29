import * as React from 'react';
import { Text } from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {default as theme} from './custom-theme.json'
import { ApplicationProvider,Button,Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.push('Home')}>
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </Layout>
  );
}
  export default ()=> (
    <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <HomeScreen/>
    </ApplicationProvider>
);