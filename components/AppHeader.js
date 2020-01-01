import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { layout } from '../constants';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import * as WebBrowser from 'expo-web-browser';
import { isSignedIn, onSignOut } from '../auth';
import { Ionicons } from '@expo/vector-icons';

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

	const styles = StyleSheet.create({
		header: {
			flex: 1,
			flexDirection: 'column',
			alignItems: 'center'
		},
		container: {
			flexDirection: 'row',
			position: 'relative',
		},
		auburn: {
			color: colors.tintColor,
			fontSize: 28,
			fontFamily: fonts.heading,
			alignSelf: 'center'
		},
		hacks: {
			color: colors.white,
			fontSize: 28,
			fontFamily: fonts.robotoMono,
			alignSelf: 'center'
		}
	});


    return (
			<SafeAreaView style={styles.header}>
				<View style={styles.container}>
					<Text style={styles.auburn}>AUBURN</Text>
					<Text style={styles.hacks}>HACKS</Text>
				</View>
			</SafeAreaView>
		);
}

export default AppHeader
