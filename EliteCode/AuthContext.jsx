import React, { createContext, useState, useEffect, useContext } from 'react';
import {getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth";

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
                        setUser(null);
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
    
    const changePassword = async (email) => {
        try{
            console.log("sending email")
            return sendPasswordResetEmail(FIREBASE_AUTH, email);
        }  catch (error){
            console.log("Error", error.message)
        }
    };

    const signUp = async (email, password) => {
        // console.log( await fetchSignInMethodsForEmail(FIREBASE_AUTH, email));
        return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, changePassword, signUp }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
