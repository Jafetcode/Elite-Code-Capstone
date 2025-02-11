import * as React from 'react';
import {Text,  StyleSheet} from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import { Button, Layout, Divider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


function FirstScreen() {
    const navigation = useNavigation();
  return (
    <Layout style={styles.containerMain}>
    <Text style={styles.outer}>EliteCode</Text>
        <Layout style={styles.containerInner}>
        <Button style={styles.button} onPress={() => navigation.push('LoginGroup')}>
          Login
            </Button>
            <Divider></Divider>
            <Button style={styles.button} onPress={() => navigation.push('LoginGroup', {screen:'SignUp'})}>
          SignUp
        </Button>
       </Layout>

    </Layout>
  )
}

export default ()=>(
        <FirstScreen/>
);

const styles = StyleSheet.create({
  containerMain:{
    flex:1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 0,

},
containerInner:{
    justifyContent: 'center',
    alignItems: 'center', 
},
text:{
    fontSize:30,
    marginLeft: 100,
    alignSelf: "flex-start",
},
button:{
    width:200,
    marginTop:15,

},
outer:{
    fontSize: 40,
    marginBottom: 40,
    color:'white'
}
})