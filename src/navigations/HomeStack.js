import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionScreen from '../screens/QuestionScreen';
import BeginnerScreen from '../screens/BeginnerScreen';
import RewardScreen from '../screens/RewardScreen';
import BottomTabs from './BottomTabs';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation}) => {
    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={BottomTabs} option={{ title: 'HomeScreen' }} />
            <Stack.Screen name="BeginnerScreen" component={BeginnerScreen} option={{ title: 'BeginnerScreen' }} />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} option={{ title: 'QuestionScreen' }} />
            <Stack.Screen name="RewardScreen" component={RewardScreen} option={{ title: 'QuestionScreen' }} />
        </Stack.Navigator>
    )
}

export default HomeStack;