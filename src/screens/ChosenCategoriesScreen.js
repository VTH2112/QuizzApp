import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { geography } from "../components/Question";

const ChosenCategoriesScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    console.log(geography);
  }, []);

  const { title } = route.params;
  console.log(title);
  return (
    <ImageBackground
      source={require("../img/home_bg.png")}
      style={{ flex: 1, alignItems: "center", position: "relative" }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.3,
        }}
      ></View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CATEGORY: {title}</Text>
        </View>
        <View style={styles.QuesContain}>
          <Image
            style={{ borderRadius: 45 }}
            width={180}
            height={180}
            source={require("../img/question.png")}
          />
        </View>
        <View style={styles.optionsContain}>
          <View style={styles.content}>
            <Text style={styles.contentText}>Duration: 5 min</Text>
            <Text style={styles.contentText}>Question per quiz: 5 - 7</Text>
            <Text style={styles.contentText}>Reward: 150 Gems</Text>
            <Text style={styles.contentText}>Best Score: 90 questions</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FF2983",
              alignItems: "center",
              paddingVertical: 15,
            }}
            onPress={() => {
              navigation.navigate("BeginnerScreen", {
                title: title,
              });
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
  QuesContain: {
    width: "100%",
    height: "35%",
    alignItems: "center",
  },
  optionsContain: {
    width: "100%",
    height: "25%",
    alignItems: "center",
  },
  bottom: {
    width: "100%",
    height: "15%",
  },
  button: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContain: {
    width: "80%",
    height: "80%",
    backgroundColor: "#FF2983",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  contentText: {
    fontSize: 23,
    color: "white",
    marginBottom: 5,
    width: "80%",
  },
});

export default ChosenCategoriesScreen;
