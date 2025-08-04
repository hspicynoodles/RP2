import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress } from '../registrationUtils';
import { saveRegistrationProcess } from '../registrationUtils';
import { useEffect } from 'react';


const DateType = () => {
    const navigation = useNavigation();
    const [datingPreference, setDatingPreference] = useState([]);

    const chooseOption = option => {
        if (datingPreference.includes(option)) {
            setDatingPreference(datingPreference.filter(selectedOption => selectedOption !== option));
        } else {
            setDatingPreference([...datingPreference, option]);
        }
    };
    useEffect(() => {
        getRegistrationProgress('Dating').then(progressData => {
            setDatingPreference(progressData.datingPreference || []);
        })
    }, []);

    const handleNext = () => {
        saveRegistrationProcess('Dating', { datingPreference });

        navigation.navigate("LookingFor");
    }
    return (
        <SafeAreaView>
            <View style={{ marginTop: 90, marginHorizontal: 20 }}>
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
                            name="heart-outline"
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
                <Text style={{ fontSize: 25, fontWeight: "bold", color: "black", marginTop: 25, fontFamily: "GeezaPro-Bold" }}>Who do you want to date?</Text>
                <Text style={{ color: "gray", marginTop: 15 }}>Select all the people you are open to meeting</Text>

                <View style={{ marginTop: 30, flexDirection: "column", gap: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>Men</Text>
                        <Pressable onPress={() => chooseOption("Men")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={datingPreference.includes("Men") ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                </View>
                <View style={{ marginTop: 30, flexDirection: "column", gap: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>Women</Text>
                        <Pressable onPress={() => chooseOption("Women")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={datingPreference.includes("Women") ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                </View>
                <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={{ marginTop: 30, marginLeft: "auto" }}>
                    <MaterialCommunityIcons
                        style={{ alignSelf: "center", marginTop: 20 }}
                        name="arrow-right-circle"
                        size={26}
                        color="#581845"
                    />

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DateType;

const styles = StyleSheet.create({
}); 