import React, { useState } from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	KeyboardAvoidingView
} from 'react-native';
import { Header } from '../components';
import { TextInput, Surface, Button, withTheme } from 'react-native-paper';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	loginForm: {
		backgroundColor: 'transparent',
		flex: 1,
		margin: 10,
		padding: 20,
		maxWidth: 400
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

const ProfileScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
						<Button style={styles.button} mode='contained'>
							Login
						</Button>
						<Button style={styles.button} mode='contained'>
							Sign Up
						</Button>
					</View>
				</Surface>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

ProfileScreen.navigationOptions = {
	title: 'Profile'
};

export default withTheme(ProfileScreen);
