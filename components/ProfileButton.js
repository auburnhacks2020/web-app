import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActiveTabGradient from './ActiveTabGradient';
import { Button, withTheme, Menu, Provider } from 'react-native-paper';
import { Colors } from '../constants';

const SIZE = Platform.OS === 'web' ? 80 : 70;

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	button: {
		position: 'absolute',
		zIndex: 3,
		elevation: 3,
		top: -SIZE / 2,
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
	return (
		<View style={styles.container}>
			<Button mode='outlined' style={styles.button} onPress={onPress}>
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
		</View>
	);
};
export default withTheme(ProfileButton);
