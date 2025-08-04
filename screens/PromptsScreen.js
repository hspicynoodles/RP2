import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { saveRegistrationProcess } from '../registrationUtils';


const PromptsScreen = () => {
    const route = useRoute(); // used for passing data between screens 
    const navigation = useNavigation();
    const handleNext = () => {
        saveRegistrationProcess('Prompts', { prompts: route?.params.prompts });
        navigation.navigate("PreFinal");
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
                            name="eye"
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
                <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "GeezaPro-Bold", marginTop: 15 }}>Write your profile answers</Text>
                <View style={{ marginTop: 20, flexDirection: 'column', gap: 20 }}>
                    {route?.params?.prompts && route.params.prompts.length > 0 ? (
                        route.params.prompts.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => navigation.navigate('ShowPrompts')}
                                style={{
                                    borderColor: "#707070",
                                    borderWidth: 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderStyle: "dashed",
                                    borderRadius: 10,
                                    height: 70,
                                    marginBottom: 10,
                                }}
                            >
                                <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15 }}>
                                    {item?.question}
                                </Text>
                                <Text style={{ fontWeight: '600', fontStyle: 'italic', fontSize: 15, marginTop: 3 }}>
                                    {item?.answer}
                                </Text>
                            </Pressable>
                        ))
                    ) : (
                        <Pressable
                            onPress={() => navigation.navigate('ShowPrompts')}
                            style={{
                                borderColor: "#707070",
                                borderWidth: 2,
                                justifyContent: "center",
                                alignItems: "center",
                                borderStyle: "dashed",
                                borderRadius: 10,
                                height: 70,
                            }}
                        >
                            <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15 }}>
                                Select a prompt
                            </Text>
                            <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15, marginTop: 3 }}>
                                And write your own answer
                            </Text>
                        </Pressable>
                    )}
                </View>
                <View style={{ marginTop: 20, flexDirection: 'column', gap: 20 }}>
                    {route?.params?.prompts && route.params.prompts.length > 0 ? (
                        route.params.prompts.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => navigation.navigate('ShowPrompts')}
                                style={{
                                    borderColor: "#707070",
                                    borderWidth: 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderStyle: "dashed",
                                    borderRadius: 10,
                                    height: 70,
                                    marginBottom: 10,
                                }}
                            >
                                <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15 }}>
                                    {item?.question}
                                </Text>
                                <Text style={{ fontWeight: '600', fontStyle: 'italic', fontSize: 15, marginTop: 3 }}>
                                    {item?.answer}
                                </Text>
                            </Pressable>
                        ))
                    ) : (
                        <Pressable
                            onPress={() => navigation.navigate('ShowPrompts')}
                            style={{
                                borderColor: "#707070",
                                borderWidth: 2,
                                justifyContent: "center",
                                alignItems: "center",
                                borderStyle: "dashed",
                                borderRadius: 10,
                                height: 70,
                            }}
                        >
                            <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15 }}>
                                Select a prompt
                            </Text>
                            <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15, marginTop: 3 }}>
                                And write your own answer
                            </Text>
                        </Pressable>
                    )}
                </View>
                <View style={{ marginTop: 20, flexDirection: 'column', gap: 20 }}>
                    {route?.params?.prompts && route.params.prompts.length > 0 ? (
                        route.params.prompts.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => navigation.navigate('ShowPrompts')}
                                style={{
                                    borderColor: "#707070",
                                    borderWidth: 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderStyle: "dashed",
                                    borderRadius: 10,
                                    height: 70,
                                    marginBottom: 10,
                                }}
                            >
                                <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15 }}>
                                    {item?.question}
                                </Text>
                                <Text style={{ fontWeight: '600', fontStyle: 'italic', fontSize: 15, marginTop: 3 }}>
                                    {item?.answer}
                                </Text>
                            </Pressable>
                        ))
                    ) : (
                        <Pressable
                            onPress={() => navigation.navigate('ShowPrompts')}
                            style={{
                                borderColor: "#707070",
                                borderWidth: 2,
                                justifyContent: "center",
                                alignItems: "center",
                                borderStyle: "dashed",
                                borderRadius: 10,
                                height: 70,
                            }}
                        >
                            <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15 }}>
                                Select a prompt
                            </Text>
                            <Text style={{ fontWeight: "600", fontStyle: "italic", fontSize: 15, marginTop: 3 }}>
                                And write your own answer
                            </Text>
                        </Pressable>
                    )}
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

export default PromptsScreen;

const styles = StyleSheet.create({
}); 