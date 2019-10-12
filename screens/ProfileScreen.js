import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { Header } from '../components';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" />
    </ScrollView>
  );
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 15 : 0,
		backgroundColor: '#f7f7f7',
	}
});