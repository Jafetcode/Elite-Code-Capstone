import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

const TeacherCourseClasslist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cid } = route.params || {};
    const courseName = route.params?.cName;
    const [classlist, setClasslist] = useState([])
    const { user } = useAuth();

    const fetchClasslist = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/classlist?cid=${cid}`);
            const data = await res.json();
            setClasslist(data.results)
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };

    const handleRemoveStudent = async (student) => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/removeStudent?cid=${cid}&sid=${student.userID}`, {
                method: "DELETE"
            });
            if (res.ok) {
                fetchClasslist();
            } else {
                console.error("Failed to remove student");
            }
        } catch (error) {
            console.error("Failed to remove student: ", error);
        }
    }

    useEffect(() => {
        fetchClasslist()
    }, [cid]);
    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B", paddingTop: 50 }}>
            <View style={{marginBottom: 5 }}>
                <Text category='h4' style={styles.heading}> Classlist:</Text>
                <Text category='h6' style={styles.subHeading}> {courseName} </Text>
            </View>
            <ScrollView>
            {classlist.length > 0 ? (
                <View style={{ marginBottom: 20 }}>
                    {classlist.map((student) => (
                        <Card key={student.userID} style={{ marginBottom: 10, borderRadius: 30 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={require("../assets/images/profile-picture.png")}
                                    style={{ width: 40, height: 40, borderRadius: 40, margin: 5, marginRight: 20 }} />
                                <View style={{ flex: 1 }}>
                                    <Text >{student.fname} {student.lname}</Text>
                                    <Text appearance="hint">{student.email}</Text>
                                </View>
                            </View >
                            <View style={styles.container}>
                                <Button size="small" style={{ margin: 5, width: 140 }} onPress={() => navigation.navigate('QuestionsAssignedToStudent', { student: student, tid: user.userID })}>
                                    <Text>Assigned Questions</Text>
                                </Button>
                                <Button size="small" style={{ margin: 5, width: 140 }} status="danger"
                                    onPress={() =>
                                        Alert.alert(
                                            "Remove Student",
                                            `Are you sure you want to remove ${student.fname} ${student.lname}?`,
                                            [
                                                {
                                                    text: "Cancel",
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Remove Student",
                                                    style: "destructive",
                                                    onPress: () => handleRemoveStudent(student)
                                                }
                                            ]
                                        )
                                    }
                                >
                                    <Text>REMOVE STUDENT</Text>
                                </Button>
                            </View>
                        </Card>
                    ))}
                </View>) : (<View> <Text> No student enrolled. </Text></View>)}
            </ScrollView>
        </Layout>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    heading: { marginBottom: 8, paddingTop: 10 },
    subHeading: { marginBottom: 8 },


});

export default TeacherCourseClasslist;