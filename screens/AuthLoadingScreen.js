import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { isSignedIn } from '../auth';

const AuthLoadingScreen = props => {
	const { colors } = props.theme;

	useEffect(() => {
		getToken();
	});

	const getToken = async () => {
		try {
			const loggedIn = await isSignedIn();
			props.navigation.navigate(loggedIn ? 'profile' : 'signIn');
		} catch (err) {
			console.log(err);
			props.navigation.navigate('countdown');
		}
	}

	return (
		<View style={{ backgroundColor: colors.background }}>
			<ActivityIndicator size='large' color={colors.primary} />
			<StatusBar barStyle='default' />
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

export default withTheme(AuthLoadingScreen);
