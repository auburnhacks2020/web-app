import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { onSignOut, getToken } from '../auth';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

const CURRENT_USER = gql`
	{
		currentUser {
			id
		}
	}
`;
const AuthLoadingScreen = props => {
	const { colors } = props.theme;

	const [token, setToken] = useState('');

	useEffect(() => {
		if (token === '') getUserToken();
		else checkSignInStatus();
	}, [token]);

	const getUserToken = async () => {
		try {
			const userToken = await getToken();
			if (userToken) setToken(userToken);
			else props.navigation.navigate('countdown');
		} catch (err) {
			console.log(err);
		}
	}

	const [getCurrentUser, { loading, error, data }] = useLazyQuery(CURRENT_USER, {
		context: { headers: { authorization: 'Bearer ' + token } }
	});

	const checkSignInStatus = async () => {
		getCurrentUser();
		while (loading) {}
		if (error) {
			onSignOut();
			props.navigation.navigate('countdown');
		}
		else props.navigation.navigate('profile');
	};

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
