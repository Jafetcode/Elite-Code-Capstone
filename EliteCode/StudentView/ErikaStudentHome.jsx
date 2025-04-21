import * as React from "react";
import { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Text, Alert } from "react-native";
import * as eva from "@eva-design/eva";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import { ApplicationProvider, Button, Layout, Card, Modal, Input, } from "@ui-kitten/components";

// function ErikaStudentHome() {



const ErikaStudentHome = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const questionID = "74";
  const userID = "63887e"
  const [question, setQuestion] = useState({});
  const responseData = async () => {
    try {
      const res = await fetch(`https://elitecodecapstone24.onrender.com/student/submission?qid=${questionID}&sid=${userID}`);
      const data = await res.json();
      setQuestion(data[0]);
    } catch (error) {
      Alert.alert("Error", "Could not load your submission.", error);
    }
  };

  useEffect(() => {
    if (userID && questionID) {
      responseData();
    }
  }, [userID, questionID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Header with score information */}
          <View style={styles.headerContainer}>
            <View style={styles.scoreSection}>
              <Text style={styles.scoreText}>
                Score: <Text style={styles.scoreValue}>{question.grade}/{question.pointVal}</Text>
              </Text>
              <Text style={styles.percentageText}>
                {/* {calcPercent(question.grade, question.pointVal)}% */}
                {parseFloat(question.grade/question.pointVal*100).toFixed(2)}%
              </Text>
            </View>
            <Text style={styles.dateText}>
              Submitted: {formatDate(question.submitted_on)}
            </Text>
          </View>

          {/* Question section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Question</Text>
            <Text style={styles.questionText}>{question.question}</Text>

            {question.imgFile && (
              <View style={styles.imageContainer}>
                {/* <Image
                  source={{ uri: question.imgFile }}
                  style={styles.image}
                  resizeMode="cover"
                /> */}
              </View>
            )}
          </View>

          {/* Student's Response section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Response</Text>
            <Text style={styles.responseText}>{question.answer}</Text>
          </View>

          {/* Teacher's Comments section */}
          {question.comment && (
            <View style={[styles.section, styles.commentsSection]}>
              <Text style={styles.sectionTitle}>Teacher's Comments</Text>
              <Text style={styles.commentsText}>{question.comment}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 16,
    color: '#333',
  },
  scoreValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D02C32',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  commentsSection: {
    borderLeftWidth: 4,
    borderLeftColor: '#D02C32',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  commentsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontStyle: 'italic',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});



function AppWrapper(props = {}) {
  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <ErikaStudentHome />
    </Layout>
  );
}

export default AppWrapper;

// const styles = StyleSheet.create({
//   container: {
//     minHeight: 192,
//   },
//   heading: { marginBottom: 15,  paddingTop: 16},
//   subHeading: { marginBottom: 15 }

// });
