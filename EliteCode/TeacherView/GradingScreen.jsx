import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView, Image} from "react-native";
import { Layout, Button, Text, Card, Input } from "@ui-kitten/components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

function Question() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const student = route.params?.s;
  const question = route.params?.q;
  const [submission, setSubmission] = useState({});
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");

useEffect(() => {
    const fetchSubmission = async () => {
      try {
        console.log("getting submission", "question: ", question.qid, "studnet:", student.userID)
        const res = await fetch(`https://elitecodecapstone24.onrender.com/student/submission?qid=${question.qid}&sid=${student.userID}`);
        const data = await res.json();
        console.log("getting submission", data.results[0].question)
        setSubmission(data.results[0]);
      } catch (error) {
        Alert.alert("Error", "Could not load your submission.", error);
      }
    };
    fetchSubmission();
  }, [question, student]);

  const handleSubmitGrade = async () => {
    try {
        await fetch("https://elitecodecapstone24.onrender.com/instructor/gradeSubmission", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                qid: question.qid,
                sid: student.userID,
                grade: grade,
                comment: feedback
            }),
        });
        alert("Grade submitted successfully!");
        navigation.goBack();
    } catch (error) {
        console.error("Error submitting grade", error);
    }
    console.error("Grade submitted successfully!");
};


  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
            <ScrollView>
                <Card style={{ marginBottom: 20 }}>
                    <Text category="h5">Grading for {student.fname} {student.lname}</Text>
                </Card>

                {question && (
                    <Card style={{ marginBottom: 20 }}>
                        <Text category="h6">Question:</Text>
                        <Text>{question.question}</Text>
                        {/* <Image>{question.imgFile}</Image> */}
                    </Card>
                )}

                {submission ? (
                    <Card style={{ marginBottom: 20 }}>
                        <Text category="h6">Student's Response:</Text>
                        <Text>{submission.answer}</Text>
                    </Card>
                ) : (
                    <Text>No submission found.</Text>
                )}

                <Card style={{ marginBottom: 20 }}>
                    <Text category="h6">Enter Grade:</Text>
                    <Input
                        placeholder="e.g. 20/30"
                        value={grade}
                        onChangeText={setGrade}
                        keyboardType="numeric"
                        style={{ marginTop: 10 }}
                    />
                </Card>

                <Card style={{ marginBottom: 20 }}>
                    <Text category="h6">Provide Feedback:</Text>
                    <TextInput
                        placeholder="Write feedback here..."
                        value={feedback}
                        onChangeText={setFeedback}
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            padding: 10,
                            height: 100,
                            borderRadius: 5,
                            marginTop: 10,
                            backgroundColor: "#fff",
                        }}
                        multiline
                    />
                </Card>

                <Button onPress={handleSubmitGrade}>Submit Grade</Button>
            </ScrollView>
        </Layout>
    );
}

export default Question;