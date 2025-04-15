import * as React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

function StudentCourse() {

    const navigation = useNavigation();
    const route = useRoute();
    const { cid, courseName } = route.params;
    const { user } = useAuth();
    const [questions, setQuestions] = React.useState([]);
    const [upcoming, setUpcoming] = React.useState([]);
    const [pastDue, setPastDue] = React.useState([]);

    const fetchCourseData = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/student/getCourseData?cid=${cid}`);
            const data = await res.json();
            setQuestions(data.results || []);

        } catch (error) {
            console.error("Failed to fetch course data:", error);
            Alert.alert("Error", "Could not load course data.");
        }
    };

    const fetchAssignments = async () => {
        try {
            const [upcomingRes, pastDueRes] = await Promise.all([
                fetch(`https://elitecodecapstone24.onrender.com/student/getUpcomingCoursesQuestions?sid=${user.userID}&cid=${cid}`),
                fetch(`https://elitecodecapstone24.onrender.com/student/getPastDueCourseQuestions?sid=${user.userID}&cid=${cid}`)
            ]);
    
            const upcomingClassData = await upcomingRes.json();
            console.log("Upcoming response:", upcomingClassData);
            const pastDueClassData = await pastDueRes.json();
            console.log("Past Due response:", pastDueClassData);
    
            const combinedUpcoming = [
                ...(upcomingClassData.results.upcomingClass || []),
                ...(upcomingClassData.results.upcomingStudent || [])
            ];
    
            const combinedPastDue = [
                ...(pastDueClassData.results.pastDueClass || []),
                ...(pastDueClassData.results.pastDueStudent || [])
            ];
    
            setUpcoming(combinedUpcoming);
            setPastDue(combinedPastDue);
    
        } catch (error) {
            console.error("Failed to fetch assignments:", error);
            Alert.alert("Error", "Could not load your assignments.");
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            fetchCourseData();
            fetchAssignments();
        }, [user, cid])
    );


    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 20 }}>

                    {/* Header */}
                    <Image source={require("../assets/images/FinalLogo2.png")}
                        style={{
                            width: 300,
                            height: 150,
                            marginTop: 40,
                            marginBottom: -25,
                            alignSelf: 'center',
                            resizeMode: 'cover',
                        }}
                    />

                    <Text>{cid}</Text>
                    <Text>{courseName}</Text>

                    {/* Upcoming Cards */}
                    <Text category="s1" style={{ marginVertical: 10, color: 'white' }}>Upcoming Questions</Text>
                    {upcoming.length === 0 ? (
                        <Text appearance="hint">No upcoming questions!</Text>
                    ) : (
                        upcoming.map((question) => (
                            <Card
                                key={question.qid}
                                style={{ borderRadius: 10, marginBottom: 10, backgroundColor: "#1E2A38" }}
                            >
                                <TouchableOpacity onPress={() => navigation.navigate("StudentQuestion", { qid: question.qid })}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14, color: 'white' }}>
                                            {question.topic}
                                        </Text>
                                        <View style={{ backgroundColor: '#3A4B5C', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                                            <Text style={{ color: 'white', fontSize: 12 }}>{question.type}</Text>
                                        </View>
                                    </View>

                                    <Text appearance="hint" numberOfLines={1} ellipsizeMode="tail" style={{ marginBottom: 3, color: "#A9B7C6" }}>
                                        {question.question}
                                    </Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 3 }}>
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Text appearance="hint">Due: {new Date(question.dueDate).toLocaleDateString()}</Text>
                                            <Text appearance="hint">Points: {question.pointVal}</Text>
                                        </View>

                                        <View style={{ backgroundColor: '#D87D4A', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                                            <Text style={{ color: 'white', fontSize: 12 }}>Upcoming</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        ))
                    )}

                    {/* Past Due Cards */}
                    <Text category="s1" style={{ marginVertical: 10, color: 'white' }}>Past Due Questions</Text>
                    {pastDue.length === 0 ? (
                        <Text appearance="hint">No past due questions!</Text>
                    ) : (
                        pastDue.map((question) => (
                            <Card
                                key={question.qid}
                                style={{ borderRadius: 10, marginBottom: 10, backgroundColor: "#1E2A38" }}
                            >
                                <TouchableOpacity onPress={() => navigation.navigate("StudentQuestion", { qid: question.qid })}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14, color: 'white' }}>
                                            {question.topic}
                                        </Text>
                                        <View style={{ backgroundColor: '#3A4B5C', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                                            <Text style={{ color: 'white', fontSize: 12 }}>{question.type}</Text>
                                        </View>
                                    </View>

                                    <Text appearance="hint" numberOfLines={1} ellipsizeMode="tail" style={{ marginBottom: 3, color: "#A9B7C6" }}>
                                        {question.question}
                                    </Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 3 }}>
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Text appearance="hint">Due: {new Date(question.dueDate).toLocaleDateString()}</Text>
                                            <Text appearance="hint">Points: {question.pointVal}</Text>
                                        </View>

                                        <View style={{ backgroundColor: '#A94B4B', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                                            <Text style={{ color: 'white', fontSize: 12 }}>Past Due</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        ))
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
            <StudentCourse />
        </ApplicationProvider>
    </>
);
