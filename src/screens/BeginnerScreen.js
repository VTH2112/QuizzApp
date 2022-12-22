import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, View, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { geography, history } from '../components/Question';
import Options from '../components/Options';
import moment from 'moment';
import api from '../api/api';
import { min } from "react-native-reanimated";
import { useSelector } from "react-redux";

const BeginnerScreen = ({ navigation, route }) => {
    const userInfo = useSelector((state) => state.userInfo.userInfo[0]);
    const [getListQues, setListQues] = useState([]);
    const [reward, setReward] = useState(0);
    const [time, setTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        console.log(geography);

        getListQuiz()
    }, []);

    const getListQuiz = async () => {
        var temp = 0
        var point = 0
        try {
            console.log("Link ", `https://backendquizapp.onrender.com/questions/${route.params.id}`, route.params);
            const res = await api.get(`https://backendquizapp.onrender.com/questions/${route.params.id}`,
                {
                    method: 'GET',
                    headers: {
                        //this what's exactly look in my postman
                        Authorization: "Bearer" + userInfo.accessToken,
                        id: userInfo.userId,
                    },
                }
            ).finally(() => {
                console.log('finally');
                setIsLoading(false);
            });
            console.log('lisstQuiz', res.data.data);

            setListQues(res.data.data.filter((item) => item.answers.length !== 0))
            res.data.data.forEach((item, index) => {
                console.log(item.duration);
                if (item.duration !== undefined) {
                    var time = item.duration.replace('s', '')
                    temp = temp + parseInt(time)
                    point = point + parseInt(item.reward)
                }

            })
            setReward(point)
            setTime(temp)

        } catch (err) {
            console.log(err);
            Alert.alert(err.message);
        }
    }

    return (
        <ImageBackground
            source={require('../img/home_bg.png')}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            <View style={{ flex: 1, backgroundColor: "black", width: "100%", height: "100%", position: "absolute", opacity: 0.3 }}>
            </View>
            <View style={styles.container}>
                {
                    isLoading ? <ActivityIndicator size="large" color="#fff" /> : (
                        <>
                            {
                                getListQues.length !== 0 ? (
                                    <>
                                        <View style={styles.header}>
                                            <Text style={styles.headerText}>CATEGORY: {route.params.title}</Text>
                                            <Text style={styles.headerText}>Quiz: 1</Text>
                                        </View>
                                        <View style={styles.QuesContain}>
                                            <Image style={{ borderRadius: 45 }} source={require('../img/img.png')} />
                                        </View>
                                        <View style={styles.optionsContain}>
                                            <View style={styles.content}>
                                                <Text style={styles.contentText}>Duration: {time > 60 ? ((time / 60).toFixed() + ' min ' + (time % 60) + ' s') : (time % 60) + ' sec'} </Text>
                                                <Text style={styles.contentText}>Question per quiz: {getListQues.length}</Text>
                                                <Text style={styles.contentText}>Reward: {reward} point</Text>
                                            </View>
                                        </View>
                                        <View style={styles.bottom}>
                                            {
                                                getListQues.length > 0 ?
                                                    <TouchableOpacity style={{
                                                        width: "100%",
                                                        height: "70%",
                                                        backgroundColor: "#FF2983",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        paddingVertical: 15,
                                                    }}
                                                        onPress={() => {
                                                            navigation.navigate('QuestionScreen', { getListQues: getListQues, duration: time })
                                                        }}
                                                    >
                                                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", alignSelf: "center" }}>Start</Text>
                                                    </TouchableOpacity>
                                                    : null
                                            }
                                        </View>
                                    </>
                                ) :
                                    (
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", alignSelf: "center" }}>No question</Text>
                                        </View>
                                    )
                            }
                        </>
                    )
                }

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