import * as React from "react";
import {useState, useEffect} from 'react';
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

function ErikaStudentHome() {
  const navigation = useNavigation();
  // const { user } = useAuth();
  const questionID = "3";
  const userID = "53471f"
  const [question, setQuestion] = useState({});
  const fetchSubmission = async () => {
    try {
      const res = await fetch(`https://elitecodecapstone24.onrender.com/student/submission?qid=${questionID}&sid=${userID}`);
      const data = await res.json();
      console.log("response: ", data);
      setQuestion(data[0]);
    } catch (error) {
      Alert.alert("Error", "Could not load your submission.", error.message);
    }
  };

  useEffect(() => {
    if (userID && questionID) {
      fetchSubmission();
    }
  }, [userID, questionID]);

  return (
    <Layout style={{ flex: 1, padding: 22}}>
      <Text category='h4' style={styles.heading}>Review Submission </Text>
      <Text category='s1' appearance='hint' style={styles.subHeading}>
      comment maybe
      </Text>
      <View>
        <Text style={{fontWeight: 'bold', paddingBottom: 10}}>
          {question.question}
        </Text>
        <Text>
          {question.description}
        </Text>
        <Text>
          {question.comment}
        </Text>
        <Text>
          Your answer
        </Text>
        <Text>
          {question.answer}
        </Text>
        <Text>
          Your grade
        </Text>
        <Text>
          {question.grade} / {question.pointVal} - {parseFloat(question.grade/question.pointVal*100).toFixed(2)}%
        </Text>
        {/* <Text>
          ${question.imgFile}
        </Text> */}
      </View>
    </Layout>
  );
}

function AppWrapper(props = {}) {
  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <ErikaStudentHome />
    </Layout>
  );
}

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  heading: { marginBottom: 15,  paddingTop: 16},
  subHeading: { marginBottom: 15 }

});
