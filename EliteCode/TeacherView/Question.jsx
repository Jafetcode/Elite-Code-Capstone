import * as React from "react";
import { View, ScrollView} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Button,
  Text,
  Icon,
  Select,
  Input,
  Radio,
  RadioGroup,
  Datepicker,
  IndexPath,
  SelectItem

} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function Question() {
  const navigation = useNavigation();
  const route = useRoute();
  const {qid} = route.params || {};
  const [question, setQuestion] = useState("");

  const [description, setDescription] = React.useState("");
  const [type, setType] = React.useState("MCQ");
  const [dueDate, setDate] = React.useState(new Date());
  const [pointVal, setPointVal] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [imgFile, setImgFile] = React.useState("");
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");
  const [option3, setOption3] = React.useState("");
  const [correctAns, setCorrectAns] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const formattedDate = dueDate.toISOString().slice(0, 19).replace("T", " ");
  console.log(qid);


  const fetchQuestion = async () => {
    try {
      const response = await fetch("https://elitecodecapstone24.onrender.com/instructor/getQuestion?qid=${qid}")
      const data = await response.json();
      if (response.ok) {
        setQuestion({data})
      } else {
        alert("Error:" + (data.error  || "Failed to fetch question"));
      }
    } catch (error) {
      alert("Network error: " + error.message);
      console.log(error.message);
    }
    if (type === "MCQ") {
        handleUpdateMCQ();
    }
  };
  
  const handleTypeChange = (selectedIndex) => {
    setType(selectedIndex === 0 ? "MCQ" : "ShortAns");
    console.log("Selected type:", selectedIndex === 0 ? "MCQ" : "ShortAns");
  };

  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }} >
        <Button
          appearance="ghost"
          status="basic"
          accessoryLeft={BackIcon}
          onPress={() => navigation.goBack()} />
        <Text
          category="h3"
          style={{ flex: 1, textAlign: "center", paddingRight: 50 }}
        >
          Create Question
        </Text>
      </View>

      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }} >
            <Text category="h5"> Question * </Text>
          </View>
          <Input
            placeholder="Enter question"
            value={question}
            onChangeText={(question) => setQuestion(question)} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}  >
            <Text category="h5">Description</Text>
          </View>

          <Input
            placeholder="Type Description Here"
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
     
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text category="h5">Type *</Text>
          </View>
          <RadioGroup
            selectedIndex={type === "MCQ" ? 0 : 1}
            onChange={handleTypeChange}
          >
            <Radio>Multiple Choice</Radio>
            <Radio>Short Answer</Radio>
          </RadioGroup>

          {type === "MCQ" && (
            
            <View style={{  backgroundColor: '#526F8C',
                borderRadius: 10,
                marginVertical: 10,
                overflow: 'hidden',
                width: '90%',
                alignSelf: 'center' }}>
              <Text category="h5" style={{ marginBottom: 5 }}>
                Multiple Choice Options
              </Text>
              <Input
                placeholder="Option 1"
                value={option1}
                onChangeText={(value) => setOption1(value)}
                style={{ marginBottom: 5 }}
              />
              <Input
                placeholder="Option 2"
                value={option2}
                onChangeText={(value) => setOption2(value)}
                style={{ marginBottom: 5 }}
              />
              <Input
                placeholder="Option 3"
                value={option3}
                onChangeText={(value) => setOption3(value)}
                style={{ marginBottom: 5 }}
              />
              {/* work on tommorow*/}
              <Text category="h5" style={{ marginBottom: 5 }}>Select Correct Answer</Text>
                <Select
                  onSelect={index => {
                    setSelectedItem(index);
                    const options = [option1, option2, option3];
                    setCorrectAns(options[index.row]);
                    console.log('Selected correct answer:', options[index.row]);
                }}>
                    <SelectItem title='Option 1' index={option1}/>
                    <SelectItem title='Option 2' index={option2}/>
                    <SelectItem title='Option 3' index={option3}/>

                </Select>
            </View>
          )}
          <Input
            placeholder="Point value"
            value={pointVal}
            onChangeText={(value) => setPointVal(value)}
            keyboardType="numeric"
            style={{ marginBottom: 5 }}
          />
          <Input
            placeholder="Topic"
            value={topic}
            onChangeText={(value) => setTopic(value)}
            style={{ marginBottom: 5 }}
          />
          <Input
            placeholder="Language"
            value={language}
            onChangeText={(value) => setLanguage(value)}
            style={{ marginBottom: 5 }}
          />
          <Input
            placeholder="ImgFile"
            value={imgFile}
            onChangeText={(value) => setImgFile(value)}
            style={{ marginBottom: 5 }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text category="h5">Due Date *</Text>
          </View>
          <View>
            <Text category="p1">
              {" "}
              {`Selected date: ${dueDate.toLocaleDateString()}`}{" "}
            </Text>
            <Datepicker date={dueDate} onSelect={(date) => setDate(date)} />
          </View>
        </View>
        <Button onPress={handleCreateQuestion}> Submit Question</Button>
      </ScrollView>
    </Layout>
  );
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Question />
    </ApplicationProvider>
  </>
);
