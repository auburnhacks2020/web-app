import React, { useState } from 'react';
import { View, Platform, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActiveTabGradient from './ActiveTabGradient';
import { Button, withTheme, Menu, Provider } from 'react-native-paper';
import { Colors } from '../constants';

const SIZE = Platform.OS === 'web' ? 80 : 70;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
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

	const handlePress = () => {
		onPress();
		setVisible(!isVisible);
	};

	return (
		<View style={styles.container}>
			<Provider theme={theme}/>
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
			<Menu
				visible={isVisible}
				onDismiss={() => setVisible(false)}
				anchor={{}}>
				<Menu.Item onPress={() => {}} title='Item 1' />
				<Menu.Item onPress={() => {}} title='Item 2' />
				<Menu.Item onPress={() => {}} title='Item 3' />
			</Menu>
		</View>
	);
};
export default withTheme(ProfileButton);
