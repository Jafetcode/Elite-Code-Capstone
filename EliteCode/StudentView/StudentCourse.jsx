import * as React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function StudentCourse() {

    const navigation = useNavigation();
    const route = useRoute();
    const { cid } = route.params;

    useFocusEffect(
        React.useCallback(() => {
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

            fetchCourseData();
        }, [cid])
    );

    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 50 }}>
                    {/* Header */}
                    <Image source={require("../assets/images/FinalLogo2.png")}
                        style={{
                            width: 300,
                            height: 150,
                            marginTop: -10,
                            marginBottom: -25,
                            alignSelf: 'center',
                            resizeMode: 'cover',
                        }}
                    />

<View style={{ marginBottom: 20 }}>
            <Text>{cid}</Text>
                    
                    <Card style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('StudentQuestion')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Lesson Name</Text>
                                    <Text appearance="hint">Description</Text>
                                </View>
                                <Text category="s2">Progress: 4/4</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('StudentQuestion')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Lesson Name</Text>
                                    <Text appearance="hint">Description</Text>
                                </View>
                                <Text category="s2">Progress: 2/2</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                </View>





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
