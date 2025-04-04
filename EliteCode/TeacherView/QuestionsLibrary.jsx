import React, { useState, useEffect } from "react";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import { View, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

function QuestionsLibrary() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [questions, setQuestions] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getQuestions = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/allQuestions?tid=${user.userID}`);
            const data = await res.json();
            setQuestions(data.results)
        } catch (error) {
            console.log('Error occurred in get questions')
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            if (user?.userID) {
                getQuestions();
            }
        }, [user])
    );


    return (
        <Layout style={{ flex: 1, padding: 5 }}>
            <ScrollView>
                <View style={{ marginBottom: 20 }}>
                    {questions.length > 0 ? (
                        <>
                            {questions.map((question) =>
                                <Card key={question.qid} style={{borderRadius: 10,  borderWidth: 0}}>
                                    <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ paddingBottom: 10 }}>{question.question}?</Text>
                                            <Text appearance="hint" >{question.description}</Text>
                                        </View>
                                    </View>
                                    <View><Text category="s2">Topic: {question.topic}</Text></View>
                                    <View><Text category="s2">Due: {formatDate(question.dueDate)}</Text></View>
                                    <Text category="s2">{question.pointVal} Points</Text>
                                    {/* <View><Text category="s2">{question.imgfile}</Text></View> */}
                                    <View style={styles.container}>
                                        <Button size="small" style={{ margin: 5, width: 140 }} onPress={() => navigation.navigate('Assign a question', {assignTo: "course", question: question})}>
                                            Assign to class
                                        </Button>
                                        <Button size="small" style={{ margin: 5, width: 140 }} onPress={() => navigation.navigate('Assign a question', {assignTo: "student", question: question})}>
                                            Assign to student/students
                                        </Button>
                                    </View>
                                </Card>

                            )}
                        </>
                    ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>
                            <Text category="s1">No questions have been created. </Text>
                        </View>
                    )}
                </View>

            </ScrollView>
        </Layout>


    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default QuestionsLibrary;