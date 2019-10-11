import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<Text>About Us</Text>
		</View>
	);
}

AboutScreen.navigationOptions = {
	// title: 'About Us'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 15 : 0,
		backgroundColor: '#f7f7f7',
	}
});
