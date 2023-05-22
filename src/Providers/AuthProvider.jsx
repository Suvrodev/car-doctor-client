import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
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


    ///Sign in By Google Start
    const googleProvider=new GoogleAuthProvider();
    const GoogleLogin=()=>{
        return signInWithPopup(auth,googleProvider);
    }
    ///Sign in By Google End


    ///Logout Start
    const LogOut=()=>{
        setLoading(true)
        return signOut(auth);
    }
    ///Logout End


    //Check User start
    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
          //  console.log("Current User: ",currentUser)
            setLoading(false)

            if(currentUser && currentUser.email){

                const loginUser={
                    email: currentUser.email
                }

                fetch('https://car-doctor-server-tan-nine.vercel.app/jwt',{
                    method: 'POST',
                    headers: {
                      'content-type':'application/json' 
                    },
                    body: JSON.stringify(loginUser)
                    
                  })
                  .then(res=>res.json())
                  .then(data=>{
                   // console.log('JWT Response: ',data)
                    ///warning : Local storage is not best place
                    localStorage.setItem('car-access-token',data.token)
                  })
            }else{
                localStorage.removeItem('car-access-token')
            }
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
        LogOut,
        GoogleLogin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;