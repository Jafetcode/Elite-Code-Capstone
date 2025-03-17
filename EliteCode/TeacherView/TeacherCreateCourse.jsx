import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card, Input, Radio, RadioGroup } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherCreateCourse() {
    const navigation = useNavigation();
    const [courseName, setCourseName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [value, setValue] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleCreateCourse = async () => {
        try {
            const tid = 1; 

            const response = await fetch('https://elitecodecapstone24.onrender.com/createCourse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseName,
                    // courseCode,
                    tid,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Course Created!");
                navigation.goBack(); 
            } else {
                alert(`Error: ${data.error}`);
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
            
                                <Input placeholder='Type Description Here' value={desc} onChangeText={nextValue => setDesc(nextValue)} />
            
                                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text category="h5">Course Code *</Text>
                                </View>
                                <Input placeholder='Write the code for the course here. This is what your students will type to join your course' 
                                value={courseCode} onChangeText={nextValue => setCourseCode(nextValue)} /> */}
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

