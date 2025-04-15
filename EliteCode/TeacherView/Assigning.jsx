import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Layout, Icon, Button, Card, Text, CheckBox, List, ListItem, Divider } from "@ui-kitten/components";
import { useAuth } from "../AuthContext";
import { QueryEndAtConstraint } from "firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";

const Assigning = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { user } = useAuth();
    const { question } = route.params;
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState({});
    const [expandedClasses, setExpandedClasses] = useState({});
    const [selectedStudents, setSelectedStudents] = useState({});

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCoursesAndAssignments = async () => {
        try {
            let res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/${user.userID}/courses`);
            const courses = await res.json();
            console.log("courses.results: ", courses)
            setClasses(courses);
            // fetch existing assignments for this question
            let assignmentRes = await fetch(`https://elitecodecapstone24.onrender.com/instructor/assignments?qid=${question.qid}`);
            const assignmentData = await assignmentRes.json();
            // Set the existing assignments into selectedClasses and selectedStudents
            console.log("assignmentData2: ", assignmentData)
            const classAssignments = assignmentData.classes || [];
            const studentAssignments = assignmentData.students || [];

            const classSelection = {};
            classAssignments.forEach(c => classSelection[c.cid] = true);

            const studentSelection = {};
            studentAssignments.forEach(s => studentSelection[s.sid] = true);

            // for (const classItem of courses) {
            //     const allStudentsAssigned =
            //         classItem.students.length > 0 &&
            //         classItem.students.every(student => studentSelection[student.userID]);

            //     if (allStudentsAssigned) {
            //         classSelection[classItem.cid] = true;
            //         // Remove individual students to avoid duplicates
            //         classItem.students.forEach(student => {
            //             delete studentSelection[student.userID];
            //         });
            //     }
            // }

            setSelectedClasses(classSelection);
            setSelectedStudents(studentSelection);

        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCoursesAndAssignments();
    }, []);


    const toggleClassSelection = (classId) => {
        setSelectedClasses(prev => {
            const newClassSelection = { ...prev, [classId]: !prev[classId] };

            const classStudents = classes.find(c => c.cid === classId)?.students || [];

            setSelectedStudents(prevStudents => {
                const newStudentSelection = { ...prevStudents };
                classStudents.forEach(student => {
                    newStudentSelection[student.userID] = newClassSelection[classId]; 
                });
                return newStudentSelection;
            });

            return newClassSelection;
        });
    };


    const toggleStudentSelection = (studentId, classId) => {
        setSelectedStudents(prev => {
            const newSelection = { ...prev };
            newSelection[studentId] = !prev[studentId];

            // Uncheck the class if it was selected
            setSelectedClasses(prevClasses => ({
                ...prevClasses,
                [classId]: false
            }));

            return newSelection;
        });
    };


    // Toggle class expansion (show/hide students)
    const toggleClassExpansion = (classId) => {
        setExpandedClasses(prev => ({
            ...prev,
            [classId]: !prev[classId]
        }));
    };

    const getSelectedItems = () => {
        const selectedStudentsCopy = { ...selectedStudents }; // clone to safely modify
        const finalSelectedClasses = new Set();

        classes.forEach(classItem => {
            const students = classItem.students;
            const allSelected = students.length > 0 && students.every(
                s => selectedStudentsCopy[s.userID]
            );

            if (allSelected) {
                finalSelectedClasses.add(classItem.cid);
                // Remove these students so we don't double assign
                students.forEach(s => delete selectedStudentsCopy[s.userID]);
            }
        });

        const finalSelectedStudents = Object.keys(selectedStudentsCopy).filter(sid => selectedStudentsCopy[sid]);

        return {
            classes: Array.from(finalSelectedClasses),
            students: finalSelectedStudents,
        };
    };


    const renderToggleIcon = (props, isExpanded) => (
        <Icon {...props} name={isExpanded ? 'arrow-up-outline' : 'arrow-down-outline'} />
    );


    const handleSave = async () => {
        const selectedItems = getSelectedItems();
        setLoading(true);

        if (selectedItems.classes.length === 0 && selectedItems.students.length === 0) {
            setMessage("No selections made — not updating.");
            setTimeout(() => {
                setMessage('');
                navigation.goBack();
            }, 2000);
        }

        try {
            const response = await fetch('https://elitecodecapstone24.onrender.com/instructor/updateAssignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    qid: question.qid,
                    courses: selectedItems.classes,
                    students: selectedItems.students,
                    tid: user.userID
                })
            });

            const text = await response.text(); //  First, read as text
            let result;
            try {
                result = JSON.parse(text); //  Then, try parsing JSON manually
            } catch (parseErr) {
                console.error("Failed to parse JSON:", parseErr);
                console.log("Raw response text:", text); // This will show you what the server actually sent back
                setMessage("Server error: invalid response");
                return;
            }

            if (result.message === "Question assigned successfully") {
                setMessage(" Assignments updated!");
                setTimeout(() => {
                    setMessage('');
                    navigation.goBack();
                }, 2000);
            } else {
                console.log(result.message);
                setMessage("Failed to update assignments.");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setMessage("Error saving assignments.");
        } finally {
            setLoading(false);
        }
    };

    const renderStudentItem = (student, classId) => (
        <ListItem
            key={student.userID}
            title={`${student.fname} ${student.lname}`}
            accessoryLeft={(props) => (
                <CheckBox
                    {...props}
                    checked={selectedStudents[student.userID] || false}
                    onChange={() => toggleStudentSelection(student.userID, classId)}
                />
            )}
        />
    );

    return (
        <Layout style={styles.container}>
            <Text category='h4' style={styles.heading}>Assign Question</Text>
            <Text category='s1' appearance='hint' style={styles.subHeading}>
                Select classes or specific students
            </Text>
            {message !== '' && (
                <Text style={{ textAlign: 'center', color: message.includes("") ? 'green' : 'red', marginVertical: 10 }}>
                    {message}
                </Text>
            )}
            <ScrollView style={styles.classesContainer}>
                {classes.map(classItem => (
                    <Card
                        key={classItem.cid}
                        style={styles.classCard}
                        disabled={false}
                    >
                        <View style={styles.classHeader}>
                            <CheckBox
                                checked={selectedClasses[classItem.cid] || false}
                                onChange={() => toggleClassSelection(classItem.cid)}
                                style={styles.checkbox}
                            />
                            <Text category='h6' style={styles.className}>
                                {classItem.courseName}
                            </Text>
                            <Button
                                appearance='ghost'
                                accessoryLeft={(props) => renderToggleIcon(props, expandedClasses[classItem.cid])}
                                onPress={() => toggleClassExpansion(classItem.cid)}
                                style={styles.expandButton}
                            >
                                {expandedClasses[classItem.cid] ? 'Hide Students' : 'Select Students'}
                            </Button>
                        </View>

                        {expandedClasses[classItem.cid] && (
                            <View style={styles.studentsContainer}>
                                <Divider />
                                {classItem.students.map((student, index) => (
                                    <View key={student.userID || index}>
                                        {renderStudentItem(student, classItem.cid)}
                                        {index < classItem.students.length - 1 && <Divider />}
                                    </View>
                                ))}
                            </View>
                        )}
                    </Card>
                ))}
            </ScrollView>

            <Button
                style={styles.assignButton}
                onPress={handleSave}
                size='large'
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Changes"}
            </Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: { marginBottom: 8,},
    subHeading: { marginBottom: 16,},
    classesContainer: { flex: 1, },
    classCard: { marginBottom: 16,},
    classHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkbox: {  marginRight: 8, },
    className: {
        flex: 1,
        fontSize: 12
    },
    expandButton: { marginLeft: 8, },
    studentsContainer: { marginTop: 8, },
    assignButton: { marginTop: 16, },
});

export default Assigning;