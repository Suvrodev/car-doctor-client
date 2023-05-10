import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase/firebase.config';


export const AuthContext=createContext();
const auth=getAuth(app)

const AuthProvider = ({children}) => {

    const [user,setUser]=useState([])
    const [loading,setLoading]=useState(true)


    ///Reg By Email and Password Start
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    ///Reg By Email and Password End

    ///Sign in by Email Start
    const SignInByMail=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    ///Sign in by Email End

    //Check User start
    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            console.log("Current User: ",currentUser)
            setLoading(false)
        })

        return ()=>{
            return unSubscribe();
        }
    },[])
    //Check User end

    const authInfo={
        user,
        loading,
        createUser,
        SignInByMail,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;