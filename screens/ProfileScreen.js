import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Platform,
	Dimensions
} from 'react-native';
import {
	Text,
	withTheme,
	Headline,
	Button,
	ActivityIndicator,
	Subheading,
	Surface
} from 'react-native-paper';
import { stylesheet } from '../constants';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { getToken } from '../auth';
import { gql } from 'apollo-boost';
import * as WebBrowser from 'expo-web-browser';
import QRCode from 'react-native-qrcode-svg';
import { Header, ClearBottomTabsView } from '../components';

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
		console.log(error);
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

	return (
		<ScrollView style={stylesheet.container}>
			<Header showDate={false} />
			<Headline style={styles.headline}>
				Welcome {firstName} {lastName}!{'\n'}
				Thanks for creating an account with AuburnHacks!{'\n'}
				Follow us on social media for news and updates about the event!
			</Headline>
			<View
				style={
					Platform.OS === 'web' && Dimensions.get('window').width > 865
						? {
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'row'
						  }
						: {
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column'
						  }
				}>
				<Button
					style={stylesheet.btn2}
					onPress={() => {
						navigate('schedule');
					}}>
					Event Schedule
				</Button>
				<Button
					onPress={() => {
						WebBrowser.openBrowserAsync('http://mlh.io/code-of-conduct');
					}}
					style={stylesheet.btn2}>
					MLH Code of Conduct
				</Button>
				<Button
					style={stylesheet.btn2}
					onPress={() => {
						navigate('SocialStack');
					}}>
					Follow Us!
				</Button>
				{console.log(data)}
				{application ? (
					<Button
						style={stylesheet.btn2}
						onPress={() => {
							navigate('application');
						}}>
						Update Application Here!
					</Button>
				) : (
					<Button
						style={stylesheet.btn2}
						onPress={() => {
							navigate('application');
						}}>
						Apply Here!
					</Button>
				)}
			</View>
			{application ? (
				<ScrollView style={stylesheet.container}>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 20
						}}>
						<Headline style={styles.headline}>
							Bring this QR code along with your ID to check-in!
						</Headline>
						<View style={styles.qrSurface}>
							<QRCode
								value={application.id}
								color={colors.primary}
								backgroundColor={colors.background}
								size={300}
							/>
						</View>
					</View>
				</ScrollView>
			) : (
				<View>
					<Headline style={styles.headline}>
						once you submit your application, your QR code for check-in will
						appear here!
					</Headline>
				</View>
			)}
			<View style={{ height: 100 }}></View>
			<ClearBottomTabsView />
		</ScrollView>
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
		textAlign: 'center',
		margin: 10,
		marginTop: 150
	},
	qrSurface: {
		elevation: 10,
		margin: 20,
		shadowRadius: 10,
		shadowColor: 'white',
		marginBottom: 200
	}
});

export default withTheme(ProfileScreen);
