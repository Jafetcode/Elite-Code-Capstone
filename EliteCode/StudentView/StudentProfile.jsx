import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Button,
  Text,
  Icon,
  Card,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

function StudentProfile() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);

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
      setSkills(data.results || []);
      console.log(skills);
      console.log(user.userID);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      Alert.alert("Error", "Could not load your skills.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user?.userID) {
        fetchSkills();
      }
    }, [user.userID])
  );

  return (
    <Layout style={styles.containerMain}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Card style={styles.cardContainer}>
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
            {'Edit Profile'}
          </Button>
        </Card>

        {/* Skills Section */}
        <Text style={styles.sectionHeader}>Skills</Text>
        <Layout style={styles.languageContainer}>
          {skills.length > 0 ? (
            skills.map((item) => (
              <Button key={item.skill} size="tiny" style={styles.langButton}>
                {item.skill}
              </Button>
            ))
          ) : (
            <Text appearance="hint">No skills added</Text>
          )}
        </Layout>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerLine1}>Stay curious. Stay coding.</Text>
        <Text style={styles.footerLine2}>
          EliteCode © 2025 — Red Panda Studios
        </Text>
      </View>
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
    padding: 40,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  cardContainer: {
    alignItems: "center",
    backgroundColor: "#1E2A38",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    marginTop: 50,
    borderColor: "#334154",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: -5,
    marginLeft: 40,
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
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3A4B5C",
    borderRadius: 10,
    width: "60%",
    alignSelf: "center",
    paddingLeft: 0,
  },
  sectionHeader: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  languageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#526F8C",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  langButton: {
    margin: 5,
    backgroundColor: "#3A4B5C",
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerLine1: {
    color: "#A9B7C6",
    fontSize: 12,
  },
  footerLine2: {
    color: "#A9B7C6",
    fontSize: 12,
    opacity: 0.7,
  },
});
