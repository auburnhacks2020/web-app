import React, { useState } from 'react';
import {
	View,
	Image,
	ImageBackground,
	Text,
	StyleSheet,
	Platform
} from 'react-native';
import { Headline, Subheading, Surface } from 'react-native-paper';
import { fonts } from '../constants';

export default function Header(props) {

	return (
		<View>
			<Surface style={styles.surface}>
				<ImageBackground
					source={require('../assets/images/background.png')}
					style={{ width: null }}>
					<View style={styles.logos}>
						<Image
							style={{ width: 315, height: 250 }}
							source={require('../assets/images/binarylogo1.0.png')}
						/>
						{props.showDate === false  ? (
							null
						) : <Subheading style={styles.sub}>February 8-9, 2020</Subheading>}
					</View>
				</ImageBackground>
			</Surface>
			{props.title ? (
				<Headline style={styles.headline}>{props.title}</Headline>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	headline: {
		color: '#dd550c',
		fontSize: 48,
		fontWeight: '700',
		lineHeight:'1',
		alignSelf: 'center',
		marginTop: 15,
		marginBottom: 15,
		padding: 15,
		fontFamily: fonts.text,
		borderBottomWidth: 1,
		borderBottomColor: '#f8f8f8'
	},
	sub: {
		fontFamily: fonts.text,
		fontSize: 30,
		color: '#f8f8f8',
		padding: 10,
		alignSelf: 'center'
	},
	logos: {
		flex: 1,
		margin: 15,
		flexDirection: 'row',
		alignSelf: 'center',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: null,
		height: null
	},
	surface: {
		elevation: 6
	}
});
