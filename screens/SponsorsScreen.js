import React from 'react';
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Platform,
	Image
} from 'react-native';
import { Header } from '../components';
import { layout, stylesheet } from '../constants';
import { Paragraph } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

export default function SponsorsScreen() {
	const logos = [
		{
			logo: require('../assets/sponsors/MI_KIIM_reversedwhite.png'),
			level: 'gold'
		},
		{
			logo: require('../assets/sponsors/McLeodLogo_white.png'),
			level: 'gold'
		},
		{
			logo: require('../assets/sponsors/TSYS_white.png'),
			level: 'gold'
		},
		{
			logo: require('../assets/sponsors/ASCcolorlogos.png'),
			level: 'gold'
		},
		{
			logo: require('../assets/sponsors/Aircond.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/AUOnlineLogo_Allwhite.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/IPLogo_White.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/logo_nousystems_whiteonblack.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/SiteOne_2c_LS_R_web.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/voiceflow-logo-white-full.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/Logo_360_Horizontal_White.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/linode-full-1c-rev.png'),
			level: 'bronze'
		},
		{
			logo: require('../assets/sponsors/Brooksourcelogo-color.png'),
			level: 'bronze'
		}
	];
	return (
		<ScrollView style={stylesheet.container}>
			<Header title='Sponsors' />
			<View style={stylesheet.row}>
				<Paragraph>
					This event would not be possible without the support shown to us by
					Auburn University's Computer Science & Software Engineering Department
					and all of our future sponsors. {'\n\n'}
					If you would like to sponsor our event, reach out to us at{' '}
					<Text
						style={stylesheet.links}
						onPress={() =>
							WebBrowser.openBrowserAsync('mailto:staff@auburnhacks.com')
						}>
						staff@auburnhacks.com!
					</Text>
					{'\n\n'}
					<Text
						style={stylesheet.links}
						onPress={() =>
							WebBrowser.openBrowserAsync(
								'https://drive.google.com/file/d/1bRhvxBZ9CtOfEHPSaJyOaXc7B88eYERT/view?usp=sharing'
							)
						}>
						Click here to download the 2020 Prospectus.
					</Text>
					{'\n'}
				</Paragraph>
			</View>
			<View style={{flexDirection:'row', flexWrap:'wrap', width:'100%'}}>
				{logos.map(img => (
					<View style={{width:'25%'}}>
					<Image
						resizeMode='contain'
						style={{ width: '100%', height: 100 }}
						resizeMethod='auto'
						source={img.logo}
					/>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

SponsorsScreen.navigationOptions = {};
