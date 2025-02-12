import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text, Card } from "@ui-kitten/components";

function TeacherCreateQuestion() {
    const navigation = useNavigation();

    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()}>
                    {"<"}
                </Button>
                <Text category="h5" style={{ flex: 1, textAlign: "center", paddingRight: 50 }}>
                    Elite Code
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Text category="h5" style={{ flex: 1, textAlign: "center"}}>
                    Create Question Page
                </Text>
            </View>

        </Layout>
    );
}

export default () => (
    <Layout style={{ flex: 1 }}>
        <TeacherCreateQuestion />
    </Layout>
);
