import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProcess } from '../registrationUtils';
import { getRegistrationProgress } from '../registrationUtils';
import { useEffect } from 'react';



const EmailScreen = () => {

    const [email, setEmail] = React.useState("");
    const navigation = useNavigation();

    const handleNext = () => {
        if (email.trim() !== '') {
            saveRegistrationProcess('Email', { email });
        }
        navigation.navigate("Password");
    }
    // runs after the component loads or when something changes. 
    // go get the saved email rom the AsyncStorage and fill it into the form. 

    useEffect(() => {
        getRegistrationProgress('Email').then(progressData => {
            setFirstName(progressData.email || '');
        })

    })

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
                        <Fontisto
                            name="email"
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
                <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 15 }}>Please provide a valid email</Text>
                <Text style={{ marginTop: 10, fontSize: 15, color: "gray" }}>Email verification helps us keep the account secure</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter your email"
                    placeholderTextColor={'#BEBEBE'}
                    style={{
                        width: 340,
                        marginVertical: 10,
                        borderBottomColor: "black", borderBottomWidth: 1, paddingBottom: 10, fontFamily: "GeezaPro-Bold",
                        fontSize: email ? 22 : 22,

                    }}
                />
                <Text style={{ color: "gray", fontSize: 15, marginTop: 7 }}>
                    Note: You will be asked to verify your email
                </Text>
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

export default EmailScreen;

const styles = StyleSheet.create({
}); 