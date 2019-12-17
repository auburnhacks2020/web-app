import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, withTheme, Headline, Button,  } from 'react-native-paper';
import { onSignOut } from "../auth";
import { stylesheet } from '../constants';

const ProfileScreen = props => {
	const { colors } = props.theme;

	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<Headline style={{textAlign:'center', fontWeight:'700'}}>
			Welcome Future Hacker!{"\n"}
			Thanks for registering for AuburnHacks!{"\n"}
			Follow us on social media for news and updates about the event!

			</Headline>
			<Button style={stylesheet.btn2} onPress={() => {props.navigation.navigate('SocialStack')}}>
			Follow Us!
			</Button>
		</View>
	);
};

ProfileScreen.navigationOptions = ({ navigation }) => {
    // return {
    //     // headerLeft: <Appbar.Action style={{width:null}} color='white' icon='dots-vertical' onPress={() => onSignOut().then(() => navigation.navigate('signIn'))}/>
    // };
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default withTheme(ProfileScreen);
