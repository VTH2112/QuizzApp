import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput, View, ImageBackground, Image, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../redux/actions/addAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import api from '../api/api';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [user, setUser] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    var linkAvatar = null
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        getUserProfile();
    }, []);
    const userInfo = useSelector((state) => state.userInfo.userInfo[0]);
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
            console.log('user Profile', res.data);

            setUser(res.data)

        } catch (err) {
            console.log(err);
            Alert.alert(err.message);
        }
    }
    if (linkAvatar == null) {
        linkAvatar = user.avt
    }
    return (
        <ImageBackground
            source={require('../img/BG.png')}
            style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                opacity: 1,
                backgroundColor: "black",
                height: "100%",
            }}>
            <LinearGradient
                colors={["#3F364E", "#A22D4E"]}
                start={{ x: 0.1, y: 0.2 }}
                end={{ x: 0, y: 0.6 }}
                style={styles.linearGradient}
            />
            <ImageBackground
                source={require('../img/BGG.png')}
                style={{
                    width: "100%",
                    alignItems: "center",
                    opacity: 0.6,
                    height: "80%",
                    position: "absolute",
                    top: 0,
                }}></ImageBackground>
            <SafeAreaView style={styles.container}>
                {
                    isLoading  ? <ActivityIndicator size="large" color="#fff" /> : (
                        <>
                            <View style={{ justifyContent: "center", width: "100%", alignItems: "flex-start", paddingHorizontal: 30, marginTop: -80 }}>
                                {
                                    user.username !== undefined ? <Text style={{ color: "#fff", fontSize: 43.08, }}>Hello, {user?.username.replace(/[`'",]/gi, "")}</Text> : null
                                }

                            </View>
                            <View style={{ width: "90%", height: 372, justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                                <View style={styles.Block}>
                                </View>
                                <View style={{ width: "100%", height: "100%", marginTop: 0 }}>

                                    {/* <View style={{ justifyContent: "center", width: "100%", alignItems: "flex-start", paddingHorizontal: 30, marginBottom: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 18.22, }}></Text>
                        </View> */}
                                    <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
                                        <View style={{ flex: 1, width: "100%", position: "absolute", top: -80, justifyContent: "center", alignItems: 'center' }}>
                                            <Image source={{ uri: linkAvatar }} style={{ width: 130, height: 130, borderRadius: 130 / 2 }} />
                                        </View>
                                        <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
                                            <View style={styles.blockLeft}>
                                                <View style={styles.blockItem}>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "center", width: "100%" }}>DAILY quiz</Text>
                                                </View>
                                                <View style={[styles.blockItem, { alignItems: "flex-start", paddingHorizontal: 10 }]}>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "left" }}>Total Quiz {user.score}</Text>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "left" }}>Total Gems {user.score}</Text>
                                                </View>
                                                <View style={styles.blockItem}>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "center" }}>From 22 April 2022{"\n"}till date</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: "1%", height: "60%", backgroundColor: "#fff", alignSelf: "center" }}></View>
                                            <View style={styles.blockRight}>
                                                <View style={styles.blockItem}>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "center", width: "100%" }}>LIVE quiz</Text>
                                                </View>
                                                <View style={[styles.blockItem, { alignItems: "flex-start", paddingHorizontal: 10 }]}>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "left" }}>Total Quiz {user.score}</Text>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "left" }}>Total Gems {user.score}</Text>
                                                </View>
                                                <View style={styles.blockItem}>
                                                    <Text style={{ color: "#fff", fontSize: 18.22, textAlign: "center" }}>From 22 April 2022{"\n"}till date</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{
                                width: "90%", backgroundColor: "rgba(255, 41, 131, 1)", alignItems: "flex-start", justifyContent: "center", borderRadius: 30, shadowColor: "#000", paddingHorizontal: 20, paddingVertical: 10,
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.37,
                                shadowRadius: 7.49,

                                elevation: 12,
                                marginTop: 50
                            }}
                            >
                                <Text style={{ fontSize: 23.14, color: "white", textAlign: "left" }} >
                                    Invite a friend & earn 100 gems
                                </Text>
                                <Text style={{ fontSize: 18.14, color: "white", textAlign: "left" }} >
                                    Share the app on social media
                                </Text>
                            </TouchableOpacity>
                        </>
                    )
                }
            </SafeAreaView>
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        zIndex: 1,
        position: "absolute",
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        opacity: 0.55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Block: {
        width: "100%",
        height: 372,
        backgroundColor: "black",
        opacity: 0.55,
        borderRadius: 50,
        position: "absolute",


    },
    blockLeft: {
        width: "49%",
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 10
    },
    blockItem: {
        width: "100%",
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    blockRight: {
        width: "49%",
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 10
    },


});

export default ProfileScreen;