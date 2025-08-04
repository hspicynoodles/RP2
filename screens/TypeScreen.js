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
        getRegistrationProgress('type').then(progressData => {
            setType(progressData.type || '');
        })
    }, [])
    const handleNext = () => {
        navigation.navigate("Dating");
        if (type.trim() !== '') {
            saveRegistrationProcess('type', { type });
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
                    What's your sexuality?
                </Text>
                <Text style={{ marginTop: 20, fontSize: 15, color: "gray" }}>Hinge users are matched based on these three gender groups. You can add more about your gender identity if you'd like.</Text>
                <View style={{ marginTop: 30, flexDirection: "column", gap: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>Straight</Text>
                        <Pressable onPress={() => setType("Straight")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={type === "Straight" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>Gay</Text>
                        <Pressable onPress={() => setType("Gay")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={type === "Gay" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15 }}>Bi-Sexual</Text>
                        <Pressable onPress={() => setType("Bi-Sexual")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={type === "Bi-Sexual" ? "black" : "gray"}
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