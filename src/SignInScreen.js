import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, Image, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import navigation from '@react-navigation/native';
const SignInScreen = ({ navigation }) => {
    const [Password, onChangePassword] = React.useState('');
    const [Email, onChangeEmail] = React.useState('');
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <ImageBackground
            source={require('./img/BG.png')}
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
                source={require('./img/BGG.png')}
                style={{
                    width: "100%",
                    alignItems: "center",
                    opacity: 0.6,
                    height: "80%",
                    position: "absolute",
                    top: 0,
                }}></ImageBackground>
            <SafeAreaView style={styles.container}>
                <View style={{ width: "80%", height: 372, justifyContent: "center", alignItems: "center", marginTop: 120 }}>
                    <View style={styles.Block}>
                    </View>
                    <View style={{ width: "100%", height: "100%", marginTop: 50 }}>
                        <View style={{ justifyContent: "center", width: "100%", alignItems: "flex-start", paddingHorizontal: 30, marginBottom: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 43.08, }}>Sign In</Text>
                        </View>
                        <View style={{ justifyContent: "center", width: "100%", alignItems: "flex-start", paddingHorizontal: 30, marginBottom: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 18.22, }}></Text>
                        </View>
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <View style={styles.inputBlock}>
                                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(88, 88, 88, 1)"
                                    onChangeText={(text) => { onChangeEmail(text) }}
                                    value={Email}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(88, 88, 88, 1)"
                                    onChangeText={(text) => { onChangePassword(text) }}
                                    value={Password}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ position: "absolute", width: "100%", backgroundColor: "rgba(255, 41, 131, 1)", bottom: 0, height: 80, alignItems: "center", justifyContent: "center" }}
                    onPress={() => navigation.navigate('SignInScreen')}
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
        height: 372,
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

export default SignInScreen;