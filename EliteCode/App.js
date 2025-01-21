import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
// import { Button } from '@ui-kitten/components';
import {Link} from 'expo-router'

export default function App() {
  const [counter, setCounter] = React.useState(0);
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <View style={styles.container}>
      <Text>Open up App.js to start working start</Text>
      <Link href ="/profile" style={{color: 'blue'}}>
        Go To Profile 
      </Link>
      <StatusBar style="auto" />
    </View>
    </ApplicationProvider>
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
<ApplicationProvider></ApplicationProvider>
// import React from 'react';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

// const HomeScreen = () => (
//   <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Text category='h1'>HOME</Text>
//   </Layout>
// );

// export default () => (
//   <ApplicationProvider {...eva} theme={eva.light}>
//     <HomeScreen />
//   </ApplicationProvider>
// );
