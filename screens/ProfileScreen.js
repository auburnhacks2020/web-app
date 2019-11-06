import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, withTheme, Appbar } from 'react-native-paper';
import { onSignOut } from "../auth";

const ProfileScreen = props => {
	const { colors } = props.theme;

	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<Text>Welcome Future Hacker!</Text>
		</View>
	);
};

ProfileScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <Appbar.Action color='white' icon='dots-vertical' onPress={() => onSignOut().then(() => navigation.navigate('signIn'))}/>
    };
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default withTheme(ProfileScreen);
