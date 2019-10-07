import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function SponsorsScreen() {
	return (
		<View style={styles.container}>
			<Text>Sponsors</Text>
		</View>
	);
}

SponsorsScreen.navigationOptions = {
	title: 'Sponsors'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 15 : 0,
		backgroundColor: '#f7f7f7'
	}
});
