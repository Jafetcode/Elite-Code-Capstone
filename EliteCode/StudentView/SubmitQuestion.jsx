import * as React from "react";
import { View, ScrollView, Image, StyleSheet, Platform } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
  SelectItem,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { EvaIconsPack } from "@ui-kitten/eva-icons";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function SubmitQuestion() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [imgFile, setImgFile] = React.useState(null);
  const [answer, setAnswer] = React.useState("");
  const [progress, setProgress] = React.useState("");
  const [submitted_on, setSubmitted_on] = React.useState(new Date());
  const [type, setType] = React.useState("shortAnswer");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [questionData, setQuestionData] = React.useState([]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImgFile(result.assets[0].uri);
    }
  };

  const fetchQuestionData = async () => {
    try {
      const res = await fetch(
        `https://elitecodecapstone24.onrender.com/student/questions?qid=${qid}`
      );
      const data = await res.json();
      setQuestionData(data.results);
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  
  const handleSubmit = async () => {
    setSubmitted_on(new Date().toISOString().slice(0, 19).replace("T", " "));
    const qid = user.qid;
    const sid = user.sid;
    const cid = user.cid;
    setProgress("submitted");

    try {
      const formData = new FormData();
      formData.append();

      formData.append("answer", answer);
      formData.append("progress", progress);
      formData.append("submitted_on", submitted_on);
      formData.append("qid", qid);
      formData.append("sid", sid);
      formData.append("cid", cid);

      if (imgFile) {
        const filename = imgFile.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const mimeType = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("imgFile", {
          uri: Platform.OS === "ios" ? imgFile.replace("file://", "") : imgFile,
          name: filename || "image.jpg",
          type: mimeType,
        });
      }
      const response = await fetch(
        "https://elitecodecapstone24.onrender.com/student/submitQuestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create question");
      }

      console.log("Response:", data);
      if (response.ok) {
        alert("Question submitted successfully!");
        navigation.navigate("StudentHome");
      } else {
        alert("Failed to submit question.");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Error submitting question.");
    }
  };
  const handleTypeChange = (selectedIndex) => {
    setType(selectedIndex === 0 ? "shortAnswer" : "imageAnswer");
    console.log("Selected type:", selectedIndex === 0 ? "shortAnswer" : "imageAnswer");
  }
  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        {/* TODO >>>>>>>>>> */}
      
        <Text >
          {questionData.question}
        </Text>
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



        <View style={styles.imageContainer}>
          <Text category="h6">Upload a file</Text>
          
              <Button onPress={pickImage}>
                Choose a image to upload
              </Button>
              {imgFile && <Image source={{ uri: imgFile }} style={styles.image} />}
            </View>

            <Input
              placeholder="Enter your answer here"
              multiline={true}
              value={answer}
              onChangeText={(nextValue) => setAnswer(nextValue)}
              style={styles.textInput}
              textStyle={{ minHeight: 64 }}
            />


          <Button 
            onPress={() => handleSubmit()} 
            style={styles.submitButton}
          >
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    alignItems: 'center',
    paddingBottom: 20,
  },
  radioGroup: {
    marginBottom: 20,
    width: '100%',
  },
  textInput: {
    width: '100%',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 225,
    marginTop: 10,
    resizeMode: 'contain',
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
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
