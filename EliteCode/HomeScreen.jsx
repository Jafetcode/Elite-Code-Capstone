import * as React from "react";
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ApplicationProvider,
  Button,
  Layout,
  Text,
  Card,
  Modal,
  Input,
} from "@ui-kitten/components";

function ProfileScreen() {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [classCode, setClassCode] = React.useState('');
  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
      <ScrollView>
        {/* My Courses Section */}
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text category="s1">Course Library</Text>

            <Button onPress={() => setVisible(true)}>Join Course</Button>

            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}
            >

              <Card disabled={true}>
                <Text  style={{marginBottom: 20}}>Enter a class code</Text>
                <Input 
            style={styles.inputs}
            label='Class'
            placeholder='class code'
            value={classCode}
            onChangeText={nextClassCode => setClassCode(nextClassCode)} />
                <Button onPress={() => setVisible(false)}>Join</Button>
              </Card>

            </Modal>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('StudentCourse')}>
          <Card style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#ccc",
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Grade: A</Text>
            </View>
          </Card>
          </TouchableOpacity>

          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#ccc",
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Grade: A</Text>
            </View>
          </Card>

        </View>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text category="s1">Personal Library</Text>
          </View>
          <Card style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#ccc",
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Lessons: 11/24</Text>
            </View>
          </Card>

          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#ccc",
                  marginRight: 10,
                }}
              />
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
    <ProfileScreen />
  </Layout>
);
const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
