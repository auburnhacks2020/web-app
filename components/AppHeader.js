import React from 'react';
import { Platform, View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
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
    return (
			<SafeAreaView style={styles.header}>
				<View style={{alignSelf:'flex-start', position:'relative', top:33}}>
				{isSignedIn === true ? 
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

{/* <a id="mlh-trust-badge" style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000" href="https://mlh.io/seasons/na-2020/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2020-season&utm_content=white" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2020/mlh-trust-badge-2020-white.svg" alt="Major League Hacking 2020 Hackathon Season" style="width:100%"></a> */}
