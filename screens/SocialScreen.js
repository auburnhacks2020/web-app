import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { Header } from "../components";

export default function SocialScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Social Media" />
    </ScrollView>
  );
}

SocialScreen.navigationOptions = {
  title: 'Social',
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 15 : 0,
		backgroundColor: '#f7f7f7',
	}
});