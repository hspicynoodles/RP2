import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProcess } from '../registrationUtils';


const PasswordScreen = () => {
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleNext = () => {
        if (password.trim() !== '') {
            saveRegistrationProcess('Password', { password });
        }
        navigation.navigate("Birth");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginTop: 90, marginHorizontal: 20, }}>
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
                        <AntDesign
                            name="lock"
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
                <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "GeezaPro-Bold", marginTop: 15 }}>Please choose a password</Text>
                <TextInput autoFocus={true} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholder="Enter your password" placeholderTextColor={"#BEBEBE"}
                    style={{
                        width: 340,
                        marginVertical: 10,
                        borderBottomColor: "black", borderBottomWidth: 1, paddingBottom: 10, fontFamily: "GeezaPro-Bold",
                        fontSize: password ? 22 : 22,

                    }} />
                <Text style={{ color: "gray", fontSize: 15, marginTop: 5 }}>Note: Your detail will be safe with us</Text>
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

export default PasswordScreen;

const styles = StyleSheet.create({
}); 