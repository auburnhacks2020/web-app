import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createSwitchNavigator,
	createBottomTabNavigator
} from 'react-navigation';
import { TabBarIcon, AppHeader } from '../components';
import {
	AboutScreen,
	SponsorsScreen,
	FAQScreen,
	SocialScreen,
	CountdownScreen,
	LoginScreen,
	ProfileScreen,
	AuthLoadingScreen,
	VerifyEmailScreen
} from '../screens';

import { ProfileButton } from '../components';
import Fonts from '../constants/Fonts';
import RegisterScreen from '../screens/RegisterScreen';
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
		about: {
			screen: AboutScreen,
			path: ''
		}
	},
	config
);

AboutStack.navigationOptions = {
	tabBarLabel: 'About',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-paw' : 'md-paw'}
		/>
	)
};

const SponsorStack = createStackNavigator(
	{
		sponsors: {
			screen: SponsorsScreen,
			path: ''
		}
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

SponsorStack.path = '/sponsors';

const FAQStack = createStackNavigator(
	{
		FAQs: {
			screen: FAQScreen,
			path: ''
		}
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

FAQStack.path = '/faqs';

const SocialStack = createStackNavigator(
	{
		social: {
			screen: SocialScreen,
			path: ''
		}
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

SocialStack.path = '/social';

const createProfileStack = () => {
	let ProfileStack = createSwitchNavigator(
		{
			authLoading: AuthLoadingScreen,
			signIn: {
				screen: createStackNavigator(
					{
						countdown: {
							screen: CountdownScreen,
							path: 'countdown/'
						},
						register: {
							screen: RegisterScreen,
							path: 'register/'
						},
						login: {
							screen: LoginScreen,
							path: 'login/:token'
						}
					},
					{
						...config,
						defaultNavigationOptions: {
							...config.defaultNavigationOptions,
							headerBackTitle: null
						}
					}
				),
				path: ''
			},
			profile: {
				screen: createStackNavigator(
					{
						ProfileScreen: {
							screen: ProfileScreen,
							path: ''
						}
					},
					config
				),
				path: ''
			}
		},
		{
			navigationOptions: ({ navigation }) => ({
				tabBarButtonComponent: props => (
					<ProfileButton routeName={navigation.state.routeName} {...props} />
				),
				title: 'Home',
				headerStyle: {
					backgroundColor: '#171F33'
				},
				headerTintColor: '#fff',
				headerTitle: <AppHeader />,
				headerLayoutPreset: 'center'
			})
		}
	);

	ProfileStack.path = '';

	return ProfileStack;
};

const tabNavigator = createBottomTabNavigator(
	{
		AboutStack: {
			screen: AboutStack,
			path: 'about'
		},
		SponsorStack: {
			screen: SponsorStack,
			path: 'sponsors'
		},
		ProfileStack: {
			screen: createProfileStack(),
			path: 'profile'
		},
		FAQStack: {
			screen: FAQStack,
			path: 'faq'
		},
		SocialStack: {
			screen: SocialStack,
			path: 'social'
		}
	},
	{
		initialRouteName: 'ProfileStack',
		tabBarOptions: {
			// showLabel: false,

			activeTintColor: '#F8F8F8',
			inactiveTintColor: '#586589',
			style: {
				backgroundColor: '#171F33',
				borderTopWidth: 0
			},
			labelStyle: {
				fontFamily: Fonts.robotoMono
			}
		}
	}
);

export default tabNavigator;
