import * as React from 'react';
import { Text, Alert, View, Image} from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import { Button, Layout, ListItem } from '@ui-kitten/components';
import { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { useAuth } from '../AuthContext';


function TeacherSettings() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logout successful!');
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
        <Image
              source={require("../assets/images/FinalLogo2.png")}
              style={{ width: 300, height: 150}}
            />
  
{/* 
      <ListItem title="Notifications" description="Turn on or off" />

      <ListItem title="Font-size" description="Change font size" />

      <ListItem title="Security" description="Change your password" />

      <ListItem title="Brightness" description="Light or dark mode" />

      <ListItem title="Language" description="Change language" />

      <ListItem title="FAQ" description="Frequently asked questions" />

      <ListItem title="About" description="App information" /> */}

      <ListItem title="Logout" onPress={handleLogout} />

    </Layout>
  );
}
export default () => (

  <Layout style={
    {
      flex: 1,
     
    }
  }>
    <TeacherSettings />
  </Layout>

);