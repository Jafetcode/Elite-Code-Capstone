import * as React from "react";
import { View, ScrollView, Image, StyleSheet, Platform } from "react-native";
import { useNavigation, useFocusEffect, useRoute} from "@react-navigation/native";
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



function StudentQuestionDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { qid } = route.params;



const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const fetchQuestionData = async () => {
    try {
      const res = await fetch(
        `https://elitecodecapstone24.onrender.com/student/questions?cid=${cid}&qid=${qid}`
      );
      const data = await res.json();
      setQuestionData(data.results);
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  React.useEffect(() => {
    fetchQuestionData();
  }, [qid]);


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Question Details</Text>
        <Button
          style={styles.button}
          accessoryLeft={BackIcon}
          onPress={() => navigation.goBack()}
        >
          Back
        </Button>
      </View>
        <View style={styles.container}>
            {questionData.map((question, index) => (
            <Card key={index}>
                <Text category="h6">{question.question}</Text>
                
                {question.imgFile && (
                <Image
                    source={{ uri: question.imgFile }}
                    style={{ width: 200, height: 200 }}
                />
                )}
                <Text category="s1">Type: {question.type}</Text>
                <Text category="s1">Submitted On: {question.submitted_on}</Text>
            </Card>

            ))}
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default () => (
    <StudentQuestionDetails />
);