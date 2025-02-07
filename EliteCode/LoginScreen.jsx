import * as React from 'react';
import {Text,  StyleSheet,View} from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import { Button, Layout, Input, Divider,} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import react from 'react';




function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = react.useState('');
    const [password, setPassword] = react.useState('');
    return (
        <Layout style={styles.container}>
      <View style={styles.header}>
              <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()}>
                       {"<"}
                     </Button>
               <Text category="H1" style={styles.headerText}>
                 Elite Code
               </Text>
             </View>
      <Divider/>
      <View style={styles.inputContainer}>
      <Text
        style={styles.innerText}
        category='H1'
      >Login</Text>
          <Input 
            style={styles.inputs}
            label='Username'
            placeholder='Enter username'
            value={username}
            onChangeText={nextUsername => setUsername(nextUsername)} />
          <Input style={styles.inputs}
            label='Password'
            placeholder = 'Enter Password'
            value={password}
            onChangeText={nextPassword=> setPassword(nextPassword)}
          />
      <Button style={styles.submit} onPress={() => navigation.navigate('HomeGroup', { screen: 'Home' })}>
    Submit
      </Button>
      </View>
<View style={styles.tempButtons}>
            <Button onPress={() => navigation.navigate('HomeGroup', { screen: 'Home' })}>
                  Skip to Home
                </Button>
                   <Button onPress={() => navigation.popToTop()}>
          Back to First Screen
                   </Button>
         </View>
        </Layout>
    );
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
  
export default ()=> (

        <Layout style={{ flex: 1 }}>
        <LoginScreen/>
        </Layout>

);
  

// ... other code from the previous section