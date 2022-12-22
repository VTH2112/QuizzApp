import React, { useEffect, useState } from "react";
import {
    TextInput,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    View,
    FlatList,
    Alert,
    ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import api from '../api/api';
import { useSelector } from "react-redux";



const HomeScreen = ({ navigation }) => {
    const [text, setText] = useState("");
    const userInfo = useSelector((state) => state.userInfo.userInfo[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const Item = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    height: 40,
                    justifyContent: "space-between",
                }}
                onPress={() =>
                    navigation.navigate("BeginnerScreen", {
                        title: item.title,
                        id: item.id,
                    })
                }
            >
                <Text style={[styles.header, { textAlign: "left" }]}>{formatText(item.title)}</Text>
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
        getListQuiz()
    }, []);
    const getListQuiz = async () => {
        var temp = []
        try {
            const res = await api.get('https://backendquizapp.onrender.com/categories/',
                {
                    method: 'GET',
                    headers: {
                        //this what's exactly look in my postman
                        Authorization: "Bearer" + userInfo.accessToken,
                        id: userInfo.userId,
                    },
                }
            ).finally(() => {
                console.log('finally');
                setIsLoading(false);
            });
            console.log('categories', res.data);

            res.data.map((item) => {
                temp.push({ title: item.name, id: item._id })
            })
            console.log('temp', temp);
            setCategories(temp)

        } catch (err) {
            console.log(err);
            Alert.alert(err.message);
        }
    }
    const formatText = (text) => {
        if (text.length > 0) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
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

            <View style={{ flex: 1 }}>
                {
                    isLoading == true ? <ActivityIndicator size="large" color="#fff" /> : <FlatList
                        data={categories}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={<View style={{ height: 20 }} />}
                    />
                }

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