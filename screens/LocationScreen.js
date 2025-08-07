//TO DO: get Google Maps API key

import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProcess } from '../registrationUtils';
import { GOOGLE_MAPS_API_KEY } from '@env';

//Ask the user permission to access their location
// Get the user's current GPS coords
// Updates the map region to the center of that location 
// Send the coords to Goodle Maps API to get real address
// Save address in location

const LocationScreen = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState("");
    const [region, setRegion] = useState({
        latitude: 13.0451,
        longitude: 77.6269,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [coordinates] = useState([
        {
            latitude: 13.0451,
            longitude: 77.6269
        },
        {
            latitude: 13.0451,
            longitude: 77.6269
        },
    ]);

    // runs once the components loads 
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync(); // Ask for permission 
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
            let position = await Location.getCurrentPositionAsync({}); // Get the current users position
            const { latitude, longitude } = position.coords; // pulls latitude and longitude values from returned data

            //update the region object to center the map on the user's location
            // keep the old values using ..prev
            setRegion((prev) => ({
                ...prev, latitude, longitude
            }));
            // send request to Google Maps API to convert the coordinates to a human-readable address
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
            const data = await response.json();


            if (data.results.length > 0) {
                setLocation(data.results[0].formatted_address);

            }
        })
    }, []);
    console.log("location", location);

    const handleMarkerDragEnd = coordinate => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${GOOGLE_MAPS_API_KEY}`).then(response => response.json()).then(data => {
            console.log("New location", data);
            if (data.results.length > 0) {

                const addressComponents = data?.results[0].address_components; // gets the address, street, city, ect
                let formattedAddress = "";
                for (let component of addressComponents) {
                    //route is the street number and name
                    if (component.types.includes('route')) {
                        formattedAddress += component.long_name + ",";
                    }
                    //  neighborhood
                    if (component.types.includes('sublocality_level_1')) {
                        formattedAddress += component.long_name + ",";
                    }
                    // city 
                    if (component.types.includes('locality')) {
                        formattedAddress += component.long_name + ",";
                    }
                }
                // updated the apps state with the new address 
                formattedAddress = formattedAddress.trim().slice(0, -1);
                setLocation(formattedAddress);
            }
        }).catch(error => console.log("Error fetching the location"))
    }
    const handleNext = () => {
        saveRegistrationProcess('Location', { location });
        navigation.navigate("Gender");
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
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
                                name="location-exit"
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
                    <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "GeezaPro-Bold", marginTop: 15 }}>Where do you live?</Text>
                    <MapView
                        style={{ width: '100%', height: 500, margintTop: 20, borderRadius: 5 }}
                        initialRegion={{
                            latitude: 13.0451,
                            longitude: 77.6269,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <Marker onDragEnd={e => handleMarkerDragEnd(e.nativeEvent)} draggable coordinate={coordinates[1]}>
                            <View style={{ backgroundColor: 'black', padding: 12, borderRadius: 20 }}>
                                <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "white" }}>{location}</Text>
                            </View>

                        </Marker>

                    </MapView>

                </View>
                <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={{ marginTopp: 30, marginLeft: "auto" }}>
                    <MaterialCommunityIcons
                        style={{ alignSelf: "center", marginTop: 20, marginRight: 20 }}
                        name="arrow-right-circle"
                        size={30}
                        color="#581845"
                    />

                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default LocationScreen;

const styles = StyleSheet.create({
}); 