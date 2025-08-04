import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProcess } from '../registrationUtils';

const LookingFor = () => {
    const [lookingFor, setLookingFor] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        // Check if lookingFor was saved in the registration progress.
        getRegistrationProgress('LookingFor').then(progressData => {
            setLookingFor(progressData.lookingFor || '');
        })
    }, []);
    const handleNext = () => {
        if (lookingFor.trim() !== '') {
            saveRegistrationProcess('LookingFor', { lookingFor });
        }
        // Save the lookingFor state to AsyncStorage or any storage you are using
        navigation.navigate("Photos");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ marginHorizontal: 20, marginTop: 90 }}>
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
                <Text style={{ fontSize: 25, fontWeight: "bold", color: "black", marginTop: 25, fontFamily: "GeezaPro-Bold" }}>What's your dating intention</Text>
                <View style={{ marginTop: 30, flexDirection: 'column', gap: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15 }}>Life Partner</Text>
                        <Pressable onPress={() => setLookingFor("Life Partner")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={lookingFor === "Life Partner" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15 }}>Short-Fun Relationship</Text>
                        <Pressable onPress={() => setLookingFor("Short-Fun Relationship")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={lookingFor === "Short-Fun Relationship" ? "black" : "gray"}
                            />

                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15 }}>Short Term Relationship</Text>
                        <Pressable onPress={() => setLookingFor("Short Term Relationship")}>
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={lookingFor === "Short Term Relationship" ? "black" : "gray"}
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

export default LookingFor;

const styles = StyleSheet.create({
}); 