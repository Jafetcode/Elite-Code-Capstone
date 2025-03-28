import React, { useState, useEffect } from 'react';
import { useRoute} from '@react-navigation/native';
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

const TeacherCourseClasslist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cid } = route.params || {};
    // 7aee93
    console.log(cid)
    const [classlist, setClasslist] = useState([])
    const { user } = useAuth();  // Get the user and logout function

    const fetchClasslist = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/classlist?cid=${cid}`);
            const data = await res.json();
            setClasslist(data.results)
            console.log("Using tid:", user.userID);
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };

    useEffect(() => {
        fetchClasslist()
    }, [cid]);
    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Text category="h5" style={{ flex: 1, textAlign: "center", paddingRight: 50 }}>
                    Elite Code
                </Text>
            </View>

            <ScrollView>
                <View style={{ marginBottom: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="s1"> Course classlist </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateCourse')}>
                            <Text appearance="hint">Create Course</Text>
                        </TouchableOpacity>
                    </View>

                    {classlist.map((student) => (
                        <Card key={student.userID} style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('TeacherCourse')}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text>{student.fname} {student.lname}</Text>
                                        <Text appearance="hint">{student.email}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </Layout>
    );
}

export default TeacherCourseClasslist;