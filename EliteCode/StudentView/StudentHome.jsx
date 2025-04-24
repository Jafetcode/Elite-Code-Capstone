import * as React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
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
  Icon,
} from "@ui-kitten/components";

function StudentHome() {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [classCode, setClassCode] = React.useState("");
  const { user } = useAuth();
  const [courses, setCourses] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [pastDue, setPastDue] = React.useState([]);
  const [upcomingStudent, setUpcomingStudent] = React.useState([]);
  const [pastDueStudent, setPastDueStudent] = React.useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(
        `https://elitecodecapstone24.onrender.com/student/getCourses?sid=${user.userID}`
      );
      const data = await res.json();
      setCourses(data.results || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      Alert.alert("Error", "Could not load your courses.");
    }
  };

  const fetchAssignments = async () => {
    try {
      const [upcomingRes, pastDueRes] = await Promise.all([
        fetch(
          `https://elitecodecapstone24.onrender.com/student/getAllUpcomingQuestions?sid=${user.userID}`
        ),
        fetch(
          `https://elitecodecapstone24.onrender.com/student/getAllPastDueQuestions?sid=${user.userID}`
        ),
      ]);

      const upcomingData = await upcomingRes.json();
      const pastDueData = await pastDueRes.json();

      const process = (arr = []) =>
        (arr.map((item) => ({ ...item })) || []).slice(0, 50);

      setUpcoming(process(upcomingData.results?.upcomingClass));
      setPastDue(process(pastDueData.results?.pastDueClass));
      setUpcomingStudent(process(upcomingData.results?.upcomingStudent));
      setPastDueStudent(process(pastDueData.results?.pastDueStudent));
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      Alert.alert("Error", "Could not load your assignments.");
    }
  };

  const handleJoinClass = async () => {
    if (!classCode.trim()) {
      Alert.alert("Error", "Please enter a class code.");
      return;
    }
    try {
      const response = await fetch(
        "https://elitecodecapstone24.onrender.com/student/joinCourse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cid: classCode.trim(),
            sid: user.userID,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setClassCode("");
        Alert.alert("Success", data.message || "You joined the course!");
      } else {
        Alert.alert("Error", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error joining course:", error);
      Alert.alert("Error", "Something went wrong.");
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

  const renderAssignmentCard = (item, status) => (
    <Card
      key={item.qid}
      style={{ borderRadius: 10, marginBottom: 10, backgroundColor: "#1E2A38" }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SubmitQuestion", {
            qid: item.qid,
            cid: item.cid,
            item,
            type: item.type,
          })
        }
      >
        <View style={styles.cardHeader}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.questionText}
          >
            {item.question}
          </Text>
          <View style={styles.typeBadge}>
            <Text style={styles.badgeText}>{item.type}</Text>
          </View>
        </View>

        <View
          style={[
            styles.cardHeader,
            { justifyContent: "space-between", marginTop: 6 },
          ]}
        >
          <Text appearance="hint" style={{ fontSize: 14 }}>
            Due: {new Date(item.dueDate).toLocaleDateString()}
          </Text>
          <View
            style={[
              styles.statusBadge,
              status === "Upcoming"
                ? styles.upcomingBadge
                : styles.pastDueBadge,
            ]}
          >
            <Text style={styles.badgeText}>{status}</Text>
          </View>
        </View>

        {/* Submission / Waiting */}
        {item.hasSubmitted || status === "Past Due" ? (
          <View style={styles.waitingContainer}>
            <Button
            style={styles.submissionButton}
            onPress={() => {
              const dest =
                item.type === "ShortAns"
                  ? "ErikaStudentHome"
                  : "MCQStudentSubmission";
              navigation.navigate(dest, {
                q: item,
                sid: user.userID,
              });
            }}
          >
            View submission
          </Button>
          </View>
        ) : (
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>
              {status === "Past Due"
                ? "Never Responded."
                : "Waiting for submission"}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Card>
  );

  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          <Image
            source={require("../assets/images/FinalLogo2.png")}
            style={{
              width: 300,
              height: 150,
              marginTop: -10,
              marginBottom: -25,
              alignSelf: "center",
              resizeMode: "cover",
            }}
          />

          {/* Course Library header */}
          <View style={styles.sectionHeaderRow}>
            <Text category="s1" style={styles.sectionTitle}>
              Course Library
            </Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text appearance="hint">Join Course</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
              <Card disabled={true} style={{

                width: 240,
                alignSelf: 'center',
                borderRadius: 10,
                backgroundColor: '#1E2A38',
                borderColor: '#334154',
              }}>
                <Text category="s1" style={{ fontSize: 16, textAlign: 'center', color: 'white', fontWeight: '600' }}>
                  Join Course
                </Text>
                <Image source={require("../assets/images/joinIcon.png")} style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 2,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }} />
                <Input
                  size="small"
                  style={{ marginBottom: 8, backgroundColor: '#253243', borderRadius: 8 }}
                  textStyle={{ fontSize: 14, color: 'white' }}
                  placeholder='Course Code'
                  value={classCode}
                  maxLength={6}
                  onChangeText={nextClassCode => setClassCode(nextClassCode)}
                />
                <Button
                  size="small"
                  style={{ borderRadius: 10, backgroundColor: '#3A4B5C', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 0 }}
                  onPress={() => {
                    setVisible(false);
                    handleJoinClass();
                  }}
                >
                  {({ style }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontWeight: '600', marginRight: 6 }}>Join</Text>
                      <Icon name="flag" fill="white" style={{ width: 14, height: 14 }} />
                    </View>
                  )}
                </Button>
              </Card>
            </Modal>

          {/* Courses list */}
          {courses.map((course) => (
            <Card
              key={course.cid}
              style={{
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: "#1E2A38",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("StudentCourse", {
                    cid: course.cid,
                    courseName: course.courseName,
                  })
                }
              >
                <Text
                  category="h6"
                  style={{
                    fontSize: 14,
                    marginBottom: 3,
                    marginTop: -6,
                    color: "white",
                  }}
                >
                  {course.courseName}
                </Text>
                <Text
                  appearance="hint"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ marginBottom: 3, color: "#A9B7C6" }}
                >
                  {course.description}
                </Text>
                <Text
                  category="c1"
                  style={{ color: "#6C8AA6", marginBottom: -4 }}
                >
                  Code: {course.cid}
                </Text>
              </TouchableOpacity>
            </Card>
          ))}

          {/* Class Assignments */}
          <View style={{ marginTop: 20 }}>
            <Text category="s1" style={styles.sectionTitle}>
              Class Assignments
            </Text>
            <View style={styles.assignmentBlock}>
              {upcoming.length === 0 ? (
                <Text appearance="hint">No upcoming questions!</Text>
              ) : (
                upcoming.map((item) => renderAssignmentCard(item, "Upcoming"))
              )}
            </View>
            <View style={styles.assignmentBlock}>
              {pastDue.length === 0 ? (
                <Text appearance="hint">No past due questions!</Text>
              ) : (
                pastDue.map((item) => renderAssignmentCard(item, "Past Due"))
              )}
            </View>
          </View>

          {/* Personal Assignments */}
          <View>
            <Text category="s1" style={styles.sectionTitle}>
              Personal Assignments
            </Text>
            <View style={styles.assignmentBlock}>
              {upcomingStudent.length === 0 ? (
                <Text appearance="hint">No upcoming questions!</Text>
              ) : (
                upcomingStudent.map((item) =>
                  renderAssignmentCard(item, "Upcoming")
                )
              )}
            </View>
            <View style={styles.assignmentBlock}>
              {pastDueStudent.length === 0 ? (
                <Text appearance="hint">No past due questions!</Text>
              ) : (
                pastDueStudent.map((item) =>
                  renderAssignmentCard(item, "Past Due")
                )
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

function AppWrapper() {
  return (
    <Layout style={{ flex: 1 }}>
      <StudentHome />
    </Layout>
  );
}

export default AppWrapper;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 10,
  },
  assignmentBlock: {
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  questionText: {
    flex: 1,
    marginRight: 8,
    fontSize: 14,
    color: "white",
  },
  typeBadge: {
    backgroundColor: "#3A4B5C",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  upcomingBadge: {
    backgroundColor: "#D87D4A",
  },
  pastDueBadge: {
    backgroundColor: "#A94B4B",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  waitingContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  waitingText: {
    color: "#A9B7C6",
    fontSize: 14,
  },
  submissionButton: {
    backgroundColor: "#3A4B5C",
    borderRadius: 10,
    width: 320,
    height: 40,
  },

});
