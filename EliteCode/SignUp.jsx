import { StyleSheet,View } from 'react-native'
import React from 'react'
import {  Layout, Button,Text, Divider} from '@ui-kitten/components'
import {useNavigation} from '@react-navigation/native';
const SignUp = () => {
    const navigation = useNavigation();
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
           <Button style={styles.button} onPress={() => navigation.navigate('RegisterGroup',{screen:'Student'})}>
            Student Account
           </Button>
           <Button onPress={() => navigation.navigate('RegisterGroup', { screen: 'Student' })}>
             Teacher Account
           </Button>
         </View>
         <View style={styles.tempButtons}>
           <Button onPress={() => navigation.navigate('HomeGroup')}>
             Continue
           </Button>
           <Button onPress={() => navigation.navigate('Login')}>
             Back to Login
           </Button>
         </View>
       </Layout>
     )
   }


export default ()=> (
    <SignUp/>
)

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
  button: {
    margin: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    backgroundColor: '#526F8C',
    borderRadius: 10,
    width: 300,
    height: 200,
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
});