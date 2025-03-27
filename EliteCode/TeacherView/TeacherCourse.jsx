import * as React from "react";
import {useState} from 'react';
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {useAuth} from '../AuthContext';
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherCourse(){
    const {user} = useAuth(); 
    const navigation = useNavigation();
    const [courses, setCourses] = useState({});
    const getQuestions = async() => {
        try {
            setCourses =  await fetch(`https://elitecodecapstone24.onrender.com/instructor/courses?tid=${user.uid}`);
            console.log(courses)
        } catch(error){
            console.log('Error occurred')
        }

    }
   
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
                        <Text category="s1"> Questions for course {} </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateLesson')}>
                            <Text appearance="hint">Create Question</Text>
                        </TouchableOpacity>
                    </View>

                    <Card style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherLesson')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Question name </Text>
                                    <Text appearance="hint">Description</Text>
                                </View>
                                <Text category="s2">Completion: 11/20</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherLesson')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Question Name</Text>
                                    <Text appearance="hint"> Description</Text>
                                </View>
                                <Text category="s2">Completion: 9/20</Text>
                            </View>

                        </TouchableOpacity>
                    </Card>

                </View>
            </ScrollView>
        </Layout>
    );
}

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <TeacherCourse />
        </ApplicationProvider>
    </>
);
