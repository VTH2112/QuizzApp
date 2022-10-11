import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Animated, { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import LiveScreen from './src/LiveScreen';
import StoreScreen from './src/StoreScreen';
import WelcomeScreen from './src/WelcomeScreen';
import SignInScreen from './src/SignInScreen';
import SignUpScreen from './src/SignUpScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';



const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="HomeStack" component={HomeScreen} option={{ title: 'HomeScreen' }} />
    </Stack.Navigator>

  )
}
const AuthStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} option={{ title: 'WelcomeScreen' }} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} option={{ title: 'SignInScreen' }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} option={{ title: 'SignUpScreen' }} />
      <Stack.Screen name="HomeStack" component={HomeScreen} option={{ title: 'HomeScreen' }} />
    </Stack.Navigator>

  )
}
const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
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
        },
        tabBarActiveTintColor: "white",
        headerShown: false
      }}
    >

      <Tab.Screen name="Home" component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Image source={require('./src/img/homeIcon.png')} style={{ width: 21.09, height: 23.72, tintColor: color }} />
          },
        }}
      />
      <Tab.Screen name="Store" component={StoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./src/img/storeIcon.png')} style={{ width: 26.48, height: 23.72, tintColor: color }} />
          )
        }}
      />
      <Tab.Screen name="Live" component={LiveScreen}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./src/img/liveIcon.png')} style={{ width: 26.36, height: 23.72, tintColor: color }} />
          )
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen}

        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./src/img/accIcon.png')} style={{ width: 26.36, height: 26.36, tintColor: color }} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        {/* <AuthStack /> */}
        <MainStack />
      </NavigationContainer>
    </Provider>
  )
}


const styles = StyleSheet.create({


})