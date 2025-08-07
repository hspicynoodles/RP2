import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, Button, BackHandler } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { BottomModal } from 'react-native-modals';
import { ModalTitle } from 'react-native-modals';
import { SlideAnimation } from 'react-native-modals';
import { ModalContent } from 'react-native-modals';


const ShowPromptsScreen = () => {
    const navigation = useNavigation();
    const [prompt, setPrompts] = useState([]);
    const [option, setOption] = useState('About me');
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const addPrompt = () => {
        const newPrompt = { question, answer };
        setPrompts([...prompts, newPrompt]);
        setQuestion("");
        setAnswer("");
        setModalVisible(false);
        if (prompt.length == 3) {
            setModalVisible(false);
            navigation.navigate("Prompts", {
                prompt: prompt
            })
        }
    }
    const openModal = item => {
        setModalVisible(!isModalVisible);
        setQuestion(item?.question);
    }
    const prompts = [
        {
            id: '0',
            name: 'About me',
            questions: [
                {
                    id: '10',
                    question: 'A random face I love is',
                },
                {
                    id: '11',
                    question: 'Typical Sunday'
                }

            ]
        }, {
            id: '1',
            name: 'Self Care',
            questions: [
                {
                    id: '12',
                    question: 'A self-care practice I enjoy is',
                },
                {
                    id: '13',
                    question: 'My favorite way to relax is'
                }
            ]

        }, {
            id: '2',
            name: 'Fun Facts',
            questions: [
                {
                    id: '14',
                    question: 'A fun fact about me is',
                },
                {
                    id: '15',
                    question: 'My guilty pleasure is'
                }
            ]
        }, {
            id: '3',
            name: 'Favorites',
            questions: [
                {
                    id: '16',
                    question: 'My favorite book is',
                },
                {
                    id: '17',
                    question: 'My favorite movie is'
                }
            ]
        }
    ]


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: "White" }}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontWeight: "500", color: "#581845" }}>View All</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#581845" }}>Prompts</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 20, flexDirection: "row", gap: 10 }}>
                    {prompts.map((item, index) => (

                        <View key={index}>
                            <Pressable
                                onPress={() => setOption(item?.name)}
                                style={{ padding: 10, borderRadius: 20, backgroundColor: option == item?.name ? "#581545" : "white" }}>
                                <Text style={{ textAlign: "center", color: option == item?.name ? "white" : "black" }}>{item?.name}</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
                <View style={{ marginTop: 20, marginHorizontal: 12 }}>
                    {prompts?.map((item, index) => (
                        <View key={index}>
                            {option == item?.name && (
                                <View>
                                    {item?.questions?.map((question, index) => (
                                        <Pressable onPress={() => openModal(question)} style={{ marginVertical: 12 }} >
                                            <Text style={{ fontSize: 15, fontWeight: "500" }}>{question?.question}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            )}
                        </View>

                    ))}
                </View>

            </SafeAreaView>
            <BottomModal
                onBackDropPress={() => setModalVisible(!isModalVisible)}
                onHardwareBackPress={() => setModalVisible(!isModalVisible)}
                swipeDirection={['up', 'down']}
                swipeThreshold={200}
                modalTitle={<ModalTitle title="Answer the question" />}
                modelAnimation={
                    new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                visible={isModalVisible}
                onTouchOutside={() => setModalVisible(!isModalVisible)}>
                <ModalContent style={{ width: "100%", height: 250 }}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 15 }}>Answer your question</Text>
                        <Text style={{ marginTop: 15, fontSize: 20, fontWeight: "600" }}>{question}</Text>
                    </View>
                    <View style={{ borderColor: "#202020", borderWidth: 1, padding: 10, borderRadius: 10, height: 100, marginVertical: 12, borderStyle: "dashed" }}>
                        <TextInput style={{ color: "gray", width: 300, fontSize: answer ? 18 : 18 }} value={answer} onChangeText={text => setAnswer(text)}
                            placeholder='Enter your answer' />
                    </View>
                    <Button onPress={addPrompt} title="Add prompt" />
                </ModalContent>
            </BottomModal>
        </>
    )
}

export default ShowPromptsScreen;

const styles = StyleSheet.create({
}); 