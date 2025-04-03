import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherQuestion() {
    const navigation = useNavigation();
    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
    
        </Layout>
    );
}

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <TeacherQuestion />
        </ApplicationProvider>
    </>
);
