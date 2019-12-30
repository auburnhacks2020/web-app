import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { layout } from '../constants';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import * as WebBrowser from 'expo-web-browser';
import { isSignedIn, onSignOut } from '../auth';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	header: {
        flex: 1,
		flexDirection: 'column',
		alignItems:'center',
	},
	container: {
		flexDirection:'row',
		position:'relative',
		top: isSignedIn === true ? 83 : 98
	},
	auburn: {
		color: colors.tintColor,
		fontSize: 28,
		fontFamily: fonts.heading,
		alignSelf: 'center',
	},
	hacks: {
		color: colors.white,
		fontSize: 28,
		fontFamily: fonts.robotoMono,
		alignSelf: 'center'
	}
});

const AppHeader = (props) => {
	const [signedIn, setSignedIn] = useState(null);
	useEffect(() => {
		if(signedIn === null) fetchSignInState();
	}, [signedIn]);
	const fetchSignInState = async () => {
		try {
			const status = await isSignedIn();
			setSignedIn(status);
		} catch (err) {
			console.log(err);
		}
	};
    return (
			<SafeAreaView style={styles.header}>
				<View style={{alignSelf:'flex-start', position:'relative', top:33}}>
				{signedIn ?
					<TouchableOpacity onPress={() => onSignOut().then(() => props.navigation.navigate('signIn'))}>
						<Ionicons
							name={Platform.OS == 'ios' ? 'ios-more' : 'md-more'}
							size={30}
							color='#fff'
							style={{ position: 'relative', top: 85, left: 25 }}
						/>
					</TouchableOpacity>
				 : null}
				</View>
				<View style={styles.container}>
					<Text style={styles.auburn}>AUBURN</Text>
					<Text style={styles.hacks}>HACKS</Text>
				</View>
				<View style={{alignSelf:'flex-end', position:'relative', top: isSignedIn === true ? 33 : 45}}>
					<TouchableOpacity
						onPress={() =>
							WebBrowser.openBrowserAsync(
								'https://mlh.io/seasons/na-2020/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2020-season&utm_content=white'
							)
						}>
						<Image
							style={{
								width: 100,
								height: 200,
							}}
							source={require('../assets/logos/mlh-trust-badge-2020-white.png')}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
}

export default AppHeader
