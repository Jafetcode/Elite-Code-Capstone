import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Layout, Icon, Button, Card, Text, CheckBox, List, ListItem, Divider } from "@ui-kitten/components";
import { useAuth } from "../AuthContext";
import { QueryEndAtConstraint } from "firebase/firestore";

const Assigning = () => {
    const route = useRoute();
    const { user } = useAuth();
    const { question } = route.params;
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState({});
    const [expandedClasses, setExpandedClasses] = useState({});
    const [selectedStudents, setSelectedStudents] = useState({});

    // Fetch courses and current assignments
    const fetchCoursesAndAssignments = async () => {
        try {
            // Fetch courses the teacher teaches
            let res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/${user.userID}/courses`);
            const courses = await res.json();
            console.log("courses.results: ", courses)
            setClasses(courses);
            // fetch existing assignments for this question
            let assignmentRes = await fetch(`https://elitecodecapstone24.onrender.com/instructor/assignments?qid=${question.qid}`);
            const assignmentData = await assignmentRes.json();
            // Set the existing assignments into selectedClasses and selectedStudents
            console.log("assignmentData: ", assignmentData)
            console.log("assignmentData: ", assignmentData)
            const classAssignments = assignmentData.classes || [];
            const studentAssignments = assignmentData.students || [];

            const classSelection = {};
            classAssignments.forEach(c => classSelection[c.cid] = true);
            setSelectedClasses(classSelection);

            const studentSelection = {};
            studentAssignments.forEach(s => studentSelection[s.sid] = true);
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
            const newSelection = { ...prev };
            newSelection[classId] = !prev[classId];

            if (newSelection[classId]) {
                const classStudents = classes.find(c => c.cid === classId).students;
                const allSelected = classStudents.every(student => selectedStudents[student.userID] || false);
                if (allSelected) {
                    setSelectedStudents(prevStudents => {
                        const newStudentSelection = { ...prevStudents };
                        classStudents.forEach(student => {
                            newStudentSelection[student.userID] = true;
                        });
                        return newStudentSelection;
                    });
                }
            }
            return newSelection;
        });
    };


    const toggleStudentSelection = (studentId, classId) => {
        setSelectedStudents(prev => {
            const newSelection = { ...prev };
            newSelection[studentId] = !prev[studentId];

            if (newSelection[studentId]) {
                setSelectedClasses(prevClasses => ({
                    ...prevClasses,
                    [classId]: false
                }));
            }

            const classStudents = classes.find(c => c.cid === classId).students;
            const allSelected = selectedStudents?.students?.every(student => newSelection[student.userID] || false) ?? false;
            // const allSelected = classStudents.every(student => newSelection[student.userID] || false);
            if (allSelected) {
                setSelectedClasses(prevClasses => ({
                    ...prevClasses,
                    [classId]: true
                }));
            }

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

    // Get all selected items for submission
    const getSelectedItems = () => {
        const selectedItems = {
            classes: Object.keys(selectedClasses).filter(classId => selectedClasses[classId]),
            students: Object.keys(selectedStudents).filter(studentId => selectedStudents[studentId])
        };
        return selectedItems;
    };

    const renderToggleIcon = (props, isExpanded) => (
        <Icon {...props} name={isExpanded ? 'arrow-up-outline' : 'arrow-down-outline'} />
    );

    // Handle assignment save
    const handleSave = async () => {
        const selectedItems = getSelectedItems();
        try {
            const response = await fetch('https://elitecodecapstone24.onrender.com/instructor/updateAssignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    qid: question.qid,
                    courses: selectedClasses,
                    students: selectedStudents,
                    tid: user.userID
                })
            });

            const result = await response.json();
            if (result.message === "Assignments updated successfully") {
                alert("Assignments updated!");
            } else {
                alert("Failed to update assignments.");
            }
        } catch (error) {
            console.error("Error saving assignments:", error);
        }
    };

    // Render student item
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
            >
                Save Changes
            </Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        marginBottom: 8,
    },
    subHeading: {
        marginBottom: 16,
    },
    classesContainer: {
        flex: 1,
    },
    classCard: {
        marginBottom: 16,
    },
    classHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkbox: {
        marginRight: 8,
    },
    className: {
        flex: 1,
        fontSize: 12
    },
    expandButton: {
        marginLeft: 8,
    },
    studentsContainer: {
        marginTop: 8,
    },
    assignButton: {
        marginTop: 16,
    },
});

export default Assigning;