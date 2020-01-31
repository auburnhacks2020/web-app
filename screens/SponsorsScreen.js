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
import MotionIndustriesLogo from '../assets/sponsors/MI_KIIM-RGB.svg';
import AccentureLogo from '../assets/sponsors/Acc_Logo_Black_Purple_RGB.svg';
import McLeodLogo from '../assets/sponsors/McLeodLogo_2c.svg';
import TSYSLogo from '../assets/sponsors/TSYS_logo.svg';
import AircondLogo from '../assets/sponsors/Aircond.svg';
import AUOnlineLogo from '../assets/sponsors/AUOnlineLogo_fullcolor.svg';
import NouLogo from '../assets/sponsors/logo_nousystems_bluebg.svg';
import JBHuntLogo from '../assets/sponsors/Logo_360_Horizontal.svg';
import LinodeLogo from '../assets/sponsors/linodeLogo-CYMK-FC.svg';
import CokeLogo from '../assets/sponsors/coke-logo.svg';
import MaxLogo from '../assets/sponsors/MAX_SMMS_4c.svg';

const SponsorsScreen = props => {
	const { colors } = props.theme;

	const logos = [
		{
			logo: MotionIndustriesLogo,
			level: 'gold',
			svg: true
		},
		{
			logo: McLeodLogo,
			level: 'gold',
			svg: true
		},
		{
			logo: TSYSLogo,
			level: 'gold',
			svg: true
		},
		{
			logo: require('../assets/sponsors/ASCcolorlogos.png'),
			level: 'gold'
		},
		{
			logo: AircondLogo,
			level: 'silver',
			svg: true
		},
		{
			logo: AUOnlineLogo,
			level: 'silver',
			svg: true
		},
		{
			logo: require('../assets/sponsors/IPLogo_White.png'),
			level: 'silver'
		},
		{
			logo: NouLogo,
			level: 'silver',
			svg: true
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
			logo: JBHuntLogo,
			level: 'silver',
			svg: true
		},
		{
			logo: LinodeLogo,
			level: 'bronze',
			svg: true
		},
		{
			logo: require('../assets/sponsors/Brooksourcelogo-color.png'),
			level: 'bronze'
		},
		{
			logo: AccentureLogo,
			level: 'silver',
			svg: true
		},
		{
			logo: require('../assets/sponsors/sticker-mule-logo-light.png'),
			level: 'bronze'
		},
		{
			logo: CokeLogo,
			level: 'bronze',
			svg: true
		},
		{
			logo: MaxLogo,
			level: 'silver',
			svg: true
		}
	];
	return (
		<ScrollView style={stylesheet.container}>
			<Header title='Sponsors' />
			<View style={{ margin: 7 }}>
				<View>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'center',
							width: '100%'
						}}>
						{logos.map((img, idx) => {
							const Logo = img.logo;
							return img.level === 'gold' ? (
								img.svg ? (
									<Logo key={idx} width={300} height={300} style={{ margin: 15 }} />
								) : (
									<Image
										key={idx}
										resizeMode='contain'
										style={{ width: 300, height: 300, margin: 15 }}
										resizeMethod='auto'
										source={Logo}
									/>
								)
							) : null;
						})}
					</View>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'space-around',
							width: '100%'
						}}>
						{logos.map((img, idx) => {
							const Logo = img.logo;
							return img.level === 'silver' ? (
								img.svg ? (
									<Logo key={idx} width={200} height={200} style={{ margin: 20 }} />
								) : (
									<Image
										key={idx}
										resizeMode='contain'
										style={{ width: 200, height: 200, margin: 20 }}
										resizeMethod='auto'
										source={Logo}
									/>
								)
							) : null;
						})}
					</View>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'center',
							width: '100%'
						}}>
						{logos.map((img, idx) => {
							const Logo = img.logo;
							return img.level === 'bronze' ? (
								img.svg ? (
									<Logo key={idx} width={100} height={100} style={{ margin: 10 }} />
								) : (
									<Image
										key={idx}
										resizeMode='contain'
										style={{ width: 100, height: 100, margin: 20 }}
										resizeMethod='auto'
										source={Logo}
									/>
								)
							) : null;
						})}
					</View>
				</View>
				<View style={stylesheet.row}>
					<Paragraph>
						This event would not be possible without the support shown to us by
						Auburn University's Computer Science & Software Engineering
						Department and all of our future sponsors. {'\n\n'}
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
			</View>
		</ScrollView>
	);
};

SponsorsScreen.navigationOptions = {};

export default withTheme(SponsorsScreen);
