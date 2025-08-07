import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Entypo, Fontisto } from '@expo/vector-icons'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { getRegistrationProgress, saveRegistrationProcess } from '../registrationUtils';

const TypeScreen = () => {
    const [type, setType] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        getRegistrationProgress('Type').then(progressData => {
            setType(progressData.type || '');
        })
    }, [])
    const handleNext = () => {
        navigation.navigate("PreFinal");
        if (type.trim() !== '') {
            saveRegistrationProcess('Type', { type });
        }

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
                <Text style={{ fontSize: 25 }}>
                    What console do you have?
                </Text>
                <View style={{ marginTop: 30, flexDirection: "column", gap: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>PS5</Text>
                        <Pressable onPress={() => setType("PS5")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={type === "PS5" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>PC</Text>
                        <Pressable onPress={() => setType("PC")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={type === "PC" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>Xbox</Text>
                        <Pressable onPress={() => setType("Xbox")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={type === "Xbox" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
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

export default TypeScreen;

const styles = StyleSheet.create({
}); 