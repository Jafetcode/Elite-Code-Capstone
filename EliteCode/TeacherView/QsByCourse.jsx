import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";
import { useRoute } from '@react-navigation/native';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function QsByCourse() {
    const navigation = useNavigation();
    const route = useRoute();
    const [questions, setQuestions] = React.useState([]);
    const cid = route.params?.cid;

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

    const fetchQuestions = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/questions?cid=${cid}`);
            const data = await res.json();
            setQuestions(data.results);

        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (cid) {
                fetchQuestions();
            }
        }, [cid])
    );

    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
            <ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text category="s1"> Questions for course </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateQuestion')}>
                        <Text appearance="hint">Create Question</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20 }}>
                    {questions?.length > 0 ? (
                        <>
                            {questions.map((question) =>
                                (question.classView === 1 || question.studentView === 1) && (
                                    <TouchableOpacity 
                                        key={question.qid}
                                        onPress={() => navigation.navigate('TeacherManageQuestion', { 
                                            course: { cid },
                                            qid: question.qid 
                                        })}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Card>
                                            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ paddingBottom: 10 }}>{question.question}?</Text>
                                                    <Text appearance="hint">{question.description}</Text>
                                                </View>
                                            </View>
                                            <View><Text category="s2">Topic: {question.topic}</Text></View>
                                            <View><Text category="s2">Due: {formatDate(question.dueDate)}</Text></View>
                                            <Text category="s2">{question.pointVal} Points</Text>
                                        </Card>
                                        <Button 
                                            onPress={() => navigation.navigate('TeacherManageQuestion', { 
                                                course: cid ,
                                                qid: question.qid 
                                            })}
                                            style={{ marginTop: 20 }}
                                        >
                                            Manage {question.question}
                                        </Button>
                                    </TouchableOpacity>
                                )
                            )}
                        </>
                    ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>
                            <Text category="s1">No questions have been assigned this course.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </Layout>
    );
}

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <QsByCourse />
        </ApplicationProvider>
    </>
);
