// import { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { onAuthStateChanged } from 'firebase/auth';
// import { FIREBASE_AUTH } from '../firebaseConfig';
// import { useNavigation } from '@react-navigation/native';

// const RoleBasedRedirect = () => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
//       if (firebaseUser) {
//         try {
//           console.log("Fetching user data for:", firebaseUser.email);
          
//           const response = await fetch(`http://localhost:3300/user-role?email=${firebaseUser.email}`);
//           const data = await response.json();

//           setUser(data.userID);
//           setRole(data.role);

//           console.log("User Role:", data.role);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         setUser(null);
//         setRole(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (role) {
//       if (role === 'student') {
//         navigation.replace('StudentHome');
//       } else if (role === 'teacher') {
//         navigation.replace('TeacherHome');
//       }
//     }
//     else if (user === null && role === null) {
//         navigation.replace('Login'); // Redirect to Login if no user is logged in
//       }
//     }, [user, role]);
  
//     return (
//       <View>
//         {role ? <Text>Redirecting...</Text> : <ActivityIndicator size="large" />}
//       </View>
//     );
//   };


// export default RoleBasedRedirect;

// src/components/RoleBasedRedirect.js
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig'; // Adjust path if needed
import { useNavigation } from '@react-navigation/native';

const RoleBasedRedirect = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          console.log("Fetching user data for:", firebaseUser.email);
          
          const response = await fetch(`https://your-api-url.com/user-role?email=${firebaseUser.email}`);
          const data = await response.json();

          setUser(data.userID);
          setRole(data.role);
          console.log("User Role:", data.role);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (role) {
      if (role === 'student') {
        navigation.replace('StudentHome');
      } else if (role === 'teacher') {
        navigation.replace('TeacherHome');
      }
    } else if (user === null && role === null) {
      navigation.replace('Login'); // Redirect to Login if no user is logged in
    }
  }, [user, role]);

  return (
    <View>
      {role ? <Text> Redirecting... </Text> : <ActivityIndicator size="large" />}
    </View>
  );
};

export default RoleBasedRedirect;

