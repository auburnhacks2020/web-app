import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { Provider as PaperProvider } from 'react-native-paper';
import { defaultTheme, darkTheme } from './constants/theme';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { APOLLO_SERVER_URL } from 'react-native-dotenv';

import AppNavigator from './navigation/AppNavigator';


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
				</PaperProvider>
			</ApolloProvider>
		);
	}
}

async function loadResourcesAsync() {
	await Promise.all([
		Font.loadAsync({
			// This is the font that we are using for our tab bar
			...Ionicons.font,
			// We include SpaceMono because we use it in HomeScreen.js. Feel free to
			// remove this if you are not using it in your app
			'roboto-mono': require('./assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf'),
			'roboto-mono-bold': require('./assets/fonts/Roboto_Mono/RobotoMono-Bold.ttf'),
			montserrat: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf')
		}),
		Asset.fromModule(
			require('./assets/logos/AuburnHacks-1.png')
		).downloadAsync()
	]);
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}
