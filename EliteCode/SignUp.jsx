import { StyleSheet,View } from 'react-native'
import React from 'react'
import {  Layout, Button,Text, Divider} from '@ui-kitten/components'
import {useNavigation} from '@react-navigation/native';
const SignUp = () => {
    const navigation = useNavigation();
  return (
    <Layout style={styles.containerMain}>
    <Text style={styles.outer}>Welcome</Text>
    <View style={styles.containerInner}>
        <Text
        style={styles.text}
        >Register</Text>

        <Button style={styles.button} onPress={() => navigation.navigate('RegisterGroup',{screen:'Student'})}>
          Student
            </Button>
            <Divider></Divider>
            <Button style={styles.button} onPress={() => navigation.navigate('RegisterGroup',{screen:'Teacher'})}>
          Teacher
        </Button>
       </View>
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
         backgroundColor: 80808,
         width: 300,
         height: 200,
         paddingBottom:80,
         paddingTop: 40,
    },
    text:{
        fontSize:30,
        marginLeft: 20,
        alignSelf: 'flex-start',
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