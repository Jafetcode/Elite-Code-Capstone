import React from 'react';
import {useState} from 'react';
import {useAuth} from '../AuthContext';
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card, Input, Radio, RadioGroup } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";



function TeacherCreateCourse() {
    const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
    const navigation = useNavigation();
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const {user} = useAuth(); 
    const [value, setValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleCreateCourse = async () => {
        
        try {
            const response = await fetch(`https://elitecodecapstone24.onrender.com/instructor/createCourse?tid=${user.userID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseName: courseName.trim(), 
                    description: description.trim()
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Course Created!");
                navigation.goBack();
            } else {
                alert('Error: ' + JSON.stringify(data));
            }
        } catch (error) {
            console.log(courseName);
            console.log(description);
            alert("Network error: " + error.message);
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
                <Text category="h3" style={{ flex: 1, textAlign: "center", paddingRight: 50 }}>
                    Create Course
                </Text>
            </View>

            <ScrollView>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Course Name *</Text>
                    </View>
                    <Input placeholder="Enter course name" value={courseName} onChangeText={setCourseName} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Description</Text>
                    </View>
                    <Input placeholder='Type Description Here' value={description} onChangeText={setDescription} />

                    {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text category="h5">Course Code *</Text>
                                </View>
                                <Input placeholder='Write the code for the course here. This is what your students will type to join your course' 
                                value={courseCode} onChangeText={setCourseCode} /> */}
                </View>
                <Button onPress={handleCreateCourse} disabled={!courseName}> Create Course</Button>
            </ScrollView>
        </Layout>
    );
}

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <TeacherCreateCourse />
        </ApplicationProvider>
    </>
);