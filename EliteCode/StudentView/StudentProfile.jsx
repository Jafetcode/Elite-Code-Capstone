import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Button,
  Text,
  Card,
  Modal,
  Input,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

function StudentProfile() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [gradebook, setGradebook] = useState([]);

  if (!user) {
    Alert.alert("Unauthorized", "You need to log in first.", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);
    return null;
  }

  const fetchSkills = async () => {
    try {
      const res = await fetch(
        `https://elitecodecapstone24.onrender.com/student/getSkills?sid=${user.userID}`
      );
      const data = await res.json();
      setSkills(data.map((item) => item.skill));
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      Alert.alert("Error", "Could not load your skills.");
    }
  };

  const fetchGradebook = async () => {
    try {
      const res = await fetch(
        `https://elitecodecapstone24.onrender.com/student/getStudentGradebook?sid=${user.userID}`
      );
      const data = await res.json();
      setGradebook(data.results || []);
    } catch (error) {
      console.error("Failed to fetch gradebook:", error);
      Alert.alert("Error", "Could not load your grades.");
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      Alert.alert("Error", "Please enter a skill.");
      return;
    }
    try {
      const res = await fetch(
        "https://elitecodecapstone24.onrender.com/student/addSkill",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sid: user.userID,
            skill: newSkill.trim(),
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", data.message || "Skill added!");
        setNewSkill("");
        fetchSkills();
      } else {
        Alert.alert("Error", data.error || JSON.stringify(data));
      }
    } catch (err) {
      console.error("Failed to add skill:", err);
      Alert.alert("Error", "Could not add skill.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user.userID) {
        fetchSkills();
        fetchGradebook();
      }
    }, [user.userID])
  );

  return (
    <Layout style={styles.containerMain}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Layout style={{ backgroundColor: "transparent" }}>
          <Image
            source={require("../assets/images/profile-picture.png")}
            style={styles.profileImage}
          />
          <Text style={styles.welcome}>
            {user.fname} {user.lname}
          </Text>
          <Text style={styles.tagline}>{user.role}</Text>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >
            Edit Profile
          </Button>
        </Layout>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>Skills</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text appearance="hint">Add Skill</Text>
          </TouchableOpacity>
        </View>

        <Layout style={styles.languageContainer}>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <Button key={skill} size="tiny" style={styles.langButton}>
                {skill}
              </Button>
            ))
          ) : (
            <Text appearance="hint">No skills added</Text>
          )}
        </Layout>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionHeader}>Your Courses & Grades</Text>
          {gradebook.length > 0 ? (
            gradebook.map((course) => (
              <Card key={course.cid} style={styles.gradeCard}>
                <View style={styles.cardHeader}>
                  <Text numberOfLines={1} style={styles.questionText}>
                    {course.courseName}
                  </Text>
                  <View style={styles.typeBadge}>
                    <Text style={styles.badgeText}>{course.cid}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.cardHeader,
                    { justifyContent: "space-between", marginTop: 6 },
                  ]}
                >
                  <Text appearance="hint" style={{ fontSize: 14 }}>
                    Total Score: {course.total_scored}/{course.total_possible}
                  </Text>
                  <View style={[styles.statusBadge, styles.gradeBadge]}>
                    <Text style={styles.badgeText}>
                      {((course.score_ratio || 0) * 100).toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <Text appearance="hint">No grades available yet.</Text>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled style={styles.modalCard}>
          <Text category="s1" style={styles.modalTitle}>
            Add New Skill
          </Text>
          <Input
            placeholder="Skill name"
            value={newSkill}
            onChangeText={setNewSkill}
            style={styles.modalInput}
          />
          <Button
            style={styles.modalButton}
            onPress={() => {
              handleAddSkill();
              setVisible(false);
            }}
          >
            Add
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <StudentProfile />
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#2C496B",
    padding: 17,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 55,
    marginLeft: 142,
  },
  welcome: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  tagline: {
    color: "#A9B7C6",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3A4B5C",
    borderRadius: 10,
    width: "60%",
    alignSelf: "center",
    paddingLeft: 0,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  sectionHeader: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  languageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#526F8C",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-evenly",
  },
  langButton: {
    margin: 6,
    width: 80,
    backgroundColor: "#3A4B5C",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    width: 240,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#1E2A38",
    borderColor: "#334154",
    padding: 20,
  },
  modalTitle: {
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  modalInput: {
    marginBottom: 15,
    backgroundColor: "#253243",
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: "#3A4B5C",
    borderRadius: 8,
  },
  gradeCard: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#1E2A38",
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
    fontWeight: "600",
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
  gradeBadge: {
    backgroundColor: "#4CAF50",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});
