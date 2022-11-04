import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, Image, View, ImageBackground, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import navigation from '@react-navigation/native';
import api from '../api/api';
import SignInScreen from "./SignInScreen";
import AntDesign from 'react-native-vector-icons/AntDesign';
const SignUpScreen = ({ navigation }) => {
    const [userName, onChangeUserName] = React.useState('');
    const [Password, onChangePassword] = React.useState('');
    const [Email, onChangeEmail] = React.useState('');
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const onSignUp = async ({ Email, userName, Password }) => {
        console.log(Email, userName, Password);
        try {
            const res = await api.post('https://backend-quiz-mindx.herokuapp.com/user/register', {
                "email": `"${Email}"`,
                "username": `"${userName}"`,
                "password": `"${Password}"`
            });
            console.log(res.data);
            if (res.data.success == true) {
                Alert.alert("Thông báo", "Sign Up Success",
                    [{
                        text: "OK",
                        onPress: () => navigation.navigate('SignInScreen')

                    }]
                );
            } else {
                alert("Email or Password is incorrect");
            }
        } catch (err) {
            console.log(err);
        }
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
                <TouchableOpacity style={{ position: "absolute", top: 20, left: 20 }} onPress={() => {
                    navigation.navigate('WelcomeScreen');
                }}>
                    <AntDesign name="arrowleft" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{ width: "80%", height: 472, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <View style={styles.Block}>
                    </View>
                    <View style={{ width: "100%", height: "100%", marginTop: 50 }}>
                        <View style={{ justifyContent: "center", width: "100%", alignItems: "flex-start", paddingHorizontal: 30, marginBottom: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 43.08, }}>Sign Up</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "100%", alignItems: "flex-start", paddingHorizontal: 30, marginBottom: 20 }}>
                            {/* <Text style={{ color: "#fff", fontSize: 18.22, }}>STEP 1 of 2</Text> */}
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <View style={styles.inputBlock}>
                                <TextInput style={styles.input} placeholder="User Name" placeholderTextColor="rgba(88, 88, 88, 1)"
                                    onChangeText={(text) => { onChangeUserName(text) }}
                                    value={userName}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(88, 88, 88, 1)"
                                    onChangeText={(text) => { onChangePassword(text) }}
                                    value={Password}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(88, 88, 88, 1)"
                                    onChangeText={(text) => { onChangeEmail(text) }}
                                    value={Email}
                                />
                            </View>
                            <View style={{ justifyContent: "center", width: "100%", alignItems: "flex-end", height: 50, paddingRight: 40 }}>
                                <TouchableOpacity style={{
                                    backgroundColor: "#fff", padding: 5, borderRadius: 50, paddingHorizontal: 10,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 8,
                                    },
                                    shadowOpacity: 0.46,
                                    shadowRadius: 11.14,

                                    elevation: 17,
                                }} onPress={() => { navigation.navigate(SignInScreen) }}>
                                    <Text style={{ color: "black", fontSize: 15, }}>Login ?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ position: "absolute", width: "100%", backgroundColor: "rgba(255, 41, 131, 1)", bottom: 0, height: 80, alignItems: "center", justifyContent: "center" }}
                    onPress={() => {
                        if (Email == "") {
                            alert("Email must not be empty");
                        }
                        else if (Password == "") {
                            alert("Password must not be empty");
                        }
                        else if (userName == "") {
                            alert("User Name must not be empty");
                        }
                        else {
                            console.log(Email, userName, Password);
                            onSignUp({ Email, userName, Password })

                        }


                    }}
                >
                    <Text style={{ fontSize: 28.14, color: "white" }} >
                        OKAY
                    </Text>
                </TouchableOpacity>
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
        height: 472,
        backgroundColor: "black",
        opacity: 0.55,
        borderRadius: 50,
        position: "absolute",


    },
    inputBlock: {
        width: "85%",
        borderRadius: 10,
        // paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(88, 88, 88, 1)",
        justifyContent: "center",
        alignSelf: "center",
    },
    input: {
        color: "#fff",
    }


});

export default SignUpScreen;