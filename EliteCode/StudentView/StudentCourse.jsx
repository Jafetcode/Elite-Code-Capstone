// [StudentCourse.js]

import * as React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Card
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

function StudentCourse() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cid, courseName } = route.params;
  const { user } = useAuth();

  const [allAssignments, setAllAssignments] = React.useState([]);

  const fetchAssignments = async () => {
    try {
      const [upcomingRes, pastDueRes] = await Promise.all([
        fetch(`https://elitecodecapstone24.onrender.com/student/getUpcomingCourseQuestions?sid=${user.userID}&cid=${cid}`),
        fetch(`https://elitecodecapstone24.onrender.com/student/getPastDueCourseQuestions?sid=${user.userID}&cid=${cid}`)
      ]);

      const upcomingData = await upcomingRes.json();
      const pastDueData = await pastDueRes.json();

      const upcoming = (upcomingData.results.upcomingClass || []).map(q => ({ ...q, status: "Upcoming" }));
      const pastDue = (pastDueData.results.pastDueClass || []).map(q => ({ ...q, status: "Past Due" }));

      const merged = [...upcoming, ...pastDue].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );

      setAllAssignments(merged);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      Alert.alert("Error", "Could not load assignments.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAssignments();
    }, [user, cid])
  );

  const renderAssignmentCard = (question) => (
    <Card key={question.qid} style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SubmitQuestion", {
            qid: question.qid,
            mcq: {
              opt1: question.opt1,
              opt2: question.opt2,
              opt3: question.opt3
            },
            cid: question.cid,
            type: question.type
          })
        }
      >
        <View style={styles.cardHeader}>
          <Text numberOfLines={1} style={styles.cardTopic}>
            {question.topic}
          </Text>
          <View style={styles.badgeType}>
            <Text style={styles.badgeText}>{question.type}</Text>
          </View>
        </View>

        <Text numberOfLines={2} appearance="hint" style={styles.cardQuestion}>
          {question.question}
        </Text>

        <View style={styles.cardFooter}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text appearance="hint">Due: {new Date(question.dueDate).toLocaleDateString()}</Text>
            <Text appearance="hint">Points: {question.pointVal}</Text>
          </View>
          <View
            style={[
              styles.badgeStatus,
              { backgroundColor: question.status === "Upcoming" ? "#D87D4A" : "#A94B4B" }
            ]}
          >
            <Text style={styles.badgeText}>{question.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image
            source={require("../assets/images/FinalLogo2.png")}
            style={styles.logo}
          />

          <Text category="h6" style={styles.courseTitle}>
            {courseName}
          </Text>
          <Text appearance="hint" style={styles.courseCode}>
            Course ID: {cid}
          </Text>

          <Text category="s1" style={styles.sectionHeader}>Class Assignments</Text>
          <View style={styles.assignmentBlock}>
            {allAssignments.length === 0 ? (
              <Text appearance="hint">No questions found for this course.</Text>
            ) : (
              allAssignments.map(q => renderAssignmentCard(q))
            )}
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </Layout>
  );
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <StudentCourse />
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2C496B"
  },
  content: {
    marginTop: 40
  },
  logo: {
    width: 300,
    height: 150,
    alignSelf: "center",
    resizeMode: "cover",
    marginBottom: -10
  },
  courseTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10
  },
  courseCode: {
    textAlign: "center",
    marginBottom: 20
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  assignmentBlock: {
    marginBottom: 15
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#1E2A38"
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTopic: {
    fontSize: 14,
    color: "white"
  },
  cardQuestion: {
    marginVertical: 4,
    color: "#A9B7C6"
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badgeType: {
    backgroundColor: "#3A4B5C",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  badgeStatus: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  badgeText: {
    color: "white",
    fontSize: 12
  }
});
