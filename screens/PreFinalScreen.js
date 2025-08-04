import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { getRegistrationProgress } from '../registrationUtils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PreFinalScreen = () => {

    // fetching user registration data from different screens and storing it all in one object called userData 

    //userData holds all user's info that we will fetch later 
    // 
    const [userData, setUserData] = useState();
    // useContext(AuthContext) pulls in data from the AuthContext 
    // token is used for authentication and setToken to update if needed
    const [token, setToken] = useContext(AuthContext);
    const navigation = useNavigation();
    // run this when the screen loads 
    useEffect(() => {
        navigation.replace("MainStack", { screen: "Main" })
    }, [token])
    useEffect(() => {
        getAllUserData();
    }, []);
    //async means the function can use await to pause and wait for things 
    // and then create an array called screens with all the screen names in reg flow
    const getAllUserData = async () => {
        try {
            const screens = [
                'Name',
                'Email',
                'Password',
                'Birth',
                'Location',
                'Gender',
                'Type',
                'Dating',
                'LookingFor',
                'Hometown',
                'Photos',
                'Prompts',
            ];
            // build userData object , first its empty 
            let userData = {};

            //loop through screen names 
            for (const screenName of screens) {

                // fetch what the user filled out on the screen 
                const screenData = await getRegistrationProgress(screenName);
                if (screenData) {
                    // ...userData = oldData, ...screenData = adds new data from the current screen
                    userData = { ...userData, ...screenData };
                }
            };
            setUserData(userData)
        } catch (error) {

        }
    };
    const clearAllScreenData = async () => {
        try {
            const screens = [
                'Name',
                'Email',
                'Password',
                'Birth',
                'Location',
                'Gender',
                'Type',
                'Dating',
                'LookingFor',
                'Hometown',
                'Photos',
                'Prompts',
            ];
            for (const screenName of screens) {
                const key = `registration_progress_${screenName}`;
                await AsyncStorage.removeItem(key)
            };
            console.log("All screen data cleared!")
        } catch (error) {

        }
    }
    const registerUser = async () => {
        try {
            const response = await axios.post("http://localhost:3000/register", userData).then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("token", token);
                setToken(token);
            });

            clearAllScreenData();
        } catch (error) {
            console.log("Error", error);
        }
    }
    console.log("Data", userData);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginTop: 80 }}>
                <Text style={{
                    fontSize: 35,
                    fontWeight: "bold",
                    fontFamily: "GeezaPro-Bold",
                    marginLeft: 20,
                }}>All set to register</Text>
                <Text style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    fontFamily: "GeezaPro-Bold",
                    marginLeft: 20,
                    marginTop: 10
                }}>Setting up your profile for you</Text>
            </View>
            <View>

                <LottieView
                    style={{
                        height: 260,
                        width: 300,
                        alignSelf: 'center',
                    }}
                    source={require("../assets/love.json")}
                    autoPlay
                    loop={true}
                    speed={0.5}
                />
            </View>
            <Pressable

                onPress={registerUser}
                style={{
                    backgroundColor: "#FF5864",
                    padding: 15, marginTop: "auto"
                }}>
                <Text
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 15,
                        fontWeight: "600"
                    }}>
                    Finish registering
                </Text>
            </Pressable>
        </SafeAreaView >
    )
}

export default PreFinalScreen;

const styles = StyleSheet.create({
}); 