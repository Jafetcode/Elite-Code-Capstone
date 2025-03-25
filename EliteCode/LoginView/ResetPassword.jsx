import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import { Button, Layout, Input, Divider, } from '@ui-kitten/components';
import { useState } from 'react';
import { Alert } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import { fetchSignInMethodsForEmail } from 'firebase/auth';



function ResetPassword() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const { changePassword } = useAuth();

    const handleReset = async () => {
        if (!email.trim()) {
            Alert.alert('Error, please enter your email.')
            return;
        }
        try {
            console.log("Checking email:", email); 
            const signInMethods = await fetchSignInMethodsForEmail(FIREBASE_AUTH, email);
            console.log("Sign-in methods:", signInMethods); 
            if(signInMethods.length === 0) {
                console.log("Email not registered, alerting user.");
                Alert.alert("Error", "Email is not registered.");
                return;
            }
            await changePassword(email);
            Alert.alert(`Reset link has been sent to ${email}!`);
            setEmail("");
        } catch {
            Alert.alert('Email not registered to an account', error.message);
        }
};
return (
    <Layout style={styles.container}>
        <View style={styles.header}>
            <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()}>
                {"<"}
            </Button>
            <Text category="h1" style={styles.headerText}> Elite Code </Text>
        </View>
        <Divider />
        <View style={styles.inputContainer}>
            <Text
                style={styles.innerText}
                category='h1'
            > Reset Password </Text>
            <Input
                style={styles.inputs}
                label='Email'
                placeholder='Enter Email'
                value={email}
                autoCapitalize='none'
                onChangeText={nextEmail => setEmail(nextEmail)} />
            <Button style={styles.submit} onPress={handleReset}>
                Send email
            </Button>
        </View>
        <View style={styles.tempButtons}>
            <Button onPress={() => navigation.navigate('FirstScreen')}> Back to First Screen </Button>
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
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    tempButtons: {
        marginTop: 200,
    },
    inputs: {
        width: 250,
    },
  innerText: {
    flexDirection: 'column',
    margin: 2,
    fontSize: 20,
    color: 'white',
    paddingBottom: 30
  },
    submit: {
        position: 'relative',
        marginTop: 20,
    },
});

export default ResetPassword;