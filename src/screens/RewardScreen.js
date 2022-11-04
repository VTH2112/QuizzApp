import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
const RewardScreen = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const reward = useSelector((state) => state.userInfo.reward)
    console.log(reward);
    return (
        <ImageBackground
            source={require('../img/home_bg.png')}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            {/* <SafeAreaView style={styles.container}> */}
            <TouchableOpacity style={styles.container}
               
            >
                <Text style={{ color: "#fff" }}>Reward Screen</Text>
                <Text style={{ color: "#fff" }}>{reward}</Text>
            </TouchableOpacity>
            {/* </SafeAreaView> */}
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

export default RewardScreen;