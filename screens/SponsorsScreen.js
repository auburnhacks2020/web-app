import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { Header } from "../components";
import { layout, stylesheet } from "../constants";
import { Paragraph } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";



export default function SponsorsScreen() {
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
								'/assets/pdfs/prospectus.pdf'
							)
						}>
						Click here to download the 2020 Prospectus.
					</Text>
				</Paragraph>
			</View>
		</ScrollView>
	);
}

SponsorsScreen.navigationOptions = {};
