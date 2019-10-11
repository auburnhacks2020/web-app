import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    auburn: {
        color: colors.tintColor,
        fontSize: 28,
        fontFamily: fonts.heading,
    },
    hacks: {
        color: colors.white,
        fontSize: 28,
        fontFamily: fonts.robotoMono
    }
});

const AppHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.auburn}>AUBURN</Text>
            <Text style={styles.hacks}>HACKS</Text>
        </View>
    )
}

export default AppHeader
