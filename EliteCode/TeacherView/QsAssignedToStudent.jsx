import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";
import { useRoute } from '@react-navigation/native';
// import { SlideInDown } from "react-native-reanimated";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function QuestionsAssignedToStudent() {
    const navigation = useNavigation();
    const route = useRoute();
    const [questions, setQuestions] = React.useState([]);
    const { user } = useAuth();
    const student = route.params?.student;
    const tid = route.params?.tid;

    const fetchQuestions = async () => {
        try {
            console.log("info passing jsx", tid, student.userID)
            // TO DO: update the route to show only questions 
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/QsByStudent?tid=${tid}&sid=${student.userID}`);
            const data = await res.json();
            setQuestions(data.QsByStudnet);
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };
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

    useFocusEffect(
        React.useCallback(() => {
            if (student?.userID) {
                fetchQuestions();
            }
        }, [student, tid])
    );

    return (
        <Layout style={{ flex: 1, padding: 20, paddingTop: 45, backgroundColor: '#2C496B'}}>
            <Text category='h5' style={styles.heading}>Questions Assgined To:</Text>
                <Text category='s1' appearance='hint' style={styles.subHeading}>
                    {student.fname} {student.lname}
                </Text>
            <ScrollView>
                <View style={{ marginBottom: 20 }}>
                    {questions?.length > 0 ? (
                        <>
                            {questions.map((question) =>
                                (question.classView === 1 || question.studentView === 1) && (
                                    <Card style={{ marginBottom: 10, borderRadius: 20 }} key={question.qid} >
                                        <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ paddingBottom: 10, paddingRight: 15 }}>{question.question}?</Text>
                                    
                                                </View>
                                                <Text appearance="hint">{question.description}</Text>
                                            </View>
                                        </View>
                                        <View><Text category="s2">{question.type}</Text> </View>
                                        <View><Text category="s2">Topic: {question.topic}</Text></View>
                                        <View><Text category="s2">Due: {formatDate(question.dueDate)}</Text></View>
                                        <Text category="s2">{question.pointVal} Points</Text>
                                        {/* <View><Text category="s2">{question.imgFile}</Text></View> */}

                                        {question.hasSubmitted ? (
                                            <View style={styles.container}>
                                                <Button size="small" style={{ margin: 10 }} onPress={() => navigation.navigate("Question", { q: question, s: student })} > Grade question </Button>
                                                <Button size="small" style={{ margin: 10 }} onPress={() => {
                                                    const destination =
                                                        question.type === "shortAns" ? "ViewSubmission" : "MCQSubmission";
                                                    navigation.navigate(destination, { q: question, s: student });
                                                }} > View submission </Button>
                                            </View>)
                                            : (<View>
                                                <Text style={styles.waitingText}>Waiting for submission </Text>
                                            </View>)}

                                    </Card>


                                )
                            )}
                            <Button size="small" style={{ margin: 10 }} onPress={() => navigation.navigate("MCQSubmission",)} > Grade question </Button>

                        </>
                    ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>
                            <Text category="s1">No questions have been assigned to {student.fname} {student.lname}.</Text>
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
    heading: { marginBottom: 8, paddingTop: 30 },
    subHeading: { marginBottom: 16, color: "white" },
    waitingText: { color: "#D02C32", paddingTop: 5, fontWeight: "bold" },
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
            <QuestionsAssignedToStudent />
        </ApplicationProvider>
    </>
);
