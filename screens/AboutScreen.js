import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Platform } from 'react-native';
import { Header } from "../components";

export default function AboutScreen() {
	return (
    <ScrollView style={styles.container}>
      <Header title="About" />
    </ScrollView>
  );
}

AboutScreen.navigationOptions = {
	// title: 'About Us'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03244d",
  },
  row: {
    flex: 2,
    width: '100%',
  }
});
