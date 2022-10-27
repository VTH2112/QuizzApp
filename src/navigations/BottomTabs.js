import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreScreen from '../screens/StoreScreen';
import LiveScreen from '../screens/LiveScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarActiveTintColor: "white",
                headerShown: false
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Image source={require('../img/homeIcon.png')} style={{ width: 21.09, height: 23.72, tintColor: color }} />
                    },
                }}
            />
            <Tab.Screen name="Store" component={StoreScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Image source={require('../img/storeIcon.png')} style={{ width: 26.48, height: 23.72, tintColor: color }} />
                    )
                }}
            />
            <Tab.Screen name="Live" component={LiveScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Image source={require('../img/liveIcon.png')} style={{ width: 26.36, height: 23.72, tintColor: color }} />
                    )
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Image source={require('../img/accIcon.png')} style={{ width: 26.36, height: 26.36, tintColor: color }} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 64,
        paddingTop: 10,
        borderTopWidth: 0,
        backgroundColor: 'rgba(108, 28, 50, 1)',
        position: 'absolute',
        elevation: 0,
    },
    tabBarLabelStyle: {
        marginBottom: 5,
        paddingBottom: 5,
        fontSize: 14.15,
        fontWeight: "bold",
    }
});