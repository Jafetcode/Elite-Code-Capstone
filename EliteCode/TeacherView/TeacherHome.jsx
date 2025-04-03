import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useAuth } from "../AuthContext";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherHome() {
    const navigation = useNavigation();
    const [courses, setCourses] = React.useState([]);
    const { user } = useAuth();

    const fetchCourses = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/courses?tid=${user.userID}`);
            const data = await res.json();
            setCourses(data.results);
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (user?.userID) {
                fetchCourses();
            }
        }, [user])
    );

    return (
        <Layout style={{ flex: 1,padding: 15}}>
            <ScrollView>
                <View style={{ marginBottom: 20 }}>
                <View style={styles.container}>
                            <Button size = "small" style= {{margin: 5, width: 140}} onPress={() => navigation.navigate('QuestionsLibrary', { cid: course.cid, cName: course.courseName })}>
                                Questions Library
                            </Button>
                            </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}>
                        <Text category="s1">Course Library</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherCreateCourse')}>
                            <Text appearance="hint">Create a Course</Text>
                        </TouchableOpacity>
                    </View>
                    {courses.map((course) => (
                        <Card key={course.cid} style={{ borderRadius: 10, marginBottom: 10}}>
                            {/* <TouchableOpacity onPress={() => navigation.navigate('TeacherCourse')}> */}
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ flex: 1 }}>
                                        <Text>{course.courseName}</Text>
                                        <Text appearance="hint">{course.description}</Text>
                                    </View>
                                </View>
                                <View>
                                <Text category="s2">Enrolled: {course.NumEnrolled}      Course Code: {course.cid}  </Text>
                                </View>
                            {/* </TouchableOpacity> */}
                            <View style={styles.container}>
                            <Button size = "small" style= {{margin: 5, width: 140}} onPress={() => navigation.navigate('Classlist', { cid: course.cid })}>
                                Classlist
                            </Button>
                            <Button size = "small" style= {{margin: 5, width: 140}} onPress={() => navigation.navigate('QsByCourse', { cid: course.cid, cName: course.courseName })}>
                                Questions
                            </Button>
                            </View>
                        </Card>
                    ))}
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
            <TeacherHome />
        </ApplicationProvider>
    </>
);
