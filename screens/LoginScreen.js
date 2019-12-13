import React, { useState } from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	AsyncStorage
} from 'react-native';
import { TextInput, Text, Button, withTheme, Subheading } from 'react-native-paper';

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
	mutation verfiyUser($email: String!, $password: String!, $token: String!) {
		verfiyUser(email: $email, password: $password, token: $token) {
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

const LoginScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [invalidPassword, setInvalidPassword] = useState(false);
	const [invalidLogin, setinvalidLogin] = useState(false);
	const [[verified, loginAttempted], setVerifiedUser] = useState([
		false,
		false
	]);
	const token = props.navigation.getParam('token');

	// const { loading, error, data } = useQuery(CURRENT_USER);
	const [login, loginResult] = useMutation(LOGIN);
	const [verify, verifyResult] = useMutation(VERIFY);
	const { colors,  } = props.theme;

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
				verifiedUser = res.data.login.emailVerified;
				onSignIn(res.data.login.token);
			} catch (err) {
				evalErrors(err);
			}
		} else {
			try {
				const response = await verify({
					variables: { email, password, token }
				});
				verified = response.data.verifyUser.verified;
				if (verifiedUser)
					console.log(response);
			} catch (err) {
				console.log(err);
			}
		}
		if (verified) {
			props.navigation.navigate('profile');
			return true;
		}

		returnrorocketdog1
		
		;
	};

	const evalErrors = err => {
		console.log(err);
		if (err.message === 'GraphQL error: Invalid Login') setinvalidLogin(true);
		else setinvalidLogin(false);
		if (err.message === 'GraphQL error: Invalid Password')
			setInvalidPassword(true);
		else setInvalidPassword(false);
	};

	let passwordInput = null;
	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<View style={styles.loginForm}>
				{verified && loginAttempted ? <Subheading style={{color: colors.error, marginBottom: 5}}>Please Verify Your Email!</Subheading> : null}
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
						setVerifiedUser(loginUser());
					}}
					loading={loginResult.loading || verifyResult.loading}>
					Login
				</Button>
				{/* <Text>{JSON.stringify(data)}</Text> */}
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
	}
});

export default withTheme(LoginScreen);
