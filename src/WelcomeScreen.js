import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, Image, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import navigation from '@react-navigation/native';
const WelcomeScreen = ({ navigation }) => {
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
            <SafeAreaView style={styles.container}>
                <View style={{ width: "100%", marginTop: 237 }}>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Image source={require('./img/EINSTEEN.png')} style={{ height: 88, resizeMode: "contain" }} />
                    </View>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                        <View style={{ width: "15%", alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ color: "#fff", fontSize: 40.19 }}>Q</Text>
                        </View>
                        <View style={{ width: "15%", alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ color: "#fff", fontSize: 40.19 }}>U</Text>
                        </View>
                        <View style={{ width: "15%", alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ color: "#fff", fontSize: 40.19 }}>I</Text>
                        </View>
                        <View style={{ width: "15%", alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ color: "#fff", fontSize: 40.19 }}>Z</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    width: "100%", marginTop: 150, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{ justifyContent: "space-around", width: 218, height: 106 }}>
                        <TouchableOpacity style={{
                            backgroundColor: "#fff", width: 218, height: 37, borderRadius: 20, alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: "black", fontSize: 18.22, textAlign: "center", fontFamily: "ABeeZee" }}>Login with google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: "#fff", width: 218, height: 37, borderRadius: 20, alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: "black", fontSize: 18.22, textAlign: "center" }}>Login with facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "60%", flexDirection: "row", marginTop: -10, marginLeft: -30, justifyContent: "space-between" }}>
                        <TouchableOpacity style={{ width: "45%", justifyContent: "flex-start", alignItems: "center" }}
                            onPress={() => {
                                navigation.navigate("SignUpScreen")
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 13.63, textAlign: "center", marginTop: 20 }}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: "50%", justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <Text style={{ color: "#fff", fontSize: 13.63, textAlign: "center", marginTop: 20 }}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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

});

export default WelcomeScreen;