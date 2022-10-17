import React from "react";
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const StoreScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Store Screen</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default StoreScreen;