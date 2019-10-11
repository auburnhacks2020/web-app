import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";

export default function Header() {
    return (
      <View style={styles.head}>
        <Image
          style={{ width: 200, height: 200, alignSelf:'center' }}
          source={require("../assets/logos/AuburnHacks-1.png")}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    head: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto'
    }
})