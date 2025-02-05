import { StyleSheet } from 'react-native'
import React from 'react'
import {useNavigation,Input} from '@react-navigation/native';
import {  Layout, Button,Text, Divider} from '@ui-kitten/components'

function StudentRegister(){
  const navigation = useNavigation()
  return (
    <Layout style={styles.containerMain}>
    <Text style={styles.outer}>Welcome</Text>

        <Text
        style={styles.text}
        >Register</Text>
        <Layout style={styles.containerInner}>
        <Input style={styles.button} onPress={() => navigation.navigate('Home')}>
          Student
            </Input>
            <Divider></Divider>
            <Input style={styles.button} onPress={() => navigation.navigate('Settings')}>
          Teacher
        </Input>
       </Layout>

    </Layout>

  )
}

export default ()=> (
    <StudentRegister/>
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