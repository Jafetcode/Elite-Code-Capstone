import { StyleSheet } from 'react-native'
import React from 'react'
import {  Layout, Button,Text, Divider} from '@ui-kitten/components'
import {useNavigation} from '@react-navigation/native';
const SignUp = () => {
    const navigation = useNavigation();
  return (
    <Layout style={styles.containerMain}>
    <Text style={styles.outer}>Welcome</Text>

        <Text
        style={styles.text}
        >Register</Text>
        <Layout style={styles.containerInner}>
        <Button style={styles.button} onPress={() => navigation.navigate('RegisterGroup',{screen:'Student'})}>
          Student
            </Button>
            <Divider></Divider>
            <Button style={styles.button} onPress={() => navigation.navigate('RegisterGroup',{screen:'Teacher'})}>
          Teacher
        </Button>
       </Layout>

    </Layout>

  )
}

export default ()=> (
    <SignUp/>
)

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
    }
})