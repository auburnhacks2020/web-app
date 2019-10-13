import React from "react";
import { View, SafeAreaView, Image, Text, StyleSheet, Platform } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import { fonts } from '../constants';

export default function Header(props) {
    return (
      <SafeAreaView style={styles.head}>
        <View style={styles.logos}>
          <View />
          <Image
            style={{width: 150, height: 150}}
            source={require("../assets/logos/AuburnHacks-1.png")}
          />
          <View />
          <Image
            style={{width: 200, height: 150}}
            source={require("../assets/images/glass.png")}
          />
        </View>
        <Headline style={styles.headline}>{props.title}</Headline>
        <Subheading style={styles.sub}>February 8-9, 2020</Subheading>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  head: {
    paddingTop: 20,
    marginBottom: 20,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  headline: {
    color: "#dd550c",
    fontSize: 48,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 20,
    padding: 20,
    fontFamily: fonts.text
  },
  sub: {
    fontFamily: fonts.text,
    fontSize: 30,
    color: '#f8f8f8',
    padding: 20,
    margin: 10,
    alignSelf: 'center',
  },
  logos: {
    flex: 1,
    flexDirection: "row",
    alignSelf: 'center',
  },
});