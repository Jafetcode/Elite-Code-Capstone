import * as React from "react";
import { View, ScrollView, Image, StyleSheet, Platform } from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";

import * as DocumentPicker from "expo-document-picker";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Button,
  Text,
  Icon,
  Input,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import mime from 'mime';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function SubmitQuestion() {
  const navigation = useNavigation();
  const [file, setFile] = React.useState(null);
  const [answer, setAnswer] = React.useState("");
  const [progress, setProgress] = React.useState("inprogress");
  const [submitted_on, setSubmitted_on] = React.useState(new Date());
  const [questionData, setQuestionData] = React.useState(null);
  const [correctAns, setQuestionAnswer] = React.useState('');
  const route = useRoute();
  const { user } = useAuth() || {};
  const [studentGrade, setGrade] = React.useState(0);
  const { cid, qid, type, item} = route.params || {};

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.type === "success") {
        const selectedFile = result.files[0] || result;
        const fileData = {
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: mime.getType(selectedFile.uri) || "application/octet-stream",
        };
        setFile(fileData);
      } else {
        console.log("Document selection cancelled or failed.");
      }
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };
  const fetchQuestionData = async () => {
    try {
      const res = await fetch(
        `https://elitecodecapstone24.onrender.com/student/questions?cid=${cid}&qid=${qid}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok" + res.statusText);
      }

      const data = await res.json();
      const question = data.results.find(q => q.qid === qid);
      setQuestionData(question);
      setQuestionAnswer(question.correctAns)
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (cid && qid){
        fetchQuestionData();
      }
    }, [cid, qid])
  );
  React.useEffect(() => {
    console.log('Current type:', type);
    console.log('Question Data:', {
      question: questionData,
    });
}, [type, questionData]);

  const handleSubmit = async () => {
    if (progress === "submitted") {
      alert("This question has already been submitted!");
      console.log(answer)
      return;
    }
    setSubmitted_on(new Date().toISOString().slice(0, 19).replace("T", " "));
    currentDate = new Date().toISOString().slice(0, 19).replace("T", " ")
    try {
      const formData = new FormData();
      const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
      // const calculatedGrade = type === "MCQ" && correctAns === answer ? questionData?.pointVal : 0;

      console.log('Submitting answer:', answer);
      console.log('Correct answer:', correctAns);
      console.log('Question type:', type);

      formData.append("qid", qid);
      formData.append("sid", user.userID);
      formData.append("answer", answer.toString());
      formData.append("type", type);
      formData.append("progress", "submitted");
      formData.append("submitted_on", currentDate);
      formData.append("pointVal", item.pointVal)
      // formData.append("grade", calculatedGrade);
      if (file) {
        formData.append("file", {
          uri: file.uri,
          name: file.name,
          type: file.type,
        });
      }
   
      const response = await fetch("https://elitecodecapstone24.onrender.com/student/submitQuestion", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create question");
      } 

      console.log("Response:", data);
      if (response.ok) {
        setProgress("submitted");
        setGrade(calculatedGrade); 
        alert("Question submitted successfully!");
        navigation.navigate("StudentHome");
    
      } else {
        setProgress("inprogress")
        alert("Failed to submit question.");
      }
    } catch (error) {
      alert(error)
      console.error("Error submitting question:", error);
    }
  };
  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Button
          appearance="ghost"
          status="basic"
          accessoryLeft={BackIcon}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text category="h3" style={styles.title}>
          Submit Question
        </Text>
      </View>


      <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
          
        {type === "ShortAns" && (
          <View style={styles.imageContainer}>
            <Text category="h6"> {questionData?.question } {item?.question}</Text>
            <Text category="h3">{questionData?.description}{item?.description}</Text>
            {(questionData?.imgFile || item?.imgFile) && (
      <Image 
        source={{ 
          uri: questionData?.imgFile || item?.imgFile,
          cache: 'reload'
        }} 
        style={styles.image} 
        resizeMode="contain"
      />
    )}

            <Text style={styles.uploadFileText} category="h6">
              Upload a file?
            </Text>
            <Button onPress={pickFile}>Choose an file to upload</Button>
            {file && (
               <View style={styles.filePreview}>
               <Text>Selected file: {file.name}</Text>
               {file.type.startsWith('image/') && (
                 <Image 
                   source={{ uri: file.uri }} 
                   style={styles.previewImage}
                 />
               )}
             </View>
            )}
            <Input
              placeholder="Enter your answer here"
              multiline={true}
              value={answer}
              onChangeText={(nextValue) => setAnswer(nextValue)}
              style={styles.textInput}
              textStyle={{ minHeight: 64 }}
              maxLength={250}
            />
          </View>
        )}

{type === "MCQ" && (
  <View style={styles.imageContainer}>
    <Text category="h6">{questionData?.question || item?.question}</Text>
    <Text category="h3">{questionData?.description || item?.description}</Text>
    
    <View style={styles.radioGroup}>
      <Text category="h6">Select your answer:</Text>
      <RadioGroup
  selectedIndex={[
    questionData?.opt1 || item?.opt1,
    questionData?.opt2 || item?.opt2,
    questionData?.opt3 || item?.opt3
  ].indexOf(answer)}
  onChange={(index) => {
    const options = [
      questionData?.opt1 || item?.opt1,
      questionData?.opt2 || item?.opt2,
      questionData?.opt3 || item?.opt3
    ];
    const selectedAnswer = options[index];
    setAnswer(selectedAnswer);
    console.log('Selected answer:', selectedAnswer, 'index:', index);
  }}
>
  <Radio>{questionData?.opt1 || item?.opt1}</Radio>
  <Radio>{questionData?.opt2 || item?.opt2}</Radio>
  <Radio>{questionData?.opt3 || item?.opt3}</Radio>
</RadioGroup>
    </View>
  </View>
)}
        <Button onPress={() => handleSubmit()} style={styles.submitButton}>
          Submit Question
        </Button>
      </View>
    </ScrollView>
    </Layout>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingBottom: 20,
  },
  radioGroup: {
    marginBottom: 20,
    width: "100%",
  },
  textInput: {
    width: "100%",
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 225,
    marginTop: 10,
    resizeMode: "contain",
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
  },
  uploadFileText: {
    marginBottom: 20,
  },
});

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SubmitQuestion />
    </ApplicationProvider>
  </>
);
