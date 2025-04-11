import * as React from "react";
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as eva from "@eva-design/eva";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import {
  ApplicationProvider,
  Button,
  Layout,
  Text,
  Card,
  Modal,
  Input,
} from "@ui-kitten/components";

function AndryStudentHome() {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [classCode, setClassCode] = React.useState('');
  const { user } = useAuth();
  const [courses, setCourses] = React.useState([]);
  const [upcomingClass, setUpcomingClass] = React.useState([]);
  const [pastDueClass, setPastDueClass] = React.useState([]);
  const [upcomingStudent, setUpcomingStudent] = React.useState([]);
  const [pastDueStudent, setPastDueStudent] = React.useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`https://elitecodecapstone24.onrender.com/student/courses?sid=${user.userID}`);
      const data = await res.json();
      setCourses(data.results || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      Alert.alert("Error", "Could not load your courses.");
    }
  };

  const fetchAssignments = async () => {
    try {
      const [upcomingRes, pastDueRes, upcomingStudentRes, pastDueStudentRes] = await Promise.all([
        fetch(`https://elitecodecapstone24.onrender.com/student/getUpcomingClass?sid=${user.userID}`),
        fetch(`https://elitecodecapstone24.onrender.com/student/getPastDueClass?sid=${user.userID}`),
        fetch(`https://elitecodecapstone24.onrender.com/student/getUpcomingStudent?sid=${user.userID}`),
        fetch(`https://elitecodecapstone24.onrender.com/student/getPastDueStudent?sid=${user.userID}`),
      ]);

      const upcomingClassData = await upcomingRes.json();
      const pastDueClassData = await pastDueRes.json();
      const upcomingStudentData = await upcomingStudentRes.json();
      const pastDueStudentData = await pastDueStudentRes.json();

      setUpcomingClass(upcomingClassData.results || []);
      setPastDueClass(pastDueClassData.results || []);
      setUpcomingStudent(upcomingStudentData.results || []);
      setPastDueStudent(pastDueStudentData.results || []);

    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      Alert.alert("Error", "Could not load your assignments.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user?.userID) {
        fetchCourses();
        fetchAssignments();
      }
    }, [user])
  );

  const handleJoinClass = async () => {
    if (!classCode.trim()) {
      Alert.alert("Error", "Please enter a class code.");
      return;
    }
    try {
      const response = await fetch('https://elitecodecapstone24.onrender.com/student/joinCourse', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cid: classCode.trim(),
          sid: user.userID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setClassCode('');
        await fetchCourses();
        Alert.alert("Success", data.message || "You joined the course!");

      } else {
        console.log("JOIN RESPONSE", data);
        Alert.alert("Error", JSON.stringify(data));
      }

    } catch (error) {
      console.error("Error joining course:", error);
      Alert.alert("Error", "Something went wrong.");
    }

  };

  return (
    <Layout style={{ flex: 2, padding: 20, backgroundColor: "#2C496B" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View >
          <Image
            source={require("../assets/images/FinalLogo2.png")}
            style={{
              width: 300,
              height: 150,
              marginTop: -10,
              marginBottom: -25,
              alignSelf: 'center',
              resizeMode: 'cover',
            }}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, }}>
            <Text category="s1">Course Library</Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text appearance="hint">Join Course</Text>
            </TouchableOpacity>

            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}
            >
              <Card
                disabled={true}
                style={{
                  width: 220,
                  alignSelf: 'center',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                <Text category="s1" style={{ textAlign: 'center', marginBottom: 15 }}>
                  Join Course
                </Text>
                <Input style={{ marginBottom: 10 }} label='Course Code:' placeholder='' value={classCode} onChangeText={nextClassCode => setClassCode(nextClassCode)} />
                <Button onPress={() => { setVisible(false); handleJoinClass(); }}>
                  Join
                </Button>
              </Card>
            </Modal>

          </View>

          {courses.map(course => (
            <Card key={course.cid} style={{ borderRadius: 10, marginBottom: 10, backgroundColor: '#1E2A38' }}>
              <TouchableOpacity onPress={() => navigation.navigate('StudentCourse', { cid: course.cid })}>
                <Text category="h6" style={{ fontSize: 14, marginBottom: 3, marginTop: -6, color: 'white' }}>
                  {course.courseName}
                </Text>
                <Text appearance="hint" numberOfLines={1} ellipsizeMode="tail" style={{ marginBottom: 3, color: '#A9B7C6' }}>
                  {course.description}
                </Text>
                <Text category="c1" style={{ color: '#6C8AA6', marginBottom: -4 }}>
                  Code: {course.cid}
                </Text>
              </TouchableOpacity>
            </Card>
          ))}


          <Text category="s1" style={{ marginVertical: 10 }}>Upcoming Questions</Text>
          {upcomingClass.map(item => (
            <Card key={item.qid} style={{ borderRadius: 10, marginBottom: 10 }}>
              <Text>{item.question}</Text>
              <Text appearance="hint">Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
            </Card>
          ))}
          {upcomingStudent.map(item => (
            <Card key={item.qid} style={{ borderRadius: 10, marginBottom: 10 }}>
              <Text>{item.question}</Text>
              <Text appearance="hint">Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
            </Card>
          ))}

          <Text category="s1" style={{ marginVertical: 10 }}>Past Due Questions</Text>
          {pastDueClass.map(item => (
            <Card key={item.qid} style={{ borderRadius: 10, marginBottom: 10 }}>
              <Text>{item.question}</Text>
              <Text appearance="hint">Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
            </Card>
          ))}
          {pastDueStudent.map(item => (
            <Card key={item.qid} style={{ borderRadius: 10, marginBottom: 10 }}>
              <Text>{item.question}</Text>
              <Text appearance="hint">Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
            </Card>
          ))}


        </View>


      </ScrollView>
    </Layout>
  );
}

function AppWrapper(props = {}) {
  return (
    <Layout style={{ flex: 1 }}>
      <AndryStudentHome />
    </Layout>
  );
}

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
