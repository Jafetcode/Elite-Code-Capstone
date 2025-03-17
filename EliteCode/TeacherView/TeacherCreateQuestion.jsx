import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card, Input, Radio, RadioGroup, Datepicker } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherCreateQuestion() {
    const navigation = useNavigation();
    const [value, setValue] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
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
                    Create Question
                </Text>
            </View>

            <ScrollView>
                <View style={{ marginBottom: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Question *</Text>

                    </View>

                    <Input placeholder='Type Question Here' value={value} onChangeText={nextValue => setValue(nextValue)} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Description</Text>

                    </View>

                    <Input placeholder='Type Description Here' value={value} onChangeText={nextValue => setValue(nextValue)} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Type *</Text>
                    </View>
                    <RadioGroup selectedIndex={selectedIndex} onChange={index => setSelectedIndex(index)}>
                        <Radio>
                            Multiple Choice
                        </Radio>
                        <Radio>
                            Short Answer
                        </Radio>
                    </RadioGroup>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Due Date *</Text>
                    </View>
                    <View>
                        <Text category='h7'> {`Selected date: ${date.toLocaleDateString()}`} </Text>
                        <Datepicker
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                        />
                    </View>
                </View>
                <Button> Submit Question</Button>
            </ScrollView>
        </Layout>
    );
}

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
            <TeacherCreateQuestion />
        </ApplicationProvider>
    </>
);
