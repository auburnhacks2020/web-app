import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBrowserApp } from '@react-navigation/web';
import { Linking } from 'expo';
import MainTabNavigator from './MainTabNavigator';

const AppContainer =
	Platform.OS == 'web'
		? createBrowserApp(MainTabNavigator)
		: createAppContainer(MainTabNavigator);

const prefix = Linking.makeUrl('/');

const App = () => <AppContainer uriPrefix={prefix} />;

export default App;