import * as React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherHome() {
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
                        <Text category="s1">Course Library</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherGroup', { screen: 'CreateCourse'})}>
                            <Text appearance="hint">Create Course</Text>
                        </TouchableOpacity>
                    </View>

                    <Card style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherGroup', { screen: 'Course' })}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text>Course Name</Text>
                                    <Text appearance="hint">Description</Text>
                                </View>
                                <Text category="s2">Students: 20</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherGroup', { screen: 'Course' })}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 40, height: 40, backgroundColor: "#ccc", marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text>Course Name</Text>
                                    <Text appearance="hint">Description</Text>
                                </View>
                                <Text category="s2">Students: 13</Text>
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
      <TeacherHome />
    </ApplicationProvider>
  </>
);
