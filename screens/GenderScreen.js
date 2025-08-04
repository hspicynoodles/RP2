import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Entypo, FontAwesome, Fontisto } from '@expo/vector-icons'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { getRegistrationProgress, saveRegistrationProcess } from '../registrationUtils';

const GenderScreen = () => {
    const [gender, setGender] = useState("");
    const navigation = useNavigation();

    // Check if gender was saved in the registration progress.
    // If it exists, get the data and set the gender.
    useEffect(() => {
        getRegistrationProgress('Gender').then(progressData => {
            setGender(progressData.gender || '');
        })
    }, [])

    const handleNext = () => {
        if (gender.trim() !== '') {
            saveRegistrationProcess('Gender', { gender });
        }
        navigation.navigate("Type");
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
                            name="newspaper-variant-outline"
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
                <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "GeezaPro-Bold", marginTop: 15 }}>Which gender describes you best?</Text>
                <Text style={{ marginTop: 20, fontSize: 15, color: "gray" }}>Hinge users are matched based on these three gender groups. You can add more about your gender identity if you'd like.</Text>

                <View style={{ marginTop: 30 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Men</Text>
                        <Pressable onPress={() => setGender("Men")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={gender === "Men" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Women</Text>
                        <Pressable onPress={() => setGender("Women")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={gender === "Women" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Non-Binary</Text>
                        <Pressable onPress={() => setGender("Non-Binary")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={gender === "Non-Binary" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                </View>
                <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <AntDesign
                        name="checksquare"
                        size={26}
                        color={gender == '$581845'}
                    />
                    <Text style={{ fontSize: 15 }}>Visible on Profile</Text>
                </View>
                <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={{ marginTopp: 30, marginLeft: "auto" }}>
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

export default GenderScreen;

const styles = StyleSheet.create({
}); 