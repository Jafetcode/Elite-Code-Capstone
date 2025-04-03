import * as React from "react";
import { View, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import * as ImagePicker from "expo-image-picker";
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
  SelectItem

} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TeacherCreateQuestion() {
  const navigation = useNavigation();
  const [description, setDescription] = React.useState("");
  const [type, setType] = React.useState("MCQ");
  const [dueDate, setDate] = React.useState(new Date());
  const [question, setQuestion] = React.useState("");
  const [pointVal, setPointVal] = React.useState("");
  const [topic, setTopic] = React.useState("");
  // const [] = React.useState(null);
  const [imgFile, setImgFile] = React.useState(null);
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");
  const [option3, setOption3] = React.useState("");
  const [correctAns, setCorrectAns] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [questionData, setQuestionData] = React.useState([]);
  const formattedDate = dueDate.toISOString().slice(0, 19).replace('T', ' ');

  const{user} = useAuth();

const pickImage = async () => {
const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    setImgFile(result.assets[0].uri);
  }
};


const handleCreateQuestion = async () => {
  try {

    const formData = new FormData();


    formData.append('question', question);
    formData.append('description', description);
    formData.append('pointVal', pointVal);
    formData.append('topic', topic);
    formData.append('type', type);
    formData.append('dueDate', formattedDate);
    formData.append('tid', user.userID);

    if (imgFile) {
      const filename = imgFile.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const mimeType = match ? `image/${match[1]}` : 'image/jpeg';
  
      formData.append('imgFile', {
        uri: Platform.OS === 'ios' ? imgFile.replace('file://', '') : imgFile,
        name: filename || 'image.jpg',
        type: mimeType
      });
    }

    const response = await fetch(
      'https://elitecodecapstone24.onrender.com/createQuestion',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create question');
    }

    console.log("Question created successfully. Response data:", data);

    if (type === "MCQ") {
      try {
        console.log("Creating MCQ with the following details:");
        console.log("Question ID (qid):", data.qid);
        console.log("Option 1:", option1);
        console.log("Option 2:", option2);
        console.log("Option 3:", option3);
        console.log("Correct Answer:", correctAns);

        const mcqResponse = await fetch(
          "https://elitecodecapstone24.onrender.com/createMCQ/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              qid: data.qid,
              opt1: option1,
              opt2: option2,
              opt3: option3,
              correctAns,
            }),
          }
        );

        const mcqData = await mcqResponse.json();
        if (mcqResponse.ok) {
          console.log("MCQ created successfully. Response data:", mcqData);
          alert("MCQ Created!");
          navigation.goBack();
        } else {
          console.log("MCQ Response Status:", mcqResponse.status);
          console.log("MCQ Response Data:", mcqData);
          alert("Error:" + (mcqData.error || "Failed to create MCQ"));
        }
      } catch (error) {
        console.error("Error creating MCQ:", error.message);
        alert("Network error: " + error.message);
      }
    }

    if (response.ok) {
      alert("Question Created!");
      navigation.goBack();
    } else {
      alert("Error:" + (data.error || "Failed to create question"));
    }
  } catch (error) {
    console.error("Error creating question:", error.message);
    alert("Network error: " + error.message);
  }
};
  

    
  const handleTypeChange = (selectedIndex) => {
    setType(selectedIndex === 0 ? "MCQ" : "ShortAns");
    console.log("Selected type:", selectedIndex === 0 ? "MCQ" : "ShortAns");
  };

  return (
    <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Button
          appearance="ghost"
          status="basic"
          accessoryLeft={BackIcon}
          onPress={() => navigation.goBack()}
        />
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
            }}
          >
            <Text category="h5">Question *</Text>
          </View>

          <Input
            placeholder="Enter question"
            value={question}
            onChangeText={(question) => setQuestion(question)}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
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
                 selectedIndex={selectedIndex}
                 value={correctAns}
                 onSelect={(index) => {
                     const options = [option1, option2, option3];
                     setSelectedIndex(index);
                     setCorrectAns(options[index.row]);
                     console.log('Selected index:', index.row);
                     console.log('Selected correct answer:', options[index.row]);
                 }}
                 style={{ marginBottom: 5 }}
             >
                 <SelectItem title={option1 || 'Option 1'} />
                 <SelectItem title={option2 || 'Option 2'} />
                 <SelectItem title={option3 || 'Option 3'} />
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
          {/* <Button onPress={() => {
                        console.log('Add Image');
                    }}>
                        Add Image
                    </Button> */}
          {/* <Input
            placeholder="ImgFile"
            value={imgFile}
            onChangeText={(value) => setImgFile(value)}
            style={{ marginBottom: 5 }}
          /> */}
           <Button title="Pick an image from camera roll" onPress={pickImage}>Choose a image to upload</Button>
           {imgFile && <Image source={{ uri: imgFile }} style={styles.image} />}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text category="h5">Image</Text>
          </View>
          <Text category="p1"> {`Selected image: ${imgFile}`} </Text>

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
              {`Selected date: ${dueDate.toLocaleDateString()}`}
              {" "}
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
      <TeacherCreateQuestion />
    </ApplicationProvider>
  </>
);
