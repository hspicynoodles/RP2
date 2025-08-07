//SafeAreaview is to make sure that the content isnt messed up by iphone or get cut off
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Entypo, Fontisto } from '@expo/vector-icons'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from 'react';
import { getRegistrationProgress, saveRegistrationProcess } from '../registrationUtils';


const NameScreen = () => {
    // useState is a hook that allows you to have state variables in functional components
    // firstName is the state variable, setFirstName is the function to update it
    // "" is the initial value of firstName
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        getRegistrationProgress('Name').then(progressData => {
            setFirstName(progressData.firstName || '');
        })

    })

    const handleNext = () => {
        if (firstName.trim() !== "") {
            saveRegistrationProcess('Name', { firstName });
        }

        navigation.navigate("Email")
    }


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={{ marginTop: 50, textAlign: "center", color: "gray", }}>No Background Checks are Conducted</Text>
            <View style={{ marginTop: 30, marginHorizontal: 20, }}>
                <View style={{
                    flexDirection: "row", alignItems: "center",
                }}>
                    <View style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        borderWidth: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "black",
                    }}>
                        <MaterialCommunityIcons
                            name="gamepad-variant-outline"
                            size={26}
                            color="black"
                        />
                    </View>
                    <Image
                        style={{
                            width: 100,
                            height: 40,
                        }}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
                        }}
                    />
                </View>

                <View style={{
                    marginTop: 30,
                }}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "GeezaPro-Bold", }}>Whats your name?</Text>
                    <TextInput
                        autoFocus={true}
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder='First Name(required)'
                        placeholderTextColor="gray"
                        style={{
                            width: 340,
                            marginVertical: 10,
                            marginTop: 25,
                            borderBottomColor: "black", borderBottomWidth: 1, paddingBottom: 10, fontFamily: "GeezaPro-Bold",
                            fontSize: firstName ? 22 : 22,
                        }}>
                    </TextInput>
                    <TextInput
                        autoFocus={true}
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholder='Last Name'
                        placeholderTextColor="gray"
                        style={{
                            width: 340,
                            marginVertical: 10,
                            marginTop: 20,
                            borderBottomColor: "black", borderBottomWidth: 1, paddingBottom: 10, fontFamily: "GeezaPro-Bold",
                            fontSize: lastName ? 22 : 22,
                        }}>
                    </TextInput>
                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "500" }}>Last Name is optional</Text>
                </View>
                <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={{ marginTopp: 30, marginLeft: "auto" }}>
                    <MaterialCommunityIcons
                        style={{ alignSelf: "center", marginTop: 20 }}
                        name="arrow-right-circle"
                        size={26}
                        color="#1755b2ff"
                    />

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

export default NameScreen;

const styles = StyleSheet.create({
}); 