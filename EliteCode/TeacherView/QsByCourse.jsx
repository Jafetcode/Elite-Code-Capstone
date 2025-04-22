import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
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
    const courseName = route.params?.cName;

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
            console.log("questions", data.results)

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
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B", paddingTop: 50 }}>
            <Text category='h5' > Questions For:  </Text>
            <Text category='h6' style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 5, width: 200}}>
                {courseName}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <Text></Text>
                <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateQuestion')}>
                    <Text style={{ marginBottom: 10, }} category='s1' appearance="hint">Create Question</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
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
                                        <Card style={{ borderRadius: 20 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10, }}>
                                                <View style={{ flex: 1 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ paddingBottom: 10, paddingRight: 15, width: 220 }}>{question.question}?</Text>
                                                        <View style={styles.badgeType}>
                                                            <Text style={styles.badgeText}>{question.type}</Text>
                                                        </View>
                                                    </View>
                                                    <Text appearance="hint">{question.description}</Text>
                                                </View>
                                            </View>
                                            <View><Text category="s2">Topic: {question.topic}</Text></View>
                                            <View><Text category="s2">Due: {formatDate(question.dueDate)}</Text></View>
                                            <Text category="s2">{question.pointVal} Points</Text>
                                            <Button
                                                onPress={() => navigation.navigate('TeacherManageQuestion', {
                                                    course: cid,
                                                    qid: question.qid
                                                })}
                                                style={{ marginTop: 20, paddingLeft: 0 }}>
                                                Edit Question
                                            </Button>
                                        </Card>

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
const styles = StyleSheet.create({
    badgeType: {
        backgroundColor: "#3A4B5C",
        borderRadius: 6,
        paddingHorizontal: 8,
        width: 80,
        marginTop: 10,
        justifyContent: "center"

    },
    badgeStatus: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        padding: 4
    }
});
export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <QsByCourse />
        </ApplicationProvider>
    </>
);
