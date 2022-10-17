import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <ImageBackground
            source={require('../img/home_bg.png')}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            <SafeAreaView style={styles.container}>
                <Text style={{ color: "#fff" }}>Home Screen</Text>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default HomeScreen;