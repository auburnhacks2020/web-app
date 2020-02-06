import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Text, Headline, Button } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import { stylesheet } from '../constants';

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
				<Headline>Registration is Open!</Headline>
			</View>
			<View style={{flexDirection:'row'}}>
				<Button
					style={styles.button}
					mode='contained'
					onPress={() => props.navigation.navigate('register')}>
					sign up or sign in
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
