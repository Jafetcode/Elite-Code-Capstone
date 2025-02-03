import * as React from 'react';
import { Text } from 'react-native';
import {useNavigation,} from '@react-navigation/native';
import {default as theme} from './custom-theme.json'
import { ApplicationProvider,Button,Layout, ListItem } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

  
function SettingsScreen(){
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

                    </Layout>
        );
}
export default ()=> (
    <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <Layout style={
            { flex: 1, 
                // justifyContent: 'center', 
                // alignItems: 'center' 
            }
            }>
        <SettingsScreen/>
        </Layout>
    </ApplicationProvider>

);