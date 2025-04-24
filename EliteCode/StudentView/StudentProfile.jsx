import * as React from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Button,
  Text,
  Icon,
  Card,
  Divider,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

function StudentProfile() {
  const navigation = useNavigation();
  const { user } = useAuth();

  if (!user) {
    Alert.alert("Unauthorized", "You need to log in first.", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);
    return null;
  }

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
                      style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10, marginTop: -5, marginLeft: 40 }}
                    />
          <Text style={styles.welcome}>
            {user.fname} {user.lname}
          </Text>
          <Text style={styles.tagline}>{user.role}</Text>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >{'Edit Profile'}</Button>
        </Card>

        {/* Languages Section */}
        <Text style={styles.sectionHeader}>Languages</Text>
        <Layout style={styles.languageContainer}>
          {["Java", "Python", "C", "Swift", "SQL"].map((lang) => (
            <Button key={lang} size="tiny" style={styles.langButton}>
              {lang}
            </Button>
          ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "white",
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  welcome: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  tagline: {
    color: "#A9B7C6",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  divider: {
    backgroundColor: "#334154",
    width: "80%",
    marginVertical: 15,
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
  cardSmall: {
    backgroundColor: "#1E2A38",
    borderRadius: 10,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  courseImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  courseName: {
    color: "white",
    fontSize: 14,
    marginBottom: 2,
  },
  courseDesc: {
    color: "#A9B7C6",
    fontSize: 12,
  },
  courseGrade: {
    color: "white",
    fontSize: 12,
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
