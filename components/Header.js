import React from "react";
import { View, SafeAreaView, Image, ImageBackground, Text, StyleSheet, Platform } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import { fonts } from '../constants';

export default function Header(props) {
    return (
      <SafeAreaView>
        <ImageBackground
          source={require("../assets/images/background.png")}
          style={{ flex: 1, width: null, height: null, padding: 20}}
        >
          <View style={styles.logos}>
            <Image
              style={{ width: 315, height: 250}}
              source={require("../assets/images/binarylogo1.0.png")}
            />
            <Subheading style={styles.sub}>February 8-9, 2020</Subheading>
          </View>
        </ImageBackground>
        <Headline style={styles.headline}>{props.title}</Headline>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  headline: {
    color: "#dd550c",
    fontSize: 48,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    fontFamily: fonts.text,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8"
  },
  sub: {
    fontFamily: fonts.text,
    fontSize: 30,
    color: "#f8f8f8",
    padding: 10,
    alignSelf: "center"
  },
  logos: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    width: null,
    height: null,
  }
});