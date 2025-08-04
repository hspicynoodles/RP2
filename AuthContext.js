import { createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';


// create a new box context to hold and share auth related studd 
const AuthContext = createContext();

// create provider component that will wrap app and give access to the auth state 
const AuthProvider = ({ children }) => {
    //token is the JWT token for the current logged in user
    const [token, setToken] = useState('');

    // tells app if auth related stuff is loading 
    const [isLoading, setIsLoading] = useState('');


    // check if use is logged in 
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const userToken = await AsyncStorage.getItem('token');
            setToken(userToken);
            setIsLoading(false);
        } catch (error) {
            console.log('error', error);
        }
    };
    useEffect(() => {
        isLoggedIn();
    }, []);


    return (
        //AuthContext.Provider is a box that holds data that we want to share
        // token : the login token
        // isLoading : checking whether the user is logged in
        // setToken : the function to change to token 
        // init this is all the info we are sharing with the rest of the app 
        <AuthContext.Provider value={{ token, isLoading, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }