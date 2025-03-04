import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>

      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 40 }}>
      
        <Text category="h5" style={{ flex: 1, textAlign: "center", paddingRight: 62 }}>
          Elite Code
        </Text>
      </View>

      <ScrollView>

        {/* Profile Section */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={require("./assets/images/profile-picture.png")}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text category="h6">Nickname</Text>
          <Text appearance="hint">Username</Text>
          <Button size="small" style={{ marginTop: 10 }} onPress={() => console.log("Edit profile button pressed")}>Edit Profile</Button>
        </View>

        {/* My Courses Section */}
        <View style={{ marginBottom: 20 }}>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <Text category="s1">My Courses</Text>
            <TouchableOpacity onPress={() => console.log("Edit courses button pressed")}>
              <Text appearance="hint">edit</Text>
            </TouchableOpacity>
          </View>

          <Card style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => console.log("Course card 1 pressed")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text>Course Name</Text>
                  <Text appearance="hint">Description</Text>
                </View>
                <Text category="s2">Grade: A</Text>
              </View>
            </TouchableOpacity>
          </Card>

          <Card>
            <TouchableOpacity onPress={() => console.log("Course Card 2 pressed")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text>Course Name</Text>
                  <Text appearance="hint">Description</Text>
                </View>
                <Text category="s2">Grade: A</Text>
              </View>
            </TouchableOpacity>
          </Card>

        </View>

        {/* Languages Section */}
        <View>

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
              justifyContent: "space-evenly",
            }}
          >
            {["Java", "Python", "C", "Swift", "SQL"].map((lang) => (
              <Button key={lang} size="tiny" style={{ margin: 5 }}>
                {lang}
              </Button>
            ))}
          </Layout>

        </View>

      </ScrollView>
    </Layout>
  );
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <ProfileScreen />
    </ApplicationProvider>
  </>
);

