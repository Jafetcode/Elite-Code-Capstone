import * as React from "react";
import { View, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { default as theme } from "./custom-theme.json";
import { ApplicationProvider, Button, Layout, Text, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>


      <ScrollView>
        {/* My Courses Section */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <Text category="s1">Course Library</Text>
            <Text appearance="hint">add course </Text>
            <Text appearance="hint">edit</Text>
          </View>
          <Card style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Grade: A</Text>
            </View>
          </Card>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Grade: A</Text>
            </View>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <Text category="s1">Personal Library</Text>
            <Text appearance="hint">add course </Text>
            <Text appearance="hint">edit</Text>
          </View>
          <Card style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Lessons: 11/24</Text>
            </View>
          </Card>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Lessons: 6/18</Text>
            </View>
          </Card>
        </View>
       
      </ScrollView>
    </Layout>
  );
}

export default () => (
 
    <Layout style={{ flex: 1 }}>
      <ProfileScreen/>
    </Layout>
);
