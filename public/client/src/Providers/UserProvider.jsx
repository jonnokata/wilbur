// import React, {Component, createContext, useState} from "react";
// import {auth} from "../firebase"

// export const UserContext = createContext({ user: null });

// const UserProvider = (props) => {
//     const [userAuth, setUserAuth] = useState({
//         user: null
//     })

//     // const handleAuthChange = async () => {
//     //     auth.onAuthStateChanged(setUserAuth({
//     //         user: userAuth})
//     //     )}

//         const handleAuthChange = async () => {
//             auth.onAuthStateChanged(async userAuth => {
//                 const user = await generateUserDocument(userAuth);
//                 setUserAuth({user})
//         })}

// return (
//     <UserContext.Provider value={userAuth}>
//         {props.children}
//     </UserContext.Provider>
// )};

// export default {UserProvider};


