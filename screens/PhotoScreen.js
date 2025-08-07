import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TextInput, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { saveRegistrationProcess, getRegistrationProgress } from '../registrationUtils';

const PhotoScreen = () => {
    const navigation = useNavigation();
    const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']); // the array of the images for the grid
    const [imageUrl, setImageUrl] = useState(""); // hold one image url 

    const handleAddImage = () => {
        /* find the first empty slot in the array */
        // .findIndex goes through each element in the array and returns the index of the first element that matches the condition
        // url is the name of the variable that represents each elemnt in the array and === '' checks if the url is '' 
        const index = imageUrls.findIndex(url => url === ''); // find the first empty string in the array
        if (index !== -1) { // if no empty slot is found
            const updatedUrls = [...imageUrls]; // copies array into a new one called updated arrays  
            updatedUrls[index] = imageUrl;
            setImageUrls(updatedUrls); // updates the state with the new array
            setImageUrl(""); // clears the input field after adding the image
        }
    }

    useEffect(() => {
        // get the saved image urls from AsyncStorage and set them to the state
        getRegistrationProgress('Photos').then(progressData => {
            if (progressData && progressData.imageUrls) {
                setImageUrls(progressData.imageUrls || ['', '', '', '', '', '']);
            }
        });
    }, []);

    const handleNext = () => {
        saveRegistrationProcess('Photos', { imageUrls });
        navigation.navigate("PreFinal");
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
                            name="camera"
                            size={26}
                            color="black"
                        />
                    </View>
                    <Image
                        style={{
                            width: 100,
                            height: 40,
                            borderRadius: 10,
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
                        }}
                    />

                </View>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: "black", marginTop: 25, fontFamily: "GeezaPro-Bold" }}>Pick your photos</Text>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 20 }}>
                        {/* array of image urls , get first three items of array, .map means loop over each of those 3 and return UI element for each one */}
                        {imageUrls?.slice(0, 3).map((url, index) => (
                            <Pressable key={index} style={{ borderColor: "#581845", borderWidth: url ? 0 : 2, flex: 1, justifyContent: "center", alignItems: "center", borderStyle: "dashed", borderRadius: 10, height: 100 }}>
                                {url ? (
                                    <Image source={{ uri: url }} />
                                ) : (
                                    <EvilIcons name="image" size={22} color="black" />
                                )}
                            </Pressable>
                        ))}
                    </View>

                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 20 }}>
                        {/* array of image urls , get first three items of array, .map means loop over each of those 3 and return UI element for each one */}
                        {imageUrls?.slice(0, 3).map((url, index) => (
                            <Pressable key={index} style={{ borderColor: "#581845", borderWidth: url ? 0 : 2, flex: 1, justifyContent: "center", alignItems: "center", borderStyle: "dashed", borderRadius: 10, height: 100 }}>
                                {url ? (
                                    <Image source={{ uri: url }} />
                                ) : (
                                    <EvilIcons name="image" size={22} color="black" />
                                )}
                            </Pressable>
                        ))}
                    </View>

                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ color: "gray", fontSize: 15 }}>Drag to reorder</Text>
                    <Text style={{ fontSize: 15, fontWeight: "500", marginTop: 3, color: "#581845" }}>Add four to six photos</Text>
                </View>
                <View style={{ marginTop: 25 }}>
                    <Text>Add a picture of yourself</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: 5, borderRadius: 5, marginTop: 10, backgroundColor: "#DCDCDC" }}>
                        <EvilIcons style={{ marginLeft: 8 }} name="camera" size={22} color="black" />
                        <TextInput
                            value={imageUrl}
                            onChangeText={text => setImageUrl(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder="Enter your image url"
                        />
                    </View>
                    <Button title="Add Photo" onPress={handleAddImage} />
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

export default PhotoScreen;

const styles = StyleSheet.create({
}); 