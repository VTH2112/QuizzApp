import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, TouchableOpacity, BackHandler, View, Image, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuesCorrect, deleteReward } from "../redux/actions/deleteAction";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import api from '../api/api';
const ScoreBoardScreen = ({ navigation, route }) => {
    let [topUsers, setTopUsers] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const userInfo = useSelector((state) => state.userInfo.userInfo[0]);
    var point = null
    const [email, setEmail] = React.useState('');
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    useEffect(() => {
        getListTopUsers();
        getUserProfile();

    }, []);
    if (point == null) {
        if (topUsers.length > 0 && user.email !== undefined) {
            topUsers.forEach((element, index) => {
                if (element.email == JSON.parse(user?.email)) {
                    point = element.score

                }
            })
        }
    }
    const getUserProfile = async () => {
        try {
            const res = await api.get('https://backendquizapp.onrender.com/user/profile',
                {
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer " + userInfo.accessToken,
                        id: userInfo.userId,
                    },
                }
            ).finally(() => setIsLoading(false));
            console.log('user Profile', JSON.parse(res.data.email));
            setEmail(JSON.parse(res.data.email))
            setUser(res.data)

        } catch (err) {
            console.log(err);
            Alert.alert(err.message);
        }
    }
    const getListTopUsers = async () => {
        var temp = 0
        var point = 0
        try {
            const res = await api.get('https://backendquizapp.onrender.com/user/top-winner'
                // ,
                //     {
                //         method: 'GET',
                //         headers: {
                //             Authorization: "Bearer "+ userInfo.accessToken,
                //             id: userInfo.userId,
                //         },
                //     }
            );
            console.log('Top 10 Users', res.data);
            // console.log('Top 10 Users', JSON.parse(res.data.email));
            setTopUsers(res.data)

        } catch (err) {
            console.log(err);
        }
    }
    topUsers.sort((a, b) => {
        return b.score - a.score;
    });
    topUsers = topUsers.filter((element, index) => {
        return index === 0 || element.score !== topUsers[index - 1].score;
    });

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.item]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.avt }} />
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', borderColor: item.email == email ? "#fff" : null, borderWidth: item.email == email ? 3 : null }, styles.contentItem]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: "#fff" }}>{item.username}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10, color: "rgba(246, 208, 80, 1)" }}>{item.score} GEMS</Text>
                    {/* <Image style={{ width: 50, height: 50 }} source={require('../img/coin.png')} /> */}
                </View>
            </View >

        )
    }
    return (
        <ImageBackground
            source={require('../img/home_bg.png')}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            {/* <SafeAreaView style={styles.container}> */}
            {
                isLoading ? <ActivityIndicator size="large" color="#fff" /> : (
                    <>
                        <View style={{ flex: 1, backgroundColor: "black", width: "100%", height: "100%", position: "absolute", opacity: 0.3 }}>
                        </View>
                        <View style={styles.container}>
                            <EvilIcons name="user" size={50} color="white" style={{ position: 'absolute', top: 20, right: 20 }} onPress={() => navigation.goBack()} />
                            <View style={styles.header}>
                                <Text style={styles.headerText}>SCOREBOARD</Text>
                                <Text style={[styles.headerText, { fontSize: 20 }]}>Top 10 Winners </Text>
                            </View>
                            <View style={{ width: "100%", height: "65%" }}>
                                <FlatList
                                    data={topUsers}
                                    renderItem={renderItem}
                                />
                            </View>
                            {
                                <View style={styles.bottom}>
                                    <Text style={{ fontSize: 25, color: "#fff", textAlign: "center" }}>YAYY! YOU HAVE WON <Text> {point} </Text>GEMS</Text>
                                </View>
                            }
                        </View>
                    </>
                )
            }
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
        height: "30%",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 20,
        textTransform: "uppercase",
        textAlign: "left",
        paddingVertical: 20,
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

    },
    item: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10
    }
    ,
    itemText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "left",
        marginBottom: 5,
        width: "100%",
        paddingHorizontal: 20,

    },

    contentItem: {
        flex: 1,
        height: "100%",
        backgroundColor: "rgba(255, 41, 131, 1)",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 50,

    }


});

export default ScoreBoardScreen;