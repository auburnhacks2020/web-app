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
import { layout, stylesheet, Colors } from '../constants';
import { Paragraph, Headline, withTheme } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

const SponsorsScreen = props => {
	const { colors } = props.theme;

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
		},
		{
			logo: require('../assets/sponsors/Acc_Logo_Black_Purple_RGB.png'),
			level: 'silver'
		},
		{
			logo: require('../assets/sponsors/sticker-mule-logo-light.png'),
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
			<View style={{ margin: 10 }}>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
						width: '100%'
					}}>
					{logos.map(img =>
						img.level === 'gold' ? (
							<Image
								resizeMode='contain'
								style={{ width: 300, height: 300, margin: 20 }}
								resizeMethod='auto'
								source={img.logo}
							/>
						) : null
					)}
				</View>
			</View>
			<View style={{ margin: 10 }}>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
						width: '100%'
					}}>
					{logos.map(img =>
						img.level === 'silver' ? (
							<Image
								resizeMode='contain'
								style={{ width: 150, height: 150, margin: 20 }}
								resizeMethod='auto'
								source={img.logo}
							/>
						) : null
					)}
				</View>
			</View>
			<View style={{ margin: 10 }}>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
						width: '100%'
					}}>
					{logos.map(img =>
						img.level === 'bronze' ? (
							<Image
								resizeMode='contain'
								style={{ width: 100, height: 100, margin: 20 }}
								resizeMethod='auto'
								source={img.logo}
							/>
						) : null
					)}
				</View>
			</View>
		</ScrollView>
	);
};

SponsorsScreen.navigationOptions = {};

export default withTheme(SponsorsScreen);
