import * as React from 'react';
import { Text, Alert } from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {Button,Layout, ListItem } from '@ui-kitten/components';
import {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {useAuth} from '../AuthContext';

  
const StudentSettings = () =>{
    const navigation = useNavigation();
    const {logout} = useAuth();

    const handleLogout = async () => {
        try {
          await logout();
        } catch (error) {
          Alert.alert('Invalid Logout');
        }
    };

    useEffect(() => {
        fetch('https://elitecodecapstone24.onrender.com/user')
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('error:', error);
          });
      }, []);

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

      <ListItem title="Logout" onPress={handleLogout} />

                    </Layout>
    );
}
export default ()=> (

        <Layout style={
            { flex: 1, 
                // justifyContent: 'center', 
                // alignItems: 'center' 
            }
            }>
        <StudentSettings/>
        </Layout>

);