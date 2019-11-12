import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

const VerifyEmailScreen = props => {
    const { colors } = props.theme;
    
	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{
					backgroundColor: colors.background
				}
			])}>
			<Text>Please Verify Your Email</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default withTheme(VerifyEmailScreen);
