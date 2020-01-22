import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	Text,
	withTheme,
	Headline,
	Button,
	ActivityIndicator
} from 'react-native-paper';
import { stylesheet } from '../constants';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { getToken } from '../auth';
import { gql } from 'apollo-boost';
import * as WebBrowser from 'expo-web-browser';

const CURRENT_USER = gql`
	{
		currentUser {
			firstName
			lastName
			appComplete
			application {
				id
				studentId
			}
		}
	}
`;

const ProfileScreen = props => {
	const { colors } = props.theme;
	const { navigate } = props.navigation;

	const [token, setToken] = useState('');

	const getUserToken = async () => {
		try {
			const userToken = await getToken();
			if (userToken === null) navigate('login');
			setToken(userToken);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (token === '') getUserToken();
		else getCurrentUser();
	}, [token]);

	const [getCurrentUser, { called, loading, error, data }] = useLazyQuery(
		CURRENT_USER,
		{
			context: { headers: { authorization: 'Bearer ' + token } }
		}
	);

	if (!called || loading)
		return (
			<View
				style={StyleSheet.flatten([
					styles.container,
					{ backgroundColor: colors.background }
				])}>
				<ActivityIndicator />
			</View>
		);
	if (error) {
		console.log(error)
		return (
			<View
				style={StyleSheet.flatten([
					styles.container,
					{ backgroundColor: colors.background }
				])}>
				<Text>Uh oh! An Error has occurred!</Text>
			</View>
		);
	}

	const { firstName, lastName, appComplete, application } = data.currentUser;
	console.log(application);

	return (
			<View
				style={StyleSheet.flatten([
					styles.container,
					{ backgroundColor: colors.background }
				])}>
				<Headline style={styles.headline}>
					Welcome {firstName} {lastName}!{'\n'}
					Thanks for creating an account with AuburnHacks!{'\n'}
					Follow us on social media for news and updates about the event!
				</Headline>
				<View style={{ flexDirection: 'row' }}>
					<Button
						style={stylesheet.btn2}
						onPress={() => {
							navigate('SocialStack');
						}}>
						Follow Us!
					</Button>
					<Button
						onPress={() => {
							WebBrowser.openBrowserAsync('http://mlh.io/code-of-conduct');
						}}
						style={stylesheet.btn2}>
						MLH Code of Conduct
					</Button>
					{console.log(data)}
					{data.currentUser.application === null ? (
						<Button
							style={stylesheet.btn2}
							onPress={() => {
								navigate('application');
							}}>
							Apply Here!
						</Button>
					) : (
						<Button
							style={stylesheet.btn2}
							onPress={() => {
								navigate('application');
							}}>
							Update App Here!
						</Button>
					)}
				</View>
			</View>
	);
};

ProfileScreen.navigationOptions = ({ navigation }) => {
	// return {
	//     // headerLeft: <Appbar.Action style={{width:null}} color='white' icon='dots-vertical' onPress={() => onSignOut().then(() => navigation.navigate('signIn'))}/>
	// };
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headline: {
		textAlign: 'center'
	}
});

export default withTheme(ProfileScreen);
