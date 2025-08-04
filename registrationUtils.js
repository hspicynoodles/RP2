import AsyncStorage from "@react-native-async-storage/async-storage";

//take in the screen name and the screen data 
export const saveRegistrationProcess = async (screenName, data) => {
    try {
        const key = `registration_progress_${screenName}`
        await AsyncStorage.setItem(key, JSON.stringify(data));
        console.log(`Progress saved for the screen: ${screenName}`);
    }
    catch (error) {
        console.log("Error saving the progress", error);
    }
}

export const getRegistrationProgress = async (screenName) => {
    try {
        const key = `registration_progress_${screenName}`;
        const data = await AsyncStorage.getItem(key);
        return data !== null ? JSON.parse(data) : null; //JSON.parse converts string to object

    } catch (error) {
        console.log("Error recieving the progress", error);
    }
}