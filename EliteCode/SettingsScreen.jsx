import * as React from 'react';
import { View, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button, Layout, ListItem } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { FIREBASE_AUTH } from './firebaseConfig';

const SettingsScreen = () => {
    const navigation = useNavigation();
    return (
        <Layout>
            <ListItem title="Profile" description="Manage your account" />

            <ListItem title="Notifications" description="Turn on or off" />

            <ListItem title="Font-size" description="Change font size" />

            <ListItem title="Security" description="Change your password" />

            <ListItem title="Brightness" description="Light or dark mode" />

            <ListItem title="Language" description="Change language" />

            <ListItem title="FAQ" description="Frequently asked questions" />

            <ListItem title="About" description="App information" />

            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />

        </Layout>
    );
}
export default () => (

    <Layout style={
        {
            flex: 1,
            // justifyContent: 'center', 
            // alignItems: 'center' 
        }
    }>
        <SettingsScreen />
    </Layout>

);