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
      const [selectedIndex, setSelectedIndex] = React.useState(0);

    const { qid } = route.params;
    const { cid } = route.params || {};
    const handleUpdate = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/updateQuestion/${cid}/${qid} `, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question,
                    description,
                    type,
                    dueDate: formattedDate,
                    pointVal,
                    topic,
                    imgFile,
                }),
            });

            if (res.ok) {
                Alert.alert("Success", "Course edited!");
                navigation.goBack();
            } else {
                Alert.alert("Error", "Failed to edit question.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error");
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
                            Alert.alert("Deleted", "Course deleted successfully!");
                            navigation.goBack();
                        } else {
                            Alert.alert("Error", "Failed to delete course.");
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
        
                  {/* {type === "MCQ" && (
                    
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
                      /> */}
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
                    {/* </View> */}
                  {/* )} */}
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