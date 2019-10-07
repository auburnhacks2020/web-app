import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function FAQScreen() {
  return (
    <View style={styles.container}>
      <Text>FAQs</Text>
    </View>
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