import React, { useState } from 'react';
import useRoute from '@react-navigation/native';
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

const TeacherCourseClasslist = () => {
    const route = useRoute();
    const { cid } = route.parmas || {};
    // 7aee93
    console.log(cid)
    const [classlist, setClasslist] = useState({})
    const getClasslist = async() => {
        setClasslist = await fetch(`https://elitecodecapstone24.onrender.com/instructor/classlist?cid=${cid}`);
    }
    getClasslist();
    console.log(classlist);
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
                        <Text category="s1"> Course classlist ${classlist[0].email} </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateCourse')}>
                            <Text appearance="hint">Create Course</Text>
                        </TouchableOpacity>
                    </View>

                    <Card style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherCourse')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text>Course Name</Text>
                                    <Text appearance="hint">Description</Text>
                                </View>
                                <Text category="s2">Students: 20</Text>
                            </View>
                            <View>
                                <Text category="s2">Course Code: 100000 </Text>
                            </View>

                        </TouchableOpacity>
                        <Button onPress={() => navigation.navigate('TeacherCourseClasslist')}>
                            View Classlist
                        </Button>
                    </Card>

                    <Card>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherCourse')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text> Data Structures </Text>
                                    <Text appearance="hint">Description</Text>
                                </View>
                                <Text category="s2">Students: 13</Text>
                            </View>
                            <View>
                                <Text category="s2">Course Code: 100000 </Text>
                            </View>

                        </TouchableOpacity>
                        <Button onPress={() => navigation.navigate('TeacherCourseClasslist', { cid: '7aee93' })}>
                            View Classlist
                        </Button>
                    </Card>

                    {courses.map((course) => (
                        <Card key={course.cid} style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('TeacherCourse')}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text>{course.courseName}</Text>
                                        <Text appearance="hint">{course.description}</Text>
                                    </View>
                                    <Text category="s2">Students: {course.students || 0}</Text>
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