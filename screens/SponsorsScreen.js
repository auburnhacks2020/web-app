import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { Header } from "../components";

export default function SponsorsScreen() {
	return (
    <ScrollView style={styles.container}>
      <Header title="Sponsors" />
    </ScrollView>
  );
}

SponsorsScreen.navigationOptions = {
	title: 'Sponsors'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 15 : 0,
    backgroundColor: "#03244d"
  }
});
