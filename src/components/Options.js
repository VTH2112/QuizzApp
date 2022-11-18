import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native';


const Options = ({ quesNum, item, index, isSelect, ansLength }) => {
    // const [isSelect, setIsSelect] = React.useState(false);
 
    return (
        <View>
            <View style={styles.container}
            >
                <Text style={{ color: isSelect !== index ? "#fff" : '#FF2983', fontSize: 18, }}>{quesNum[index]}. {item.context}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },

});

export default Options;