import React, { useState } from 'react';
import {
	ScrollView,
	View,
	KeyboardAvoidingView,
	StyleSheet
} from 'react-native';
import { Header } from '../components';
import {
	TextInput,
	Surface,
	Button,
	withTheme,
	Text
} from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// const CURRENT_USER = gql`
// 	query currentUser {
// 		id
// 		email
// 	}
// `;

// const LOGIN = gql`
// 	mutation login($email: String!, $password: String!) {
// 		loginUser(email: $email, password: $password) {
// 			token
// 			user {
// 				id
// 				email
// 			}
// 		}
// 	}
// `;

const ProfileScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const { loading, error, data } = useQuery(CURRENT_USER);
	// const [login, { data }] = useMutation(LOGIN);

	const { colors } = props.theme;

	return (
		<ScrollView
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<Header title='Profile' />
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Surface style={styles.loginForm}>
					<TextInput
						mode='outlined'
						label='Email'
						value={email}
						onChangeText={text => setEmail(text)}
						style={styles.textInput}
					/>
					<TextInput
						mode='outlined'
						label='Password'
						value={password}
						onChangeText={text => setPassword(text)}
						style={styles.textInput}
					/>
					<View style={styles.formButtons}>
						<Button
							style={styles.button}
							mode='contained'
							// onPress={() => login({ variables: { email, password } })}
							>
							Login
						</Button>
						<Button style={styles.button} mode='contained'>
							Sign Up
						</Button>
					</View>
					{/* <Text>{JSON.stringify(data)}</Text> */}
				</Surface>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	loginForm: {
		flex: 1,
		alignSelf: 'center',
		backgroundColor: 'transparent',
		margin: 10,
		padding: 20
	},
	textInput: {
		marginBottom: 10
	},
	formButtons: {
		flex: 1,
		flexDirection: 'row-reverse',
		alignItems: 'flex-end',
		paddingTop: 10
	},
	button: {
		marginLeft: 10
	}
});

ProfileScreen.navigationOptions = {
	title: 'Profile'
};

export default withTheme(ProfileScreen);
