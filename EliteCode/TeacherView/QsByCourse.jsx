import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";
import { useRoute } from '@react-navigation/native';
import { SlideInDown } from "react-native-reanimated";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function QsByCourse() {
    const navigation = useNavigation();
    const route = useRoute();
    const [questions, setQuestions] = React.useState([]);
    const { user } = useAuth();
    const { cid } = route.params || {};
    const { cName } = route.params || {};

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
                    <Text category="s1"> Questions for course { } </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateLesson')}>
                        <Text appearance="hint">Create Question</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text category="s1"> </Text>
                        <TouchableOpacity>
                            <Text category="h5" style={{ flex: 1, alignItems: "center", color: "white", margin: 10 }}> Questions Assgined To: </Text>
                            <Text category="h5" style={{ flex: 1, alignItems: "center", color: "white", marginBottom: 20 }} > {cName} </Text>
                        </TouchableOpacity>
                    </View>

                    {questions.map((question) =>
                        (question.classView === 1) && (
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
            <QsByCourse />
        </ApplicationProvider>
    </>
);
