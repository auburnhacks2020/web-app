import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import { Headline } from "react-native-paper";

export default function Header(props) {
    return (
      <View style={styles.head}>
        <Image
          style={{ width: 200, height: 200, alignSelf: "center" }}
          source={require("../assets/logos/AuburnHacks-1.png")}
        />
        <Headline style={styles.headline}>{props.title}</Headline>
      </View>
    );
}

const styles = StyleSheet.create({
  head: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "auto"
  },
  headline: {
    color: "#dd550c",
    fontSize: 36,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 20,
    padding: 20
  }
});