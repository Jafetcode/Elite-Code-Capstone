import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, FlatList, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { CheckBox, Button, Card, Text } from "@ui-kitten/components";
import { useAuth } from "../AuthContext";
    
const Assigning = () => {
    const route = useRoute();
    const { user } = useAuth();
    const { question} = route.params?.q;
    const assignTo = route.params?.assignTo
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        fetchCoursesAndStudents();
    }, []);

    const fetchCoursesAndStudents = async () => {
        try {
            console.log(user.UserID)
            // Fetch courses the teacher teaches
            let res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/courses?tid=${user.userID}`);
            const data = await res.json();
            setCourses(data.results);
            console.log("courses", courses)

            // Fetch students the teacher can assign
            let studentRes = await fetch(`https://elitecodecapstone24.onrender.com/instructor/students?tid=${user.userID}`);
            const studentData = await studentRes.json();
            setStudents(studentData.results);
            console.log("students", students)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const toggleSelection = (id, type) => {
        if (type === "course") {
            setSelectedCourses(prev =>
                prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
            );
        } else {
            setSelectedStudents(prev =>
                prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
            );
        }
    };

    const assignQuestion = async () => {
        if (selectedCourses.length === 0 && selectedStudents.length === 0) {
            Alert.alert("Select at least one course or student");
            return;
        }
    
        try {
            let res = await fetch("https://elitecodecapstone24.onrender.com/instructor/assignQuestion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    qid : question.qid, 
                    courses: selectedCourses,
                    students: selectedStudents,
                    viewable: 1  
                })
            });
            let data = await res.json();
            Alert.alert("Success", "Question assigned successfully!");
        } catch (error) {
            console.error("Error assigning question:", error);
        }
    };
    

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 10 }}>Assign Question</Text>
            
            <Card style={{ marginBottom: 15 }}>
                <Text category="s1">Assign to Courses:</Text>
                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.cid.toString()}
                    renderItem={({ item }) => (
                        <CheckBox
                            checked={selectedCourses.includes(item.cid)}
                            onChange={() => toggleSelection(item.cid, "course")}
                        >
                            {item.courseName}
                        </CheckBox>
                    )}
                />
            </Card>

            <Card>
                <Text category="s1">Assign to Specific Students:</Text>
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.sid.toString()}
                    renderItem={({ item }) => (
                        <CheckBox
                            checked={selectedStudents.includes(item.sid)}
                            onChange={() => toggleSelection(item.sid, "student")}
                        >
                            {item.fname} {item.lname}
                        </CheckBox>
                    )}
                />
            </Card>

            <Button onPress={assignQuestion} style={{ marginTop: 20 }}>Assign Question</Button>
        </View>
    );
};

export default Assigning;
