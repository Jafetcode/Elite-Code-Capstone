import {useState} from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card, Input, Radio, RadioGroup } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { text } from "body-parser";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherCreateCourse() {
    const navigation = useNavigation();
    const [courseName, setCourseName] = useState('');
    const [desc, setDesc] = useState('');
    const [value, setValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleCreateCourse = async () => {
        try {
            const tid = "T1"
            const response = await fetch('https://elitecodecapstone24.onrender.com/createCourse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseName,
                    // courseCode,
                    tid,
                    desc
                }),
            });

            const textResponse = await response.json();
            console.log("RAW API Response: ", textResponse);

            const data = JSON.parse(textResponse);


            if (response.ok) {
                alert("Course Created!");
                navigation.goBack();
            } else {
                throw new Error(data.error || "Failed to create course in MYSQL")
            }
        } catch (error) {
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
                    <Input placeholder='Type Description Here' value={desc} onChangeText={setDesc} />
                </View>

                <Button onPress={handleCreateCourse}> Create Course</Button>
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

