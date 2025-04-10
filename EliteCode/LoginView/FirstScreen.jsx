import * as React from 'react';
import {Text,  StyleSheet, Image} from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import { Button, Layout, Divider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


function FirstScreen() {
    const navigation = useNavigation();
  return (
    <Layout style={styles.containerMain}>
    <Image
    source={require("../assets/images/FinalLogo2.png")}
            style={{ width: 300, height: 150, marginBottom: 30 }}
          />
        <Layout style={styles.containerInner}>
        <Button style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          Login
            </Button>
            <Divider></Divider>
            <Button style={styles.button} onPress={() => navigation.navigate('SignUp')}>
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