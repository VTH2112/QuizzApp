import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { geography, history } from '../components/Question';
import Options from '../components/Options';
import moment from 'moment';
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux'
import { addReward } from '../redux/actions/addAction'
const QuestionScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(route.params.duration % 60);
    const [minutes, setMinutes] = useState(route.params.duration < 60 ? 0 : (route.params.duration / 60).toFixed());
    let getListQues = route.params.getListQues;
    const reward = useSelector((state) => state.userInfo.reward)
    const [point, setPoint] = useState(0);
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
                <Options quesNum={quesNum} ansLength={quesNum.length} item={item} index={index} isSelect={isSelect} />
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
                    <Text style={styles.headerText}>Question {index + 1} of {getListQues.length}</Text>
                </View>
                <View style={styles.QuesContain}>
                    <Text style={{ color: "#fff", fontSize: 25, paddingHorizontal: 20 }}>{getListQues.length > 0 ? getListQues[index].question : null}</Text>
                </View>
                <View style={styles.optionsContain}>
                    <View style={styles.content}>
                        <FlatList
                            data={getListQues[index]?.answers}
                            renderItem={renderQuestion}
                        />
                    </View>
                    <View style={styles.button}>
                        {
                            index === getListQues.length - 1 ?
                                <TouchableOpacity style={styles.buttonContain}
                                    onPress={() => {
                                        if (isSelect !== '') {
                                            if (getListQues[index].answers[isSelect].is_correct === true) {
                                                dispatch(addReward(parseInt(getListQues[index].reward)))
                                            }
                                        }
                                        else {
                                            dispatch(addReward(0))
                                        }
                                        navigation.navigate('RewardScreen')
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontSize: 18 }}>Submit</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.buttonContain}
                                    onPress={() => {
                                        if (index < getListQues.length - 1) {
                                            setIndex(index + 1);
                                            setIsSelect('');
                                        }
                                        if (isSelect !== '') {
                                            if (getListQues[index].answers[isSelect].is_correct === true) {
                                                dispatch(addReward(parseInt(getListQues[index].reward)))
                                            }
                                        }
                                        else {
                                            dispatch(addReward(0))
                                        }
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontSize: 18 }}>Next</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.countDown}>
                        <Text style={{ color: "#fff", fontSize: 25 }}> {minutes} : {seconds < 10 ? "0" + seconds : seconds} {route.params.duration < 60 ? "Sec" : "Min"} Left</Text>
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