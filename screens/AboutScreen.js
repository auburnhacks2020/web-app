import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Platform } from 'react-native';
import { Headline } from "react-native-paper";
import Header from "../components/Header";

export default function AboutScreen() {
	return (
    <ScrollView style={styles.container}>
      <Header />
	  <Headline style={styles.headline}>About</Headline>
    </ScrollView>
  );
}

AboutScreen.navigationOptions = {
	title: 'About Us'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#03244d"
  },
  headline: {
    color: "#dd550c",
	fontSize: 36,
	fontWeight: 700,
	alignSelf: 'center'
  }
});
