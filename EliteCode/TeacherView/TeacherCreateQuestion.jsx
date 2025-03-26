import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon, Card, Input, Radio, RadioGroup, Datepicker } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherCreateQuestion() {
    const navigation = useNavigation();
    const [qid] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [type, setType] = React.useState('MCQ');
    const [dueDate, setDate] = React.useState(new Date());
    const [question, setQuestion] = React.useState('');
    const [pointVal, setPointVal] = React.useState('');
    const [topic, setTopic] = React.useState('');
    const [language, setLanguage] = React.useState('');
    const [imgFile, setImgFile] = React.useState('');

    const formattedDate = dueDate.toISOString().slice(0, 19).replace('T', ' ');
    console.log(qid)
    const handleCreateQuestion = async () => {
        try {

            const response = await fetch('https://elitecodecapstone24.onrender.com/createQuestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                question, description, pointVal, imgFile, language, topic, type, dueDate: formattedDate
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Question Created!");
                navigation.goBack();
            } else {
                alert('Error:' + (data.error || 'Failed to create question'));
                
            }
        } catch (error) {
            alert("Network error: " + error.message);
            console.log(error.message);
        }
        

    }
    const handleTypeChange = (selectedIndex) => {
        setType(selectedIndex === 0 ? 'MCQ' : 'ShortAns');
        console.log('Selected type:', selectedIndex === 0 ? 'MCQ' : 'ShortAns');
    };
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

                    <Input
                        placeholder="Enter question"
                        value={question}
                        onChangeText={question => setQuestion(question)}
                    />
                    {console.log('Question:', question)}

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Description</Text>

                    </View>

                    <Input placeholder='Type Description Here' 
                    value={description}
                     onChangeText={description => setDescription(description)} />
                    {console.log('Description:', description)}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Type *</Text>
                    </View>
                    <RadioGroup 
                    selectedIndex={type === 'MCQ' ? 0 : 1} 
                    onChange={handleTypeChange}>
                        <Radio>
                            Multiple Choice
                        </Radio>
                        <Radio>
                            Short Answer
                        </Radio>
                    </RadioGroup>
                    {console.log('Type:', type)}

                    <Input
                        placeholder="Point value"
                        value={pointVal}
                        onChangeText={value => setPointVal(value)}
                        keyboardType="numeric"
                        style={{ marginBottom: 5 }}
                    />
                    {console.log('Point Value:', pointVal)}
                    <Input
                        placeholder="Topic"
                        value={topic}
                        onChangeText={value => setTopic(value)}
                        style={{ marginBottom: 5 }}
                    />
                    {console.log('Topic:', topic)}
                    <Input
                        placeholder="Language"
                        value={language}
                        onChangeText={value => setLanguage(value)}
                        style={{ marginBottom: 5 }}
                    />
                    {console.log('Language:', language)}
                    {/* <Button onPress={() => {
                        console.log('Add Image');
                    }}>
                        Add Image
                    </Button> */}
                    <Input
                        placeholder="ImgFile"
                        value={imgFile}
                        onChangeText={value => setImgFile(value)}
                        style={{ marginBottom: 5 }}
                    />
                    {console.log('ImgFile:', imgFile)}

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text category="h5">Due Date *</Text>
                    </View>
                    <View>
                        <Text category='p1'> {`Selected date: ${dueDate.toLocaleDateString()}`} </Text>
                        <Datepicker
                            date={dueDate}
                            onSelect={date => setDate(date)}
                        />
                        {console.log('Due Date:', dueDate)}
                        {console.log('Formatted Date:', formattedDate)}
                    </View>
                </View>
                <Button
                onPress={handleCreateQuestion}
                > Submit Question</Button>
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
