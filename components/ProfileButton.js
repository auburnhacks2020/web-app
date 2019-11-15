import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActiveTabGradient from './ActiveTabGradient';
import { Button, withTheme } from 'react-native-paper';
const SIZE = Platform.OS === 'web' ? 80 : 70;

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center'},
	button: {
		position: 'absolute',
		zIndex: 3,
		elevation: 3,
		top: -SIZE / 2.5,
		shadowRadius: 10,
		borderRadius: SIZE / 2,
		width: SIZE,
    height: SIZE,
	}
});

const ProfileButton = ({ onPress, theme }) => {
	const [focused, setFocused] = useState(false);
	const { colors } = theme;

	const onClick = () => {
		onPress();
		setFocused(!focused);
	};
	return (
		<View style={styles.container}>
			<ActiveTabGradient />
				<Button mode='outlined' style={styles.button} onPress={onPress}>
					<Ionicons name='md-person' size={SIZE / 1.5} />
				</Button>
		</View>
	);
};
export default withTheme(ProfileButton);
