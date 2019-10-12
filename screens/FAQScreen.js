import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { Header } from "../components";

export default function FAQScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="FAQ's" />
    </ScrollView>
  );
}

FAQScreen.navigationOptions = {
  title: 'FAQs',
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 15 : 0,
		backgroundColor: '#f7f7f7',
	}
});