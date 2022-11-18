import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, TouchableOpacity, BackHandler, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuesCorrect, deleteReward } from "../redux/actions/deleteAction";
const RewardScreen = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const reward = useSelector((state) => state.userInfo.reward)
    const quesCorrect = useSelector((state) => state.userInfo.quesCorrect)
    const [rewardTotal, setRewardTotal] = React.useState(0);
    const [quesCorrectTotal, setQuesCorrectTotal] = React.useState(0);
    const dispatch = useDispatch();
    console.log(reward);
    // console.log(quesCorrect);
    const backAction = () => {
        navigation.navigate('Home');
        dispatch(deleteReward());
        dispatch(deleteQuesCorrect());
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        reward.forEach((item) => {
            setRewardTotal(rewardTotal => rewardTotal + item.reward)
            setQuesCorrectTotal(quesCorrectTotal => quesCorrectTotal + item.quesCorrect)
        })
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        }
    }, []);

    return (
        <ImageBackground
            source={require('../img/home_bg.png')}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            {/* <SafeAreaView style={styles.container}> */}
            <View style={{ flex: 1, backgroundColor: "black", width: "100%", height: "100%", position: "absolute", opacity: 0.3 }}>
            </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>SCOREBOARD</Text>
                    <Text style={styles.headerText}>{quesCorrectTotal} of {route.params.getListQuesLength} CORRECT</Text>
                </View>
                <View style={styles.QuesContain}>
                    <Text style={styles.QuesText}>
                        YAYY!!{"\n"}
                        YOU HAVE ANSWERED ALL {"\n"}QUESTIONS OF <Text style={{ color: "#fff" }} >QUIZ 1</Text>{"\n"}CORRECTLY
                    </Text>
                </View>
                <View style={styles.optionsContain}>
                    <Text style={styles.contentText}><Text style={{ color: "rgba(246, 208, 80, 1)" }}>{rewardTotal} GEMS </Text>added to your{"\n"}account</Text>
                </View>
                <View style={styles.bottom}>
                    {
                        route.params.getListQuesLength > 0 ?
                            <TouchableOpacity style={{
                                width: "100%",
                                height: "70%",
                                backgroundColor: "#FF2983",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 15,
                            }}
                                onPress={() => {
                                    navigation.navigate('ScoreBoardScreen')
                                    dispatch(deleteReward());
                                    dispatch(deleteQuesCorrect());
                                }}
                            >
                                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", alignSelf: "center" }}>Move to QUIZ 2</Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
            </View>
            {/* </SafeAreaView> */}
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
        textAlign: "left"
    },
    QuesText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "rgba(255, 41, 131, 1)",
        paddingHorizontal: 20,
        textTransform: "uppercase",
        textAlign: "left",
        width: "100%",
    },
    QuesContain: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
    },
    optionsContain: {
        width: "100%",
        height: "25%",
        alignItems: "center",
        justifyContent: "center",
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
        width: "100%",
        paddingHorizontal: 20,

    }


});

export default RewardScreen;