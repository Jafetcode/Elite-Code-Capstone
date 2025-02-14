import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text, Card, Radio, RadioGroup } from "@ui-kitten/components";
import { Input } from '@ui-kitten/components';

function TeacherCreateQuestion() {
    const navigation = useNavigation();
    const [value, setValue] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
        
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()}>
                            {"<"}
                        </Button>
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
                        </View>
                        <Button> Submit Question</Button>
                    </ScrollView>
                </Layout>
            );
}

export default () => (
    <Layout style={{ flex: 1 }}>
        <TeacherCreateQuestion />
    </Layout>
);
