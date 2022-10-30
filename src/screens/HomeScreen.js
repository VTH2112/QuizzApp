import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";

const categories = [
  {
    id: 0,
    title: "HISTORY",
  },
  {
    id: 1,
    title: "MATHEMATICS",
  },
  {
    id: 2,
    title: "PHYSICS",
  },
  {
    id: 3,
    title: "BIOLOGY",
  },
  {
    id: 4,
    title: "GEOGRAPHY",
  },
  {
    id: 5,
    title: "SPORTS",
  },
  {
    id: 6,
    title: "CURRENT AFFAIR",
  },
  {
    id: 7,
    title: "CHEMISTRY",
  },
  {
    id: 8,
    title: "LANGUAGE",
  },
];

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");

  const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          justifyContent: "space-between",
        }}
        onPress={() =>
          navigation.navigate("ChosenCategoriesScreen", {
            title: item.title,
          })
        }
      >
        <Text style={[styles.header, { textAlign: "left" }]}>{item.title}</Text>
        <Icon name="navigate-next" color="white" />
      </TouchableOpacity>
      <View style={{ backgroundColor: "grey", width: "100%", height: 1 }} />
    </View>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ImageBackground
      source={require("../img/home_bg.png")}
      style={{ flex: 1, paddingHorizontal: 23 }}
    >
      <View>
        <Text style={styles.header}>We are glad to have you "NameOfGuess"</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "grey",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 20,
          paddingHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <TextInput
          style={{ height: 40, color: "white" }}
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
        <TouchableOpacity>
          <Icon name="search" color="white" />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        Are you a genius?
      </Text>
      <Text style={[styles.header, { textAlign: "left" }]}>
        Select Category
      </Text>

      <View style={{ height: 400 }}>
        <FlatList
          data={categories}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
  },
  item: {
    paddingVertical: 15,
  },
  separator: {
    color: "red",
    height: 1,
    width: "100%",
  },
});

export default HomeScreen;
