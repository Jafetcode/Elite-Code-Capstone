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

      setUpcomingClass(upcomingData.results || []);
      setPastDueClass(pastDueData.results || []);
      setUpcomingStudent(upcomingDataStudent.results || []);
      setPastDueStudent(pastDueDataStudent.results || []);

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
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, }}>
            <Text category="s1">Course Library</Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text appearance="hint">Join Course</Text>
            </TouchableOpacity>
            <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>

              <Card disabled={true}>
                <Text style={{ marginBottom: 20 }}>Enter a class code</Text>
                <Input style={styles.inputs} label='Class' placeholder='class code' value={classCode} onChangeText={nextClassCode => setClassCode(nextClassCode)} />
                <Button onPress={() => { setVisible(false); handleJoinClass(); }}>Join</Button>
              </Card>

            </Modal>
          </View>

          {courses.map(course => (
            <Card key={course.cid} style={{ borderRadius: 10, marginBottom: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate('StudentCourse', { cid: course.cid })}>
                <Text>{course.courseName}</Text>
                <Text appearance="hint">{course.description}</Text>
                <Text category="s2">Course Code: {course.cid}</Text>
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
