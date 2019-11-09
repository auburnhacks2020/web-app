import React, { useState } from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	AsyncStorage
} from 'react-native';
import { TextInput, Button, withTheme } from 'react-native-paper';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { onSignIn } from '../auth';

const CURRENT_USER = gql`
	query currentUser {
		id
		email
	}
`;

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				email
			}
		}
	}
`;

const LoginScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [invalidPassword, setInvalidPassword] = useState(false);
	const [invalidLogin, setinvalidLogin] = useState(false);

	// const { loading, error, data } = useQuery(CURRENT_USER);
	const [login, loginResult] = useMutation(LOGIN);
	const { colors } = props.theme;

	const loginUser = async () => {
		try {
			const res = await login({ variables: { email, password } });
			onSignIn(res.data.login.token);
			props.navigation.navigate('profile');
		} catch (err) {
			evalErrors(err);
		}
	};

	const evalErrors = err => {
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
					style={styles.textInput}
					error={invalidPassword}
				/>
				<Button
					style={styles.button}
					mode='contained'
					onPress={loginUser}
					loading={loginResult.loading}>
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
		alignSelf: 'flex-end',
	}
});

export default withTheme(LoginScreen);
