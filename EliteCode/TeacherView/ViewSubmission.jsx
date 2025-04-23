import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Text, Alert } from "react-native";
import { Layout, Button, Card, Input } from "@ui-kitten/components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

function ViewSubmission() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const student = route.params?.s;
  const question = route.params?.q;
  const [submission, setSubmission] = useState({});

  console.log("grade", submission.grade)
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        console.log("getting submission", "question: ", question.qid, "studnet:", student.userID)
        const res = await fetch(`https://elitecodecapstone24.onrender.com/student/submission?qid=${question.qid}&sid=${student.userID}`);
        const data = await res.json();
        console.log("getting submission", data[0].question)
        setSubmission(data[0]);
      } catch (error) {
        Alert.alert("Error", "Could not load your submission.", error);
      }
    };
    fetchSubmission();
  }, [question, student]);

  //   useEffect(() => {
  //     if (student && question) {
  //       responseData();
  //     }
  //   }, [userID, questionID]);

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
            {question.grade ? (
              <View style={styles.scoreSection}>
                <Text style={styles.scoreText}>
                  Score: <Text style={styles.scoreValue}>{question.grade}/{question.pointVal}</Text>
                </Text>
                <Text style={styles.percentageText}>
                  {/* {calcPercent(question.grade, question.pointVal)}% */}
                  {parseFloat(question.grade / question.pointVal * 100).toFixed(2)}%
                </Text></View>
            ) : (<View style={styles.scoreSection}> <Text style={styles.scoreValue}> Waiting Grade </Text> </View>)}
            <Text style={styles.dateText}>
              Submitted: {formatDate(submission.submitted_on)}
            </Text>
          </View>

          {/* Question section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Question</Text>
            <Text style={styles.questionText}>{submission.question}</Text>

            {submission.imgFile && (
              <View style={styles.imageContainer}>
                {/* <Image
                  source={{ uri: submission.imgFile }}
                  style={styles.image}
                  resizeMode="cover"
                /> */}
              </View>
            )}
          </View>

          {/* Student's Response section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Students Response</Text>
            <Text style={styles.responseText}>{submission.answer}</Text>
          </View>

          {/* Teacher's Comments section */}
          {submission.comment && (
            <View style={[styles.section, styles.commentsSection]}>
              <Text style={styles.sectionTitle}>Teacher's Comments</Text>
              <Text style={styles.commentsText}>{submission.comment}</Text>
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
    backgroundColor: "#222B45"
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


export default ViewSubmission;