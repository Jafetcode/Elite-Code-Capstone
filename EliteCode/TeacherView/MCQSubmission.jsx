import React, { useState, useEffect}  from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const MCQSubmission = () => {
  const route = useRoute();
  const { q, s } = route.params;
  const [submissionInfo, setInfo] = useState({});
  console.log(q.pointVal, s.fname)
 
  // Query from submission and MCQ TABLE query from 
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        console.log("getting submission", "question: ", q.qid, "studnet:", s.userID)
        const res = await fetch(`https://elitecodecapstone24.onrender.com/student/MCQsubmission?qid=${q.qid}&sid=${s.userID}`);
        const data = await res.json();
        console.log("getting submission", data[0].opt1)
        setInfo(data[0]);
      } catch (error) {
        Alert.alert("Error", "Could not load your submission.", error);
      }
    };
    fetchSubmission();
  }, [q.qid, s.sid]);
  console.log("sub info", submissionInfo)
  const questionData = {
    question: q.question,
    imageUrl: "/api/placeholder/400/200", // Optional image
    options: [
      { id: "A", text: submissionInfo.opt1, isCorrect: (submissionInfo.opt1 == submissionInfo.correctAns), studentSelected: (submissionInfo.correctAns == q.opt1 && q.answer) },
      { id: "B", text: submissionInfo.opt2, isCorrect: (submissionInfo.opt2 == submissionInfo.correctAns), studentSelected: (submissionInfo.correctAns == q.opt2 && q.answer) },
      { id: "C", text: submissionInfo.opt3, isCorrect: (submissionInfo.opt3 == submissionInfo.correctAns), studentSelected: (submissionInfo.correctAns == q.opt3 && q.answer) },
      // { id: "D", text: "Blue", isCorrect: false, studentSelected: false }
    ],
    explanation: submissionInfo.comment,
    submittedAt: submissionInfo.submitted_on,
    score: {
      points: submissionInfo.grade,
      total: q.pointVal,
    }
  };

  // Format date and time for display
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
                Score: <Text style={styles.scoreValue}>{questionData.score.points}/{questionData.score.total}</Text>
              </Text>
              <Text style={[styles.percentageText,
              questionData.score.percentage === 100 ? styles.correctScore :
                questionData.score.percentage === 0 ? styles.incorrectScore :
                  styles.partialScore]}>
                {questionData.score.percentage}%
              </Text>
            </View>
            <Text style={styles.dateText}>
              Submitted: {formatDate(questionData.submittedAt)}
            </Text>
          </View>

          {/* Question section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Question</Text>
            <Text style={styles.questionText}>{questionData.question}</Text>
          </View>

          {/* Options section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Options</Text>
            {questionData.options.map((option) => (
              <View
                key={option.id}
                style={[
                  styles.optionContainer,
                  option.isCorrect ? styles.correctOption : null,
                  option.studentSelected && !option.isCorrect ? styles.incorrectOption : null
                ]}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionId}>{option.id}</Text>
                  <Text style={[
                    styles.optionText,
                    option.isCorrect ? styles.correctOptionText : null
                  ]}>
                    {option.text}
                  </Text>
                </View>

                <View style={styles.indicatorContainer}>
                  {option.isCorrect && (
                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                  )}
                  {option.studentSelected && !option.isCorrect && (
                    <MaterialIcons name="cancel" size={24} color="#F44336" />
                  )}
                  {option.studentSelected && option.isCorrect && (
                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Explanation section */}
          {questionData.explanation ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comments</Text>
            <Text style={styles.explanationText}>{questionData.explanation}</Text>
          </View>) : (<View style={styles.section}>
            <Text style={styles.sectionTitle}>No comments</Text>
          </View>) }
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
  },
  correctScore: {
    color: '#4CAF50',
  },
  incorrectScore: {
    color: '#F44336',
  },
  partialScore: {
    color: '#FF9800',
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
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  correctOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: '#F44336',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionId: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
    color: '#666',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  correctOptionText: {
    fontWeight: '500',
    color: '#4CAF50',
  },
  indicatorContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default MCQSubmission;