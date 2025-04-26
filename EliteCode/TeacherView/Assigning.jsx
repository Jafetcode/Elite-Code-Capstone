import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Layout, Icon, Button, Text, CheckBox, ListItem, Divider } from "@ui-kitten/components";
import { useAuth } from "../AuthContext";
import { useRoute, useNavigation } from "@react-navigation/native";

const Assigning = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { user } = useAuth();
    const { question } = route.params;
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState({});
    const [selectedStudents, setSelectedStudents] = useState({});
    const [expandedClasses, setExpandedClasses] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCoursesAndAssignments();
    }, [question]);

    const fetchCoursesAndAssignments = async () => {
        try {
            const res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/${user.userID}/courses`);
            const courses = await res.json();
            console.log("course, ", courses)
            setClasses(courses);
            const assignmentRes = await fetch(`https://elitecodecapstone24.onrender.com/instructor/assignments?qid=${question.qid}`);
            const assignmentData = await assignmentRes.json();
            const classSelection = {};
            assignmentData.classes?.forEach(c => classSelection[c.cid] = true);
            const studentSelection = {};
            assignmentData.students?.forEach(s => studentSelection[s.sid] = true);
            setSelectedClasses(classSelection);
            setSelectedStudents(studentSelection);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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
            const newSelection = { ...prev, [studentId]: !prev[studentId] };
            if (!newSelection[studentId]) {
                setSelectedClasses(prevClasses => ({
                    ...prevClasses,
                    [classId]: false
                }));
            }
            return newSelection;
        });
    };

    const toggleClassExpansion = (classId) => {
        setExpandedClasses(prev => ({
            ...prev,
            [classId]: !prev[classId]
        }));
    };

    const getSelectedItems = () => {
        const selectedClassIds = Object.keys(selectedClasses).filter(id => selectedClasses[id]);
        const selectedStudentIds = Object.keys(selectedStudents).filter(id => selectedStudents[id]);
        return {
            classes: selectedClassIds,
            students: selectedStudentIds,
        };
    };

    const handleSave = async () => {
        const selectedItems = getSelectedItems();
        setLoading(true);

        if (selectedItems.classes.length === 0 && selectedItems.students.length === 0) {
            setMessage("No selections made — not updating.");
            setTimeout(() => {
                setMessage('');
                navigation.goBack();
            }, 2000);
            return;
        }

        try {
            console.log("Sending update:", {
                qid: question.qid,
                courses: selectedItems.classes,
                students: selectedItems.students,
                tid: user.userID
              });
            const response = await fetch('https://elitecodecapstone24.onrender.com/instructor/updateAssignments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    qid: question.qid,
                    courses: selectedItems.classes,
                    students: selectedItems.students,
                    tid: user.userID
                })
            });

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (parseErr) {
                console.error("Failed to parse response:", parseErr, "\nRaw text:", text);
                setMessage("Server error: invalid response");
                return;
            }
            if (result.message === "Question assigned successfully.") {
                setMessage("Assignments updated!");
                setTimeout(() => {
                    setMessage('');
                    navigation.goBack();
                }, 2000);
            } else if (result.message === "No changes made") {
                setMessage("No changes made.");
            } else {
                console.log(result.message)
                setMessage("Error: Failed to update assignments.");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setMessage("Error: saving assignments.");
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

    const renderClassItem = (classItem) => {
        const isExpanded = expandedClasses[classItem.cid] || false;

        return (
            <View key={classItem.cid}>
                <ListItem
                    title={`${classItem.courseName}`}
                    accessoryLeft={(props) => (
                        <CheckBox
                            {...props}
                            checked={selectedClasses[classItem.cid] || false}
                            onChange={() => toggleClassSelection(classItem.cid)}
                        />
                    )}
                    accessoryRight={(props) => (
                        <TouchableOpacity onPress={() => toggleClassExpansion(classItem.cid)}>
                            <Icon {...props} name={isExpanded ? 'arrow-up-outline' : 'arrow-down-outline'} />
                        </TouchableOpacity>
                    )}/>
                {isExpanded && (
                    <View style={{ paddingLeft: 32 }}>
                        {classItem.students?.filter(s => s && s.userID).length > 0 ? (
                            classItem.students
                                .filter(s => s && s.userID)
                                .map(student => renderStudentItem(student, classItem.cid))
                        ) : (
                            <Text style={{ marginLeft: 25, color: 'gray', paddingBottom: 10  }}>No students enrolled</Text>
                        )}
                    </View>
                )}
                <Divider />
            </View>
        );
    };
    return (
        <Layout style={{ flex: 1, padding: 36 }}>
            <Text category='h4' style={styles.heading}>Assign Question</Text>
            <Text category='s1' appearance='hint' style={styles.subHeading}>
                Select classes or specific students
            </Text>
            <ScrollView>
                {classes.map(classItem => renderClassItem(classItem))}
            </ScrollView>
            {message ? <Text style={{ textAlign: 'center', marginVertical: 8 }}>{message}</Text> : null}
            <Button onPress={handleSave} disabled={loading} style={{ marginTop: 10 }}>
                {loading ? "Saving..." : "Assign question"}
            </Button>
        </Layout>
    );
};
const styles = StyleSheet.create({
    heading: { marginBottom: 8, paddingTop: 30 },
    subHeading: { marginBottom: 16, }
});
export default Assigning;
