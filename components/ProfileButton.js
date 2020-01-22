import React, { useState, useEffect } from 'react';
import { View, Platform, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActiveTabGradient from './ActiveTabGradient';
import { Button, withTheme, Menu, Provider } from 'react-native-paper';
import { Colors } from '../constants';
import { isSignedIn, onSignOut } from '../auth';

const SIZE = Platform.OS === 'web' ? 80 : 70;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	menu: {
		
	},
	button: {
		top: -SIZE / 2,
		maxWidth: SIZE,
		shadowRadius: 10,
		borderRadius: SIZE / 2,
		width: SIZE,
		backgroundColor: '#171F33',
		height: SIZE
	}
});

const ProfileButton = props => {
	const { routeName, onPress, theme } = props;
	const { colors } = theme;
	const [isVisible, setVisible] = useState(false);
	const [signedIn, setSignedIn] = useState(null);

	useEffect(() => {
		if (signedIn === null) fetchSignInState();
	}, [signedIn]);

	const fetchSignInState = async () => {
		try {
			const status = await isSignedIn();
			setSignedIn(status);
		} catch (err) {
			console.log(err);
		}
	};

	const handlePress = () => {
		setVisible(!isVisible);
	};

	return (
		<View style={styles.container}>
			<Menu
				style={styles.menu}
				visible={isVisible}
				onDismiss={() => setVisible(false)}
				anchor={
					<Button
						theme={theme}
						mode='outlined'
						onPress={handlePress}
						style={styles.button}>
						<Ionicons
							name='md-person'
							size={SIZE / 1.5}
							color={
								routeName === 'ProfileStack'
									? Colors.iconSelected
									: Colors.iconDefault
							}
						/>
					</Button>
				}>
				{signedIn ? (
					<View>
						<Menu.Item
							onPress={() => {
								props.navigation.navigate('home');
								setVisible(false);
							}}
							title='Profile'
						/>
						<Menu.Item
							onPress={() => {
								onSignOut();
								props.navigation.navigate('ProfileStack');
								setVisible(false);
							}}
							title='Logout'
						/>
					</View>
				) : (
					<View>
						<Menu.Item
							onPress={() => {
								props.navigation.navigate('ProfileStack');
								setVisible(false);
							}}
							title='Login'
						/>
					</View>
				)}
			</Menu>
		</View>
	);
};
export default withTheme(ProfileButton);
