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
  const { user, logout } = useAuth();  // Get the user and logout function
  if (!user) {
    Alert.alert("Unauthorized", "You need to log in first.", [
      { text: "OK", onPress: () => navigation.navigate("Login")},
    ]);
    return null;
  }

  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>

      {/* Header */}
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

        {/* Profile Section */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={require("../assets/images/profile-picture.png")}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text category="h4">{user.fname} </Text>
          <Text appearance="hint">{user.role}</Text>
          <Text category ="h6">{user.bio}</Text>
          <Button size="small" style={{ marginTop: 10 }} onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Button>
        </View>

       
        {/* Languages Section */}
        {/* <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <Text category="s1">Languages</Text>
            <TouchableOpacity onPress={() => console.log("Language edit button pressed")}>
              <Text appearance="hint">edit</Text>
            </TouchableOpacity>
          </View>
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#526F8C",
              padding: 10,
              borderRadius: 10,
              justifyContent: "space-evenly",  }} >
            {["Java", "Python", "C", "Swift", "SQL"].map((lang) => (
              <Button key={lang} size="tiny" style={{ margin: 5 }}>
                {lang}
              </Button>  ))}
          </Layout>
        </View> */}

      </ScrollView>
    </Layout>
  );
}

export default TeacherProfile;