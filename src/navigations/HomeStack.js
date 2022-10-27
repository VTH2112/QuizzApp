import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionScreen from '../screens/QuestionScreen';
import BeginnerScreen from '../screens/BeginnerScreen';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={BottomTabs} option={{ title: 'HomeScreen' }} />
            <Stack.Screen name="BeginnerScreen" component={BeginnerScreen} option={{ title: 'BeginnerScreen' }} />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} option={{ title: 'QuestionScreen' }} />
        </Stack.Navigator>
    )
}

export default HomeStack;