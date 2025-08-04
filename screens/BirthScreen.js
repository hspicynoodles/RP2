import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { saveRegistrationProcess } from '../registrationUtils';
import { useEffect } from 'react';
import { getRegistrationProgress } from '../registrationUtils';



const BirthScreen = () => {
    const navigation = useNavigation();
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const dayRef = useRef(null);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const handleDayChange = (text) => {
        setDay(text);
        if (text.length == 2) {
            monthRef.current.focus();
        }
    }
    const handleMonthChange = (text) => {
        setMonth(text);
        if (text.length == 2) {
            yearRef.current.focus();
        }
    }
    const handleYearChange = (text) => {
        setYear(text);
    }
    const handleNext = () => {
        if (day.trim() !== '' && month.trim() !== '' && year.trim() !== '') {
            const dateOfBirth = '${day}/${month}/${year}';
            saveRegistrationProcess('Birth', { dateOfBirth });
        }
        navigation.navigate("Location");
    }

    // when the screen loads check if the user already saved their birthday, if yes split it in 
    // day, month and year and set the state variables 
    useEffect(() => {
        getRegistrationProgress("Birth").then(progressData => {  // dp we have info already saved in? 
            if (progressData) {
                const { dateOfBirth } = progressData;
                const [dayValue, monthValue, yearValue] = dateOfBirth.split('/');
                setDay(dayValue);
                setMonth(monthValue);
                setYear(yearValue);

            }
        })
    }, [])


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
                        <MaterialCommunityIcons
                            name="cake-variant-outline"
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
                <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "GeezaPro-Bold", marginTop: 15 }}>What's your date of birth?</Text>
                <View style={{ flexDirection: "row", gap: 10, marginTop: 80, justifyContent: 'center' }}>

                    <TextInput ref={dayRef} autoFocus={true} placeholder="DD" maxLength={2} keyboardType='numeric' value={day} onChangeText={handleDayChange} style={{ borderBottomWidth: 1, borderColor: "black", padding: 10, width: 60, fontSize: day ? 22 : 22, fontFamily: "GeezaPro-Bold", }} />
                    <TextInput ref={monthRef} autoFocus={true} placeholder="MM" maxLength={2} keyboardType='numeric' value={month} onChangeText={handleMonthChange} style={{ borderBottomWidth: 1, borderColor: "black", padding: 10, width: 60, fontSize: month ? 22 : 22, fontFamily: "GeezaPro-Bold", }} />
                    <TextInput ref={yearRef} autoFocus={true} placeholder="YYYY" maxLength={4} keyboardType='numeric' value={year} onChangeText={handleYearChange} style={{ borderBottomWidth: 1, borderColor: "black", padding: 10, width: 80, fontSize: year ? 22 : 22, fontFamily: "GeezaPro-Bold", }} />

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
        </SafeAreaView >
    )
}

export default BirthScreen;

const styles = StyleSheet.create({

}); 