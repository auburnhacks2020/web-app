import React from 'react';
import { Platform, View } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {
	AboutScreen,
	SponsorsScreen,
	FAQScreen,
	SocialScreen,
	ProfileScreen
} from '../screens';

import { ProfileButton } from '../components';

const config = Platform.select({
	web: {
		headerMode: 'none',
		defaultNavigationOptions: {
			title: 'Home',
			headerStyle: {
				backgroundColor: '#f4511e'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
		}
	},
	default: {
		headerMode: 'none',
		defaultNavigationOptions: {
			title: 'Home',
			headerStyle: {
				backgroundColor: '#f4511e'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
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
			showLabel: false,
			activeTintColor: '#F8F8F8',
			inactiveTintColor: '#586589',
			style: {
				backgroundColor: '#171F33',
				borderTopWidth: 0,
			}
		}
	}
);

tabNavigator.path = '';

export default tabNavigator;
