import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function StudentCourse() {
    const navigation = useNavigation();

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
                        <Text category="s1">Lessons</Text>
                            <Text appearance="hint">Grade: 95%</Text>
                    </View>

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
