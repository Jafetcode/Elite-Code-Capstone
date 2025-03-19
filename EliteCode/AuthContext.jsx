import React, { createContext, useState, useEffect, useContext } from 'react';
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                try {
                    // Fetch additional user details from MySQL API
                    const response = await fetch(`https://elitecodecapstone24.onrender.com/userRole?email=${authUser.email}`);
                    const userData = await response.json();
                    
                    if (response.ok) {
                        setUser({ uid: authUser.uid, email: authUser.email, ...userData });
                    } else {
                        console.error("Error fetching user role:", userData.error);
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    };

    const logout = async () => {
        return signOut(FIREBASE_AUTH);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
