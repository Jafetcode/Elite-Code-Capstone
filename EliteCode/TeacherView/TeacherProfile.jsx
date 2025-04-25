import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherProfile() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();  
  if (!user) {
    Alert.alert("Unauthorized", "You need to log in first.", [
      { text: "OK", onPress: () => navigation.navigate("Login")},
    ]);
    return null;
  }

  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10}}>
      <Button
          appearance="ghost"
          status="basic"
          accessoryLeft={BackIcon}
          onPress={() => navigation.goBack()}
        />
        <Text category="h5" style={{ flex: 1, textAlign: "center", paddingRight: 62 }}>
          Elite Code
        </Text>
      </View>

      <ScrollView>

    
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={require("../assets/images/profile-picture.png")}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text category="h6">{user.fname} </Text>
          <Text appearance="hint">{user.role}</Text>
          <Text appearance="hint">{user.bio}</Text>
          <Button size="small" style={{ marginTop: 10 }} onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Button>
        </View>

      </ScrollView>
    </Layout>
  );
}

export default TeacherProfile;