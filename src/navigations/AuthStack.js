import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='WelcomeScreen'>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} option={{ title: 'WelcomeScreen' }} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} option={{ title: 'SignInScreen' }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} option={{ title: 'SignUpScreen' }} />
            <Stack.Screen name="HomeStack" component={HomeScreen} option={{ title: 'HomeScreen' }} />
        </Stack.Navigator>

    )
}

export default AuthStack;