import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {
	TouchableOpacity,
	Image,
	View,
	SafeAreaView,
	Platform
} from 'react-native';
import { layout } from './constants';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { Provider as PaperProvider } from 'react-native-paper';
import { defaultTheme, darkTheme } from './constants/theme';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { APOLLO_SERVER_URL } from 'react-native-dotenv';
import * as WebBrowser from 'expo-web-browser';

import AppNavigator from './navigation/AppNavigator';

console.log(APOLLO_SERVER_URL);

const client = new ApolloClient({
	uri: APOLLO_SERVER_URL
});

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	} else {
		return (
			<ApolloProvider client={client}>
				<PaperProvider theme={defaultTheme}>
					<AppNavigator />
					<SafeAreaView
						style={{
							position: 'absolute',
							top: Platform.OS === 'android' ? 16 : -18,
							right: 7,
							width: layout.isBrowser ? 100 : 75,
							height: layout.isBrowser ? 200 : 165
						}}>
						<View>
							<TouchableOpacity
								onPress={() =>
									WebBrowser.openBrowserAsync(
										'https://mlh.io/seasons/na-2020/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2020-season&utm_content=white'
									)
								}>
								<Image
									style={{
										width: layout.isBrowser ? 100 : 75,
										height: layout.isBrowser ? 200 : 165
									}}
									source={require('./assets/logos/mlh-trust-badge-2020-white.png')}
									resizeMode='contain'
								/>
							</TouchableOpacity>
						</View>
					</SafeAreaView>
				</PaperProvider>
			</ApolloProvider>
		);
	}
}
async function loadResourcesAsync() {
	await Promise.all([
		Font.loadAsync({
			...Ionicons.font,
			'roboto-mono': require('./assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf'),
			'roboto-mono-bold': require('./assets/fonts/Roboto_Mono/RobotoMono-Bold.ttf'),
			montserrat: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf')
		}),
		Asset.loadAsync([
			require('./assets/logos/AuburnHacks-1.png'),
			require('./assets/sponsors/ASCcolorlogos.png'),
			require('./assets/sponsors/Brooksourcelogo-color.png'),
			require('./assets/sponsors/IPLogo_White.png'),
			require('./assets/sponsors/Logo_360_Horizontal_White.png'),
			require('./assets/sponsors/SiteOne_2c_LS_R_web.png'),
			require('./assets/sponsors/sticker-mule-logo-light.png'),
			require('./assets/sponsors/voiceflow-logo-white-full.png')
		])
	]);
}

function handleLoadingError(error) {
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}
