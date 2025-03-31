import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function QuestionsAssignedToStudent() {
    const navigation = useNavigation();
    const [questions, setQuestions] = React.useState([]);
    const { user } = useAuth();  // Get the user and logout function
    const { student } = route.params || {};
    const { cid } = route.params || {};

    const fetchCourses = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/student/questions?cid=${cid}&sid=${student.userID}`);
            const data = await res.json();
            setQuestions(data.results);
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (user?.userID) {
                fetchCourses();
            }
        }, [sid])
    );

    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Button
                    appearance="ghost"
                    status="basic"
                    accessoryLeft={BackIcon}
                    onPress={() => navigation.goBack()}
                />
                <Text category="h5" style={{ flex: 1, textAlign: "center", paddingRight: 50 }}>
                    Elite Code
                </Text>
            </View>

            <ScrollView>
                <View style={{ marginBottom: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="s1"> </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateCourse')}>
                            <Text appearance="hint"> {student.fname} </Text>
                        </TouchableOpacity>
                    </View>

                    {questions.map((question) =>
                     (question.classView === 1 || question.studentView === 1) && (
                            <Card key={question.qid} style={{ marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('TeacherCourse')}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                                        <View style={{ flex: 1 }}>
                                            <Text>{question.question}</Text>
                                            <Text appearance="hint">{question.description}</Text>
                                        </View>
                                        <Text category="s2"> Value: {question.pointVal}</Text>
                                    </View>
                                    <View>
                                        <Text category="s2"> topic: {question.topic} </Text>
                                    </View>
                                    <View>
                                        <Text category="s2"> due date: {question.dueDate} </Text>
                                    </View>
                                    <View>
                                        <Text category="s2">  {question.imgfile} </Text>
                                    </View>
                                </TouchableOpacity>
                                <Button>
                                    View Classlist
                                </Button>
                            </Card>
                        )
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
            <QuestionsAssignedToStudent />
        </ApplicationProvider>
    </>
);
