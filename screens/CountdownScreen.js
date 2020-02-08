import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Text, Headline, Button } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import { stylesheet } from '../constants';
import * as WebBrowser from "expo-web-browser";

const CountdownScreen = props => {
	const { colors, fonts } = props.theme;
	const registrationOpenDate = new Date('2019/12/1');
	const today = new Date();

	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<View style={styles.countdown}>
				<Headline style={{textAlign:'center', lineHeight:50}}>
					We're excited to see you today at 11:00 AM! {'\n'}Just bring what you
					need to hack and an ID. No QR code is needed.{'\n'}
					Check the links below for logistics information (parking, etc.) and the schedule! {'\n'}
					Happy Hacking!
				</Headline>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Button
					style={styles.button}
					mode='contained'
					onPress={() =>
						WebBrowser.openBrowserAsync(
							'https://docs.google.com/document/d/1EVOaN62QlMAmv2AceFyS-1EjEnJTqTlR32uwRr6D4jk/edit?usp=sharing'
						)
					}>
					Logistics Information
				</Button>
				<Button
					style={styles.button}
					mode='contained'
					onPress={() => props.navigation.navigate('schedule')}>
					Event Schedule
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	countdown: {
		alignItems: 'center'
	},
	timer: {
		marginTop: 15
	},
	countdownDigit: {
		borderWidth: 2,
		borderRadius: 5
	},
	signUp: {
		alignItems: 'center'
	},
	button: {
		margin: 10
	}
});

CountdownScreen.navigationOptions = {
	title: 'Countdown'
};

export default withTheme(CountdownScreen);
