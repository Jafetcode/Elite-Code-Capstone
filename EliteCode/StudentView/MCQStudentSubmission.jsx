import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const MCQStudentSubmission = () => {
  const route = useRoute();
  const { q, sid } = route.params; // what i am sendning in
  const [submission, setSub] = useState({});

  console.log(q.opt1)
  console.log("coorectAns: ", submission.correctAns)
  console.log("pointVal", q.pointVal)
  console.log("grade", submission.grade)
  console.log("opt2", JSON.stringify(q.opt2))
  console.log("answer", JSON.stringify(submission.answer))
  console.log("x", q.opt2 === submission.answer)

  useEffect(() => {
    console.log("fetching submission for :", q.qid, sid)
    const fetchSubmission = async () => {
      try {
        console.log("getting submission", "question: ", q.qid, "studnet:", sid)
        const res = await fetch(`https://elitecodecapstone24.onrender.com/student/MCQsubmission?qid=${q.qid}&sid=${sid}`);
        const data = await res.json();
        console.log("getting submissionnnn", data[0])
        setSub(data[0]);
      } catch (error) {
        console.log("error", error)
        Alert.alert("Error", "Could not load your submission.", error);
      }
    };
    fetchSubmission();
  }, [q.qid, sid]);

  const questionData = {
    question: q.question,
    imageUrl: "/api/placeholder/400/200",
    options: [
      { id: "A", text: q.opt1, isCorrect: (q.opt1 == submission.correctAns), studentSelected: (q.opt1 == submission.answer) },
      { id: "B", text: q.opt2, isCorrect: (q.opt2 == submission.correctAns), studentSelected: (q.opt2 == submission.answer) },
      { id: "C", text: q.opt3, isCorrect: (q.opt3 == submission.correctAns), studentSelected: (q.opt3 == submission.answer) },
    ],
    comment: submission.comment,
    submittedAt: submission.submitted_on,
    score: {
      points: submission.grade,
      total: Number(q.pointVal).toFixed(2),
      percentage: `${parseFloat(submission.grade / q.pointVal * 100).toFixed(2)}%`
    }
  };
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

          <View style={styles.headerContainer}>
            <View style={styles.scoreSection}>
              <Text style={styles.scoreText}>
                Score: <Text style={styles.scoreValue}>{questionData.score.points}/{questionData.score.total}</Text>
              </Text>
              <Text style={[styles.percentageText,
              questionData.score.percentage === 100 ? styles.correctScore :
                questionData.score.percentage === 0 ? styles.incorrectScore :
                  styles.partialScore]}>
                {questionData.score.percentage}
              </Text>
            </View>
            <Text style={styles.dateText}>
              Submitted: {formatDate(questionData.submittedAt)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Question</Text>
            <Text style={styles.questionText}>{questionData.question}</Text>
          </View>
             {/* {(questionData?.imgFile || item?.imgFile) && (
                <Image 
                  source={{ 
                    uri: questionData?.imgFile || item?.imgFile,
                    cache: 'reload'
                  }} 
                  style={styles.image} 
                  resizeMode="contain"
                />
              )} */}

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
                  {option.studentSelected ? (
                    option.isCorrect ? (
                      <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                    ) : (
                      <MaterialIcons name="cancel" size={24} color="#F44336" />
                    )
                  ) : option.isCorrect ? (
                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                  ) : null}
                </View>
              </View>
            ))}
          </View>

          {/* Comment section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comment</Text>
            <Text style={styles.explanationText}>{questionData.comment}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  waitingText: { color: "#D02C32", paddingTop: 5, fontWeight: "bold" },
});

export default MCQStudentSubmission;