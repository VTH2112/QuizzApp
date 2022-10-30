import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import QuestionScreen from "../screens/QuestionScreen";
import BeginnerScreen from "../screens/BeginnerScreen";
import ChosenCategoriesScreen from "../screens/ChosenCategoriesScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        option={{ title: "HomeScreen" }}
      />
      <Stack.Screen
        name="ChosenCategoriesScreen"
        component={ChosenCategoriesScreen}
        option={{ title: "ChosenCategoriesScreen" }}
      />
      <Stack.Screen
        name="BeginnerScreen"
        component={BeginnerScreen}
        option={{ title: "BeginnerScreen" }}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        option={{ title: "QuestionScreen" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
