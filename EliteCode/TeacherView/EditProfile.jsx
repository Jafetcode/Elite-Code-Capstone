import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card,  Input } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";


function EditProfile() {
    const navigation = useNavigation();
    const { user, setUser } = useAuth();
  
    const [fname, setfName] = React.useState(user.fname);
    const [lname, setlName] = React.useState(user.lname);
    const [bio, setBio] = React.useState(user.bio);
    const handleEditProfile = async () => {
        try {
          const res = await fetch(`https://elitecodecapstone24.onrender.com/user/${user.userID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fname, lname, bio }),
          });
      
          if (res.ok) {
            const updatedUser = { ...user, fname, lname, bio };
            setUser(updatedUser); 
            Alert.alert("Success", "Profile updated!");
            navigation.goBack();
          } else {
            Alert.alert("Error updating Profile");
          }
        } catch (err) {
          console.error(err);
          Alert.alert("Error updating Profile");
        }
      };

    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text category="h5" style={{ marginBottom: 20 }}>Edit Profile</Text>
  
          <Text >First Name</Text>
          <Input
            value={fname}
            onChangeText={setfName}
            placeholder={user.fname}
            
          />
         <Text >Last Name</Text>
          <Input
            value={lname}
            onChangeText={setlName}
            placeholder={user.lname}
           
          />
          <Text >Bio</Text>
          <Input
            value={bio}
            onChangeText={setBio}
            placeholder={user.bio}
            multiline
            textStyle={{ minHeight: 100 }}
          />
  
          <Button style={{ marginTop: 20 }} onPress={handleEditProfile}>
            Save Changes
          </Button>
        </ScrollView>
      </Layout>
    );
  }
  
export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <EditProfile />
        </ApplicationProvider>
    </>
);