import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";

function QuestionsLibrary() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [questions, setQuestions] = useState({});

    const getQuestions = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/allQuestions?tid=${user.uid}`);
            const data = await res.json();
            setQuestions(data.results)
            console.log(courses)
        } catch (error) {
            console.log('Error occurred')
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
        <Layout style={{ flex: 1, padding: 15 }}>
            <ScrollView>
                <View style={styles.container}>
                    <Button size="small" style={{ margin: 5, width: 140 }} onPress={() => navigation.navigate('TeacherQuestion',)}>
                        Assign to course
                    </Button>
                    <Button size="small" style={{ margin: 5, width: 140 }} onPress={() => navigation.navigate('QuestionsLibrary', { cid: course.cid, cName: course.courseName })}>
                        Assign to a student/students
                    </Button>
                </View>

                <Text> Display teacher questions </Text>
                <View style={{ marginBottom: 20 }}>
                    {questions.length > 0 ? (
                        <>
                            {questions.map((question) => 
                                    <Card key={question.qid} style={{}}>
                                        <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ paddingBottom: 10 }}>{question.question}?</Text>
                                                <Text appearance="hint" >{question.description}</Text>
                                            </View>
                                        </View>
                                        <View><Text category="s2">Topic: {question.topic}</Text></View>
                                        <View><Text category="s2">Due: {formatDate(question.dueDate)}</Text></View>
                                        <Text category="s2">{question.pointVal} Points</Text>
                                        <View><Text category="s2">{question.imgfile}</Text></View>
                                        <Button onPress={() => navigation.navigate("Question", { q: question, s: student })} > </Button>
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