import React, { useState } from 'react';
import { View, Platform, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActiveTabGradient from './ActiveTabGradient';
import { Button, withTheme, Menu, Provider } from 'react-native-paper';
import { Colors } from '../constants';

const SIZE = Platform.OS === 'web' ? 80 : 70;

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	button: {
		position: 'absolute',
		top: -SIZE / 2,
		left: -SIZE / 2,
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
		<Provider theme={theme}>
			<View style={styles.container}>
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
				<Menu visible={isVisible} onDismiss={() => setVisible(false)} anchor={{x: Dimensions.get("window").width / 2, y: Dimensions.get("window").height / 2}}>
					<Menu.Item onPress={() => {}} title='Item 1' />
					<Menu.Item onPress={() => {}} title='Item 2' />
					<Menu.Item onPress={() => {}} title='Item 3' />
				</Menu>
			</View>
		</Provider>
	);
};
export default withTheme(ProfileButton);
