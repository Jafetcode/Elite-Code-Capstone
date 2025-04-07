import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card, Popover,  } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";
import { TextInput } from "react-native";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherManageCourse() {
    const navigation = useNavigation();
    const route = useRoute();
    const { course } = route.params;

    const [courseName, setCourseName] = React.useState(course.courseName);
    const [description, setDescription] = React.useState(course.description);

    const handleUpdate = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/course/${course.cid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseName, description }),
            });

            if (res.ok) {
                Alert.alert("Success", "Course edited!");
                navigation.goBack();
            } else {
                Alert.alert("Error", "Failed to edit course.", err);
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", err);
        }
    };
    const handleDelete = async () => {
        Alert.alert(
            "Course will be deleted",
            `Are you sure you want to delete course with ID: ${course.cid}?`,
            [
                {text: "Cancel", style: "cancel"},
                {
                 text: "Delete", style: "destructive",
                 onPress: async () => {
                    try {
                        const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/course/${course.cid}`, {
                            method: "DELETE",
                        });
                        if (res.ok) {
                            Alert.alert("Deleted", "Course deleted successfully!");
                            navigation.goBack();
                        } else {
                            Alert.alert("Error", "Failed to delete course.", err);
                        }
                    } catch (err) {
                        console.error(err);
                        Alert.alert("Error", "Something went wrong.", err);
                    }
                 },
                },
            ]

        );
    }
    return (
        <Layout style={{ flex: 1, padding: 15 }}>
            <ScrollView>
                <View style={{ marginBottom: 20 }}>
                    <View >
                        <Text category="h6">
                            Edit Course
                        </Text>
                        <Text> Course Name</Text>
                        <TextInput
                            value={courseName}
                            onChangeText={setCourseName}
                            style={styles.input}
                            placeholder="Enter New Course Name"
                        />
                        <Text style={{ marginTop: 15 }}>Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                            placeholder="Enter New Description"
                        />    

                        <Button size="small" status="warning" style={{ marginBottom: 20 }} onPress={handleUpdate}>
                            Edit Course
                        </Button>
                        <Button size="small" status="danger" style={{ marginBottom: 20 }} onPress={handleDelete}>
                            Delete Course
                        </Button>
                    </View>
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


export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <TeacherManageCourse />
        </ApplicationProvider>
    </>
);
