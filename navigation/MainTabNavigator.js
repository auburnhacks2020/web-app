import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';

import { TabBarIcon, AppHeader } from '../components';
import {
	AboutScreen,
	SponsorsScreen,
	FAQScreen,
	SocialScreen,
	ProfileScreen
} from '../screens';

import { ProfileButton } from '../components';
import Fonts from '../constants/Fonts';

const config = Platform.select({
	web: {
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			headerTitle: <AppHeader />,
			headerStyle: {
				backgroundColor: '#171F33'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
		}
	},
	default: {
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			title: 'Home',
			headerStyle: {
				backgroundColor: '#171F33'
			},
			headerTintColor: '#fff',
			headerTitle: <AppHeader />,
			headerLayoutPreset: 'center'
		}
	}
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
					? 'ios-paw'
					: 'md-paw'
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
			name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
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
			name={Platform.OS === 'ios' ? 'ios-help' : 'md-help'}
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
			name={Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'}
		/>
	)
};

SocialStack.path = '';

const ProfileStack = createStackNavigator(
	{
		profile: ProfileScreen
	},
	config
);

ProfileStack.navigationOptions = {
	tabBarLabel: 'Profile',
	tabBarButtonComponent: props => <ProfileButton {...props} />
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator(
	{
		AboutStack,
		SponsorStack,
		ProfileStack,
		FAQStack,
		SocialStack
	},
	{
		tabBarOptions: {
			// showLabel: false,
			activeTintColor: '#F8F8F8',
			inactiveTintColor: '#586589',
			style: {
				backgroundColor: '#171F33',
				borderTopWidth: 0,
			},
			labelStyle: {
				fontFamily: Fonts.robotoMono
			}
		}
	}
);

tabNavigator.path = '';

export default tabNavigator;
