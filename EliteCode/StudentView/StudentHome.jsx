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

function StudentHome() {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [classCode, setClassCode] = React.useState('');
  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>

      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5,}}>
            <Text category="s1">Course Library</Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
                          <Text appearance="hint">Join Course</Text>
                        </TouchableOpacity>
            <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>

              <Card disabled={true}>
                <Text  style={{marginBottom: 20}}>Enter a class code</Text>
                <Input style={styles.inputs} label='Class' placeholder='class code' value={classCode} onChangeText={nextClassCode => setClassCode(nextClassCode)} />
                <Button onPress={() => setVisible(false)}>Join</Button>
              </Card>

            </Modal>
          </View>

          <Card style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('StudentCourse')}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10,}}/>
                <View style={{ flex: 1 }}>
                  <Text>Course Name</Text>
                  <Text appearance="hint">Description</Text>
                </View>
                <Text category="s2">Grade: A</Text>
              </View>
            </TouchableOpacity>
          </Card>

          

          <Card>
            <TouchableOpacity onPress={() => navigation.navigate('StudentCourse')}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10}}
              />
              <View style={{ flex: 1 }}>
                <Text>Course Name</Text>
                <Text appearance="hint">Description</Text>
              </View>
              <Text category="s2">Grade: A</Text>
            </View>
            </TouchableOpacity>
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
          <TouchableOpacity onPress={() => navigation.navigate('StudentCourse')}>
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
            </TouchableOpacity>
          </Card>

          <Card style={{ marginBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('StudentCourse')}>
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
            </TouchableOpacity>
          </Card>

        </View>
      </ScrollView>
    </Layout>
  );
}

export default () => (
  <Layout style={{ flex: 1 }}>
    <StudentHome />
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
