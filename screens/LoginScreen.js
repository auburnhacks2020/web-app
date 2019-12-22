import React, { useState } from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	AsyncStorage
} from 'react-native';
import {
	TextInput,
	Text,
	Button,
	withTheme,
	Subheading
} from 'react-native-paper';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { onSignIn } from '../auth';

const CURRENT_USER = gql`
	query currentUser {
		id
		email
	}
`;

const VERIFY = gql`
	mutation verifyUser($email: String!, $password: String!, $token: String!) {
		verifyUser(email: $email, password: $password, token: $token) {
			verified
		}
	}
`;

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				email
				emailVerified
			}
		}
	}
`;

const SEND_VERIFY_EMAIL = gql`
	mutation sendVerification($email: String!) {
		sendVerification(email: $email) {
			sent
		}
	}
`;

const LoginScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [invalidPassword, setInvalidPassword] = useState(false);
	const [invalidLogin, setinvalidLogin] = useState(false);
	const [tokenExpired, setTokenExpired] = useState(false);
	const [verification, setVerification] = useState([false, false]);
	const token = props.navigation.getParam('token');

	// const { loading, error, data } = useQuery(CURRENT_USER);
	const [login, loginResult] = useMutation(LOGIN);
	const [verify, verifyResult] = useMutation(VERIFY);
	const [sendVerification, sendVerificationResult] = useMutation(
		SEND_VERIFY_EMAIL
	);

	const { colors } = props.theme;

	const loginUser = async () => {
		let verifiedUser = false;
		let loginAttempt = false;
		let res = {};

		if (token === '0') {
			return [false, false];
		} else if (token === '1') {
			try {
				res = await login({ variables: { email, password } });
				loginAttempt = true;
				verifiedUser = res.data.login.user.emailVerified;
				if (verifiedUser) {
					onSignIn(res.data.login.token);
					props.navigation.navigate('profile');
				} else {
				}
			} catch (err) {
				loginAttempt = true;
				verifiedUser = false;
				evalErrors(err);
			}
		} else {
			try {
				res = await verify({
					variables: { email, password, token }
				});
				console.log(res);
				try {
					res = await login({ variables: { email, password } });
					loginAttempt = true;
					verifiedUser = res.data.login.user.emailVerified;
					if (verifiedUser) {
						onSignIn(res.data.login.token);
						props.navigation.navigate('profile');
					}
				} catch (err) {
					loginAttempt = true;
					verifiedUser = false;
					evalErrors(err);
				}
			} catch (err) {
				evalErrors(err);
			}
		}
		const result = [verifiedUser, loginAttempt];
		console.log(result);
		return result;
	};

	const sendVerificationEmail = async () => {
		const sent = await sendVerification({ variables: { email } });
	};

	const evalErrors = err => {
		console.log(err);
		if (
			err.message === 'GraphQL error: Invalid Login' ||
			err.message === 'GraphQL error: Invalid Email'
		)
			setinvalidLogin(true);
		else setinvalidLogin(false);
		if (err.message === 'GraphQL error: Invalid Password')
			setInvalidPassword(true);
		else setInvalidPassword(false);
		if (err.message === 'GraphQL error: jwt expired') setTokenExpired(true);
		else setTokenExpired(false);
	};

	let passwordInput = null;
	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<View style={styles.loginForm}>
				{!verification[0] && verification[1] ? (
					<Subheading style={{ color: colors.error, marginBottom: 5 }}>
						Please Verify Your Email!
					</Subheading>
				) : null}
				<TextInput
					mode='outlined'
					label='Email'
					autoCompleteType='email'
					keyboardType='email-address'
					value={email}
					onChangeText={text => setEmail(text)}
					onSubmitEditing={() => {
						passwordInput.focus();
					}}
					blurOnSubmit={false}
					style={styles.textInput}
					error={invalidLogin}
				/>
				<TextInput
					ref={input => {
						passwordInput = input;
					}}
					secureTextEntry
					mode='outlined'
					label='Password'
					value={password}
					onChangeText={text => setPassword(text)}
					onSubmitEditing={loginUser}
					style={styles.textInput}
					error={invalidPassword}
				/>
				<Button
					style={styles.button}
					mode='contained'
					onPress={() => {
						setVerification(loginUser());
					}}
					loading={loginResult.loading || verifyResult.loading}>
					Login
				</Button>
				{/* <Text>{JSON.stringify(data)}</Text> */}
				{tokenExpired || (!verification[0] && verification[1]) ? (
					<View style={styles.sendVerification}>
						<Text>
							Your email has not been verified, would you like to resend the
							verification email?
						</Text>
						<Button
							onPress={sendVerificationEmail}
							disabled={sendVerificationResult.loading}>
							Send
						</Button>
					</View>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginForm: {
		padding: 10,
		width: '100%',
		maxWidth: 400
	},
	textInput: {
		marginBottom: 10
	},
	button: {
		marginTop: 5,
		alignSelf: 'flex-end'
	},
	sendVerification: {
		marginTop: 20,
		color: 'red'
	}
});

export default withTheme(LoginScreen);
