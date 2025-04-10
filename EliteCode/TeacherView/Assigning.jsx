import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, FlatList, Alert, Image, StyleSheet,Spinner} from "react-native";
import { useRoute } from '@react-navigation/native';
import { CheckBox, Button, Card, Text } from "@ui-kitten/components";
import { useAuth } from "../AuthContext";
    
const Assigning = () => {
    const route = useRoute();
    const { user } = useAuth();
    const { question} = route.params;
    const assignTo = route.params?.assignTo
    const [courses, setCourses] = useState([]);
    const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetchCoursesAndStudents();
    // }, []);

    useEffect(() => {
        fetch(`https://elitecodecapstone24.onrender.com/instructor/courses?tid=${user.userID}`) 
          .then((res) => res.json())
          .then((data) => {
            setCourses(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Error fetching courses:', err);
            setLoading(false);
          });
      }, []);
    
      const selectedCourse = selectedCourseIndex !== null ? courses[selectedCourseIndex.row] : null;
    
      const toggleStudentSelection = (userID) => {
        const updatedCourses = courses.map((course) => {
          if (course.cid === selectedCourse.cid) {
            const updatedStudents = course.students.map((student) =>
              student.userID === userID
                ? { ...student, selected: !student.selected }
                : student
            );
            return { ...course, students: updatedStudents };
          }
          return course;
        });
        setCourses(updatedCourses);
      };
    
      const selectAllStudents = () => {
        const updatedCourses = courses.map((course) => {
          if (course.cid === selectedCourse.cid) {
            const updatedStudents = course.students.map((student) => ({
              ...student,
              selected: true,
            }));
            return { ...course, students: updatedStudents };
          }
          return course;
        });
        setCourses(updatedCourses);
      };
    
      return (
        <View style={styles.container}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Select
                selectedIndex={selectedCourseIndex}
                onSelect={(index) => setSelectedCourseIndex(index)}
                value={selectedCourse ? selectedCourse.courseName : 'Select a Course'}
                style={{ marginBottom: 20 }}
              >
                {courses.map((course) => (
                  <SelectItem title={course.courseName} key={course.cid} />
                ))}
              </Select>
    
              {selectedCourse && (
                <>
                  <Button style={{ marginBottom: 10 }} onPress={selectAllStudents}>
                    Select All Students
                  </Button>
    
                  {selectedCourse.students.map((student) => (
                    <CheckBox
                      key={student.userID}
                      checked={student.selected || false}
                      onChange={() => toggleStudentSelection(student.userID)}
                    >
                      {`${student.fname} ${student.lname}`}
                    </CheckBox>
                  ))}
                </>
              )}
            </>
          )}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        marginTop: 50,
      },
    });

//     const fetchCoursesAndStudents = async () => {
//         try {
//             // console.log(user.userID)
//             // console.log("qid in assigning", question.qid)
//             // Fetch courses the teacher teaches
//             let res = await fetch(`https://elitecodecapstone24.onrender.com/instructor/courses?tid=${user.userID}`);
//             const data = await res.json();
//             setCourses(data.results);
//             // console.log("courses", courses)

//             // // Fetch students the teacher can assign
//             // let studentRes = await fetch(`https://elitecodecapstone24.onrender.com/instructor/students?tid=${user.userID}`);
//             // const studentData = await studentRes.json();
//             // setStudents(studentData.results);
//             // // console.log("students", students)
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const toggleSelection = (id, type) => {
//         if (type === "course") {
//             setSelectedCourses(prev =>
//                 prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
//             );
//         } else {
//             setSelectedStudents(prev =>
//                 prev.includes(id) ? prev.filter(userID => userID !== id) : [...prev, id]
//             );
//         }
//     };

//     const assignQuestion = async () => {
//         if (selectedCourses.length === 0 && selectedStudents.length === 0) {
//             Alert.alert("Select at least one course or student");
//             return;
//         }
    
//         try {
//             // console.log("in try", question.qid)
//             let res = await fetch("https://elitecodecapstone24.onrender.com/instructor/assignQuestion", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     qid : question.qid, 
//                     tid: user.userID,
//                     courses: selectedCourses,
//                     students: selectedStudents,
//                     viewable: 1
//                 })
//             });
//             let data = await res.json();
//             Alert.alert("Success", "Question assigned successfully!");
//         } catch (error) {
//             console.error("Error assigning question:", error);
//         }
//     };
    

//     return (
//         <View style={{ flex: 1, padding: 20, backgroundColor: "#2C496B" }}>
//             <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 10 }}>Assign Question</Text>
//             <Text> {question.question} </Text>
//             {/* <Image> {question.imgfile} </Image> */}
//             <Card style={{ marginBottom: 15 }}>
//                 <Text style={{marginBottom: 10}} category="s1">Assign to Courses:</Text>
//                 <FlatList
//                     data={courses}
//                     keyExtractor={(item) => item.cid}
//                     renderItem={({ item }) => (
//                         <CheckBox  style={{marginBottom: 10}}
//                             checked={selectedCourses.includes(item.cid)}
//                             onChange={() => toggleSelection(item.cid, "course")}
//                         >
//                             {item.courseName}
//                         </CheckBox>
//                     )}
//                 />
//             </Card>

//             <Card>
//                 <Text style={{marginBottom: 10}} category="s1">Assign to Specific Students:</Text>
//                 <FlatList
//                     data={students}
//                     keyExtractor={(item) => item.userID}
//                     renderItem={({ item }) => (
//                         <CheckBox  style={{marginBottom: 10}}
//                             checked={selectedStudents.includes(item.userID)}
//                             onChange={() => toggleSelection(item.userID, "student")}
//                         >
//                             {item.fname} {item.lname}
//                         </CheckBox>
//                     )}
//                 />
//             </Card>

//             <Button onPress={assignQuestion} style={{ marginTop: 20 }}>Assign Question</Button>
//         </View>
//     );
// };

export default Assigning;
