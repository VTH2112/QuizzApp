import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { geography, history } from '../components/Question';
import Options from '../components/Options';
import moment from 'moment';

const BeginnerScreen = ({ navigation }) => {


    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        console.log(geography);


    }, []);


    return (
        <ImageBackground
            source={require('../img/home_bg.png')}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            <View style={{ flex: 1, backgroundColor: "black", width: "100%", height: "100%", position: "absolute", opacity: 0.3 }}>
            </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>CATEGORY: geography</Text>
                    <Text style={styles.headerText}>Quiz: 1</Text>
                </View>
                <View style={styles.QuesContain}>
                    <Image style={{ borderRadius: 45 }} source={require('../img/img.png')} />
                </View>
                <View style={styles.optionsContain}>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>Duration: 5 min</Text>
                        <Text style={styles.contentText}>Question per quiz: 7</Text>
                        <Text style={styles.contentText}>Reward: 30 point</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#FF2983",
                        alignItems: "center",
                        paddingVertical: 15,
                    }}
                        onPress={() => {
                            navigation.navigate('QuestionScreen')
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", alignSelf: "center" }}>Start</Text>
                    </TouchableOpacity>
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
        height: "20%",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 20,
        textTransform: "uppercase",
        textAlign: "center"


    },
    QuesContain: {
        width: "100%",
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
    },
    optionsContain: {
        width: "100%",
        height: "25%",
        alignItems: "center",
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
        justifyContent: "center",
        alignItems: "center",
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
    contentText: {
        fontSize: 23,
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
        marginBottom: 5,
        width: "58%",

    }



});

export default BeginnerScreen;