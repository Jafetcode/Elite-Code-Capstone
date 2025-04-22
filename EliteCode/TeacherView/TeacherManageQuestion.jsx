import * as React from "react";
import { View, Image, ScrollView, StyleSheet, Alert } from "react-native";
import {

    Layout,
    Button,
    Text,
    Icon,
    Select,
    Input,
    Radio,
    RadioGroup,
    Datepicker,
    SelectItem } from "@ui-kitten/components";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />

function TeacherManageQuestion() {
    const navigation = useNavigation();
    const route = useRoute();
     const [description, setDescription] = React.useState("");
      const [type, setType] = React.useState("MCQ");
      const [dueDate, setDate] = React.useState(new Date());
      const [question, setQuestion] = React.useState("");
      const [pointVal, setPointVal] = React.useState("");
      const [topic, setTopic] = React.useState("");
      const [imgFile, setImgFile] = React.useState(null);
      const formattedDate = dueDate.toISOString().slice(0, 19).replace('T', ' ');
      const [option1, setOption1] = React.useState("");
const [option2, setOption2] = React.useState("");
const [option3, setOption3] = React.useState("");
const [correctAns, setCorrectAns] = React.useState("");
      const [selectedIndex, setSelectedIndex] = React.useState(0);

    const { qid } = route.params;
    const { cid } = route.params || {};

    const getQuestionData = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/getQuestion/?qid=${qid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            const data = await res.json();
            
            if (!data?.results?.[0]) {
                throw new Error("No question data found");
            }

            const q = data.results[0];
            q.question && setQuestion(q.question);
            q.description && setDescription(q.description);
            q.type && setType(q.type);
            q.dueDate && setDate(new Date(q.dueDate));
            q.pointVal && setPointVal(String(q.pointVal));
            q.topic && setTopic(q.topic);
            q.imgFile && setImgFile(q.imgFile);
            q.opt1 && setOption1(q.opt1);
            q.opt2 && setOption2(q.opt2);
            q.opt3 && setOption3(q.opt3);
            q.correctAns && setCorrectAns(q.correctAns);

        } catch (error) {
            console.error("Error:", error.message);
            Alert.alert("Error", "Failed to load question data");
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (qid) {
                getQuestionData();
            }
        }, [qid])
    );
    

    const handleUpdate = async () => {
      try {
          const formData = new FormData();
          
          // Add all required fields to FormData
          formData.append("question", question);
          formData.append("description", description);
          formData.append("type", type);
          formData.append("dueDate", formattedDate);
          formData.append("pointVal", pointVal);
          formData.append("topic", topic);

          if (imgFile) {
              if (typeof imgFile === 'string' && imgFile.startsWith('data:image')) {
                  formData.append("imgFile", imgFile);
              } 
      
              else if (imgFile.uri) {
                  formData.append("imgFile", {
                      uri: Platform.OS === 'ios' ? imgFile.uri.replace('file://', '') : imgFile.uri,
                      type: 'image/jpeg',
                      name: 'image.jpg'
                  });
              }
          }
  
          if (type === "MCQ") {
              formData.append("opt1", option1);
              formData.append("opt2", option2);
              formData.append("opt3", option3);
              formData.append("correctAns", correctAns);
          }
  
          const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/updateQuestion/${qid}`, {
              method: "PUT",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
              },
              body: formData,
          });
  
          if (res.ok) {
              Alert.alert("Success", "Question updated successfully!");
              navigation.goBack();
          } else {
              const errorData = await res.json();
              Alert.alert("Error", errorData.message || "Failed to update question");
          }
      } catch (err) {
          console.error("Update error:", err);
          Alert.alert("Error", "Failed to connect to the server");
      }
  };
    const handleDelete = async () => {
        Alert.alert(
            "Course will be deleted",
            `Are you sure you want to delete ${question}?`,
            [
                {text: "Cancel", style: "cancel"},
                {
                 text: "Delete", style: "destructive",
                 onPress: async () => {
                    try {
                        const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/question/${qid}}`, {
                            method: "DELETE",
                        });
                        if (res.ok) {
                            Alert.alert("Deleted", "Question deleted successfully!");
                            navigation.goBack();
                        } else {
                            Alert.alert("Error", "Failed to delete question.");
                        }
                    } catch (err) {
                        console.error(err);
                        Alert.alert("Error", "Something went wrong.");
                    }
                 },
                },
            ]

        );
    }
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                // mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                // aspect: [1, 1],
                // quality: 0.5
                presentationStyle: 'fullScreen',
                selectionLimit: 1,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
                base64: true,
            });

            if (!result.canceled) {
              const imageUri = result.assets[0].uri;

              const base64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
              });
              setImgFile(`data:image/jpeg;base64,${base64}`);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to select image");
        }
    };
    const handleTypeChange = (selectedIndex) => {
        setType(selectedIndex === 0 ? "MCQ" : "ShortAns");
        console.log("Selected type:", selectedIndex === 0 ? "MCQ" : "ShortAns");
      };
    return (
        <Layout style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }} on>
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
                  Edit question
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
                    placeholder={question || "Enter question"}
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
                    placeholder={description || "Type Description Here"}
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
                      {/* <Text category="h5" style={{ marginBottom: 5 }}>Select Correct Answer</Text>
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
                        </Select> */}
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
                  {/* <Text category="p1"> {`Selected image: ${imgFile}`} </Text> */}
        
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
                <Button onPress={handleUpdate}> Update Question</Button>
                <Button
                    style={styles.buttonContainer}
                    status="danger"
                    onPress={handleDelete}
                >
                    Delete Question
                </Button>
              </ScrollView>
              
            </Layout>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10,
    },
    select: {
        marginVertical: 8,
        width: '100%',
    },
    mcqContainer: {
        backgroundColor: '#526F8C',
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
        width: '90%',
        alignSelf: 'center',
        padding: 10,
    },
    heading: {
        marginBottom: 5,
    },
    input: {
        marginBottom: 5,
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 20,
    }
  });

  export default TeacherManageQuestion;