import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, withTheme } from 'react-native-paper';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { onSignIn } from '../auth';

const REGISTER = gql`
	mutation register($email: String!, $password: String!) {
		register(email: $email, password: $password) {
			id
			email
			firstName
			lastName
			emailVerified
		}
	}
`;

const RegisterScreen = props => {
	const [form, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});
	const [invalidInputs, setInvalidInputs] = useState({
		firstName: false,
		lastName: false,
		email: false,
		password: false
	});

	const [register, registerResult] = useMutation(REGISTER);
	const { colors } = props.theme;

	const updateField = (key, val) => {
		setValues(form => ({
			...form,
			[key]: val
		}));
	};

	const updateInvalidInputs = (key, val) => {
		setInvalidInputs(inputs => ({
			...inputs,
			[key]: val
		}));
	};

	const validForm = () => {
		let isValid = true;
		const entries = Object.entries(form);
		for (const [key, val] of entries) {
			if (val === '') {
				updateInvalidInputs(key, true);
				isValid = false;
			} else {
				updateInvalidInputs(key, false);
			}
		}
		console.log(isValid);
		return isValid;
	};

	const evalErrors = err => {
		if (err.message === 'GraphQL error: Invalid Login')
			updateInvalidInputs('email', true);
		else updateInvalidInputs('email', false);
		if (err.message === 'GraphQL error: Invalid Password')
			updateInvalidInputs('password', true);
		else updateInvalidInputs('password', true);
	};

	const registerUser = async () => {
		console.log(invalidInputs);
		if (!validForm()) {
			const err = new Error('');
			err.break = true;
			return err;
		}
		try {
			const res = await register({ variables: { email, password } });
			onSignIn(res.data.login.token);
			props.navigation.navigate('profile');
		} catch (err) {
			evalErrors(err);
		}
	};

	let lastNameInput,
		emailInput,
		passwordInput = null;
	console.log(form);
	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<View style={styles.registerForm}>
				<TextInput
					autoCapitalize='words'
					mode='outlined'
					label='First Name'
					value={form.firstName}
					onChangeText={val => updateField('firstName', val)}
					onSubmitEditing={() => {
						lastNameInput.focus();
					}}
					blurOnSubmit={false}
					style={styles.textInput}
					error={invalidInputs.firstName}
				/>
				<TextInput
					ref={input => {
						lastNameInput = input;
					}}
					autoCapitalize='words'
					mode='outlined'
					label='Last Name'
					value={form.lastName}
					onChangeText={val => updateField('lastName', val)}
					onSubmitEditing={() => {
						emailInput.focus();
					}}
					blurOnSubmit={false}
					style={styles.textInput}
					error={invalidInputs.lastName}
				/>
				<TextInput
					ref={input => {
						emailInput = input;
					}}
					mode='outlined'
					label='Email'
					autoCompleteType='email'
					keyboardType='email-address'
					value={form.email}
					onChangeText={val => updateField('email', val)}
					onSubmitEditing={() => {
						passwordInput.focus();
					}}
					blurOnSubmit={false}
					style={styles.textInput}
					error={invalidInputs.email}
				/>
				<TextInput
					ref={input => {
						passwordInput = input;
					}}
					secureTextEntry
					mode='outlined'
					label='Password'
					value={form.password}
					onChangeText={val => updateField('password', val)}
					onSubmitEditing={registerUser}
					style={styles.textInput}
					error={invalidInputs.password}
				/>
				<Button
					style={styles.button}
					mode='contained'
					onPress={registerUser}
					loading={registerResult.loading}>
					Register
				</Button>
				<View>
					<Text style={styles.loginText}>Already have an account?</Text>
					<Button
						style={styles.signInButton}
						onPress={() => props.navigation.navigate('login')}>
						Login here
					</Button>
				</View>
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
	registerForm: {
		padding: 10,
		width: '100%',
		maxWidth: 400
	},
	textInput: {
		marginBottom: 10
	},
	loginText: {
		marginTop: 25,
		textAlign: 'center'
	},
	button: {
		marginTop: 5,
		alignSelf: 'flex-end'
	}
});

export default withTheme(RegisterScreen);
