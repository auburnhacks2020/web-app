import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {
	AboutScreen,
	SponsorsScreen,
	FAQScreen,
	SocialScreen
} from '../screens';

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: {}
});

const AboutStack = createStackNavigator(
	{
		About: AboutScreen
	},
	config
);

AboutStack.navigationOptions = {
	tabBarLabel: 'About',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	)
};

AboutStack.path = '';

const SponsorStack = createStackNavigator(
	{
		Sponsors: SponsorsScreen
	},
	config
);

SponsorStack.navigationOptions = {
	tabBarLabel: 'Sponsors',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
		/>
	)
};

SponsorStack.path = '';

const FAQStack = createStackNavigator(
	{
		FAQs: FAQScreen
	},
	config
);

FAQStack.navigationOptions = {
	tabBarLabel: 'FAQs',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
		/>
	)
};

FAQStack.path = '';

const SocialStack = createStackNavigator(
	{
		social: SocialScreen
	},
	config
);

SocialStack.navigationOptions = {
	tabBarLabel: 'Social',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
		/>
	)
};

SocialStack.path = '';

const tabNavigator = createBottomTabNavigator({
	AboutStack,
	SponsorStack,
  FAQStack,
  SocialStack
});

tabNavigator.path = '';

export default tabNavigator;
