import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, View, FlatList, TouchableOpacity } from 'react-native';
import { geography, history } from '../components/Question';
import Options from '../components/Options';
import moment from 'moment';

const QuestionScreen = ({ navigation }) => {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(5);

    useEffect(() => {
        let interval = null;
        if (minutes !== 0 || seconds !== 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
            if (seconds === 0) {
                setMinutes(minutes => minutes - 1);
                setSeconds(60);
            }
        } else if (minutes === 0 && seconds === 0) {
            clearInterval(interval);
            alert('Time is up');
        }
        return () => clearInterval(interval);
    }, [seconds]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        console.log(geography);


    }, []);

    const [index, setIndex] = React.useState(0);
    const [isSelect, setIsSelect] = React.useState('');
    const renderQuestion = ({ item, index }) => {
        // console.log(item);
        let quesNum = ["A", "B", "C", "D"];
        return (
            <TouchableOpacity style={{ flex: 1, marginVertical: 5, justifyContent: "flex-start", }}
                onPress={() => {
                    setIsSelect(index)
                }}
            >
                <Options quesNum={quesNum} item={item} index={index} isSelect={isSelect} />
            </TouchableOpacity>

        )
    }

    return (
        <ImageBackground
            source={require('../img/home_bg.png')}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            <View style={{ flex: 1, backgroundColor: "black", width: "100%", height: "100%", position: "absolute", opacity: 0.3 }}>
            </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Question {index + 1} of {geography.length}</Text>
                </View>
                <View style={styles.QuesContain}>
                    <Text style={{ color: "#fff", fontSize: 25, paddingHorizontal: 20 }}>{geography[index].question}</Text>
                </View>
                <View style={styles.optionsContain}>
                    <View style={styles.content}>
                        <FlatList
                            data={geography[index].options}
                            renderItem={renderQuestion}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.buttonContain}
                            onPress={() => {
                                if (index < geography.length - 1) {
                                    setIndex(index + 1);
                                    setIsSelect('');
                                }
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 18 }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.countDown}>
                        <Text style={{ color: "#fff", fontSize: 25 }}> {minutes} : {seconds < 10 ? "0" + seconds : seconds} Min Left</Text>
                    </View>
                </View>
            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
    },
    header: {
        width: "100%",
        height: "30%",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 20,

    },
    QuesContain: {
        width: "100%",
        height: "15%",
    },
    optionsContain: {
        width: "100%",
        height: "35%",
    },
    bottom: {
        width: "100%",
        height: "15%",
    },
    button: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "100%",
        height: "80%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingHorizontal: 20,
    },
    buttonContain: {
        width: "80%",
        height: "80%",
        backgroundColor: "#FF2983",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    countDown: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FF2983",
        alignItems: "center",
        paddingVertical: 15,
    }



});

export default QuestionScreen;