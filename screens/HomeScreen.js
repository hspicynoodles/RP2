import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

const HomeScreen = () => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        }

        fetchUser();
    }, []);

    useEffect(() => {
        showToken();
    }, []);

    const showToken = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log("Token:", token);
    };
    return (
        <View>
            <Text> textInComponent </Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
