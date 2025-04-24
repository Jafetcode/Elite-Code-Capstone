

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
  const [grade, setGrade] = React.useState("");

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

  const fetchGrade = async () => {
    try {
      const res = await fetch(
        `https://elitecodecapstone24.onrender.com/student/getGrade?sid=${user.userID}&cid=${cid}`
      );
      const text = await res.text();
      if (!res.ok) {
        console.error("Grade fetch failed:", res.status, text);
        setGrade("N/A");
        return;
      }
  
      const data = JSON.parse(text);
      const {
        total_possible = 0,
        total_scored = 0,
        score_ratio = 0,
      } = data.results || {};
  
      const pct = total_possible > 0
        ? (score_ratio * 100).toFixed(2)
        : "0.00";
  
      setGrade(`${pct}% (${total_scored}/${total_possible})`);
    } catch (error) {
      console.error("Failed to fetch Grade", error);
      setGrade("N/A");
    }
  };
  
  
  

  useFocusEffect(
    React.useCallback(() => {
      fetchAssignments();
      fetchGrade();
    }, [user, cid])
  );

  const renderAssignmentCard = (question) => (
    <Card key={question.qid} style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SubmitQuestion", {
            qid: question.qid,
              opt1: question.opt1,
              opt2: question.opt2,
              opt3: question.opt3,
            cid: cid,
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
                      style={{
                        width: 300,
                        height: 150,
                        marginTop: -10,
                        marginBottom: -25,
                        alignSelf: "center",
                        resizeMode: "cover",
                      }}
                    />

          <Text category="h6" style={styles.courseTitle}>
            {courseName}
          </Text>
          <Text appearance="hint" style={styles.courseCode}>
            Course ID: {cid}
          </Text>
          <Text appearance="hint" style={styles.courseCode}>
            Grade: {grade}
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
    backgroundColor: "#2C496B",
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 70,
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 150,
    alignSelf: "center",
    resizeMode: "cover",
    marginBottom: -10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  courseCode: {
    fontSize: 14,
    color: "#A9B7C6",
    textAlign: "center",
    marginBottom: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 12,
  },
  assignmentBlock: {
    width: "100%",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#1E2A38",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTopic: {
    fontSize: 14,
    color: "white",
    flex: 1,
    marginRight: 8,
  },
  cardQuestion: {
    color: "#A9B7C6",
    fontSize: 14,
    marginVertical: 6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  badgeType: {
    backgroundColor: "#3A4B5C",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeStatus: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});


