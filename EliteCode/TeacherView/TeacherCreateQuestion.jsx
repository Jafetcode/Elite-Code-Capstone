import * as React from "react";
import { View, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
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
  const [imgFile, setImgFile] = React.useState("");
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");
  const [option3, setOption3] = React.useState("");
  const [correctAns, setCorrectAns] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [questionData, setQuestionData] = React.userState([]);


  const{user} = useAuth();
//   const handleGetQid = async () => {
//     try {
//         const response = await fetch(`https://elitecodecapstone24.onrender.com/questions`);
//         if (response.ok) {
//             alert("Question ID: " + data.qid);
//             const json = await response.json();
//             setQuestionData(json);
            
//         } else {
//             alert("Error:" + (data.error || "Failed to get question ID"));
//         }
//     } catch (error) {
//         alert("Network error: " + error.message);
//         console.log(error.message);
//     }
// };

// const handleCreateMCQ = async () => {
//   try {
//     handleGetQid();
//     console.log("Question ID: " + data.qid);

    
//       const response = await fetch(
//           "https://elitecodecapstone24.onrender.com/createMCQ/",
//           {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 qid: data.questionId, 
//                 opt1: option1,
//                 opt2: option2,
//                 opt3: option3,
//                 correctAns
//               }),
//           }
//       );
//       const data = await response.json();
//       if (response.ok) {
//           alert("MCQ Created!");
          
//           navigation.goBack();
//       } else {
//           alert("Error:" + (data.error || "Failed to create MCQ"));
//           alert(data.message)
//       }
//   } catch (error) {
//       alert("Network error: " + error.message);
//       console.log(error.message);
//       alert(data.message)
//   }
//   };
/////////////////////////////////////////////////////////////////////
//fix
const handleCreateQuestion = async () => {
    try {
      const response = await fetch(
        `https://elitecodecapstone24.onrender.com/createQuestion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            question,
            description,
            pointVal,
            imgFile,
            topic,
            type,
            dueDate: formattedDate,
            tid: user.uid,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(questionData.error || "Failed to create question");
    }
    if (type === "MCQ") {
      try {
        console.log("Question ID: " + data.qid);
          const mcqResponse = await fetch(
              "https://elitecodecapstone24.onrender.com/createMCQ/",
              {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    qid: data.qid, 
                    opt1: option1,
                    opt2: option2,
                    opt3: option3,
                    correctAns
                  }),
              }
          );
          const mcqData = await mcqResponse.json();
          if (mcqResponse.ok) {
              alert("MCQ Created!");
              console.log("Question ID: " + mcqData);
              navigation.goBack();
          } else {
              alert("Error:" + (data.error || "Failed to create MCQ"));
              alert(data.message)
          }
      } catch (error) {
          alert("Network error: " + error.message);
          console.log(error.message);
          alert(data.message)
      }
    };
      if (response.ok) {
        alert("Question Created!");
        alert(data.message)
        navigator.goBack()
      } else {
        alert("Error:" + (data.error  || "Failed to create question"));
      }
    } catch (error) {
      alert("Network error: " + error.message);
      console.log(error.message);
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
