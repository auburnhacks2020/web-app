import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
	TextInput,
	Button,
	IconButton,
	Checkbox,
	withTheme,
	Subheading,
	Provider,
	Headline,
	ActivityIndicator
} from 'react-native-paper';
import { gql } from 'apollo-boost';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { getToken } from '../auth';
import { Select } from '../components';
import { Colors } from '../constants';
import * as WebBrowser from 'expo-web-browser';
import { TextInputMask } from 'react-native-masked-text';
const _ = require('lodash/core');

const CURRENT_USER = gql`
	{
		currentUser {
			application {
				id
				studentId
				dateOfBirth
				phoneNumber
				gender
				race
				languages
				dietaryRestrictions
				specialAccomodations
				shirtSize
				needTravel
				emailOptIn
				acceptCodeOfConduct
				sendToSponsors
				sponsorData {
					major
					educationLevel
					school
					interests
					experience
					hackathonAwards
					skills
					gpa
					aboutYou
					biggestChallenge
					resume
				}
			}
		}
	}
`;

const SUBMIT_APPLICATION = gql`
	mutation submitApplication($applicationForm: ApplicationForm!) {
		submitApplication(applicationForm: $applicationForm) {
			submitted
		}
	}
`;

const useWindowDimensions = () => {
	const [windowData, setWindowData] = useState(Dimensions.get('window'));

	useEffect(() => {
		const onChange = result => {
			setWindowData(result.window);
		};

		Dimensions.addEventListener('change', onChange);

		return () => Dimensions.removeEventListener('change', onChange);
	});

	return {
		...windowData,
		isLandscape: windowData.width > windowData.height
	};
};

const defaultApp = {
	studentId: '',
	dateOfBirth: '',
	phoneNumber: '',
	gender: '',
	race: '',
	languages: [],
	dietaryRestrictions: [],
	specialAccomodations: [],
	shirtSize: '',
	needTravel: false,
	emailOptIn: true,
	acceptCodeOfConduct: false,
	sponsorData: {
		major: '',
		educationLevel: '',
		school: '',
		interests: [],
		experience: 0,
		hackathonAwards: [],
		skills: [],
		gpa: '',
		aboutYou: '',
		biggestChallenge: '',
		resume: ''
	},
	sendToSponsors: false
}

const ApplicationScreen = props => {
	const { colors } = props.theme;
	const { width } = useWindowDimensions();
	const [pageIndex, setPageIndex] = useState(0);
	const [app, setApp] = useState(defaultApp);
	const [title, setTitle] = useState('');

	const [token, setToken] = useState('');

	const getUserToken = async () => {
		try {
			const userToken = await getToken();
			if (userToken === null) navigate('login');
			setToken(userToken);
		} catch (err) {
			console.log(err);
		}
	};

	const [getCurrentUser, { called, loading, error, data }] = useLazyQuery(
		CURRENT_USER,
		{
			context: { headers: { authorization: 'Bearer ' + token } }
		}
	);
	const [submitApplication, submitApplicationResult] = useMutation(
		SUBMIT_APPLICATION,
		{
			context: { headers: { authorization: 'Bearer ' + token } }
		}
	);

	useEffect(() => {
		if (data && token !== '') getCurrentUser();
		else if (token === '') getUserToken();
		else getCurrentUser();
	}, [token, data]);

	

	useEffect(() => {
		const incomingApp = data ? data.currentUser.application : null;
		if (incomingApp && !_.isEqual(app, incomingApp)) {
			const newApp = app;
			for (const [key, val] of Object.entries(app)) {
				if (key === 'sponsorData') {
					for (const [subkey, subval] of Object.entries(newApp.sponsorData)) {
						newApp[key][subkey] = incomingApp[key][subkey];
					}
				} else {
					newApp[key] = incomingApp[key];
				}
			}
			setApp({ ...app, ...newApp });
		}
	}, [data]);

	const submitApp = async () => {
		try {
			const res = await submitApplication({
				variables: { applicationForm: app }
			});
			console.log(res.data);
			if (res.data.submitApplication.submitted)
				getCurrentUser();
				props.navigation.navigate('home');
		} catch (err) {
			console.log(err);
		}
	};

	const updateField = (key, val) => {
		setApp(app => ({
			...app,
			[key]: val
		}));
	};

	const updateSponsorDataField = (key, val) => {
		setApp(app => ({
			...app,
			sponsorData: {
				...app.sponsorData,
				[key]: val
			}
		}));
	};

	const evalErrors = err => {
		// TODO: check for errors after submission
		console.log(err);
	};

	if (!called || loading)
		return (
			<View
				style={StyleSheet.flatten([
					styles.container,
					{ backgroundColor: colors.background }
				])}>
				<ActivityIndicator />
			</View>
		);
	if (error) {
		console.log(error);
		return (
			<View
				style={StyleSheet.flatten([
					styles.container,
					{ backgroundColor: colors.background }
				])}>
				<Text>Uh oh! An Error has occurred!</Text>
			</View>
		);
	}

	let dobInput,
		phoneNumInput,
		challengeInput,
		resumeInput = null;
	const titles = [
		{
			id: 0,
			title: 'Basic Info'
		},
		{
			id: 1,
			title: 'Education info'
		},
		{
			id: 2,
			title: 'Hackathon Experience'
		},
		{
			id: 3,
			title: 'Short answer questions'
		},
		{
			id: 4,
			title: 'Info for our sponsors'
		},
		{
			id: 5,
			title: 'Almost There!'
		}
	];

	const pages = [
		<View style={styles.appPage}>
			<TextInput
				ref={input => {
					sidInput = input;
				}}
				label='Student ID #'
				value={app.studentId}
				onChangeText={val => updateField('studentId', val)}
				onSubmitEditing={() => {
					dobInput.focus();
				}}
				blurOnSubmit={false}
				style={styles.textInput}
			/>
			<TextInput
				ref={input => {
					dobInput = input;
				}}
				label='Date of Birth MM/DD/YYYY'
				value={app.dateOfBirth}
				render={props => (
					<TextInputMask
						{...props}
						type={'custom'}
						options={{
							/**
							 * mask: (String | required | default '')
							 * the mask pattern
							 * 9 - accept digit.
							 * A - accept alpha.
							 * S - accept alphanumeric.
							 * * - accept all, EXCEPT white space.
							 */
							mask: '99/99/9999'
						}}
						value={app.dateOfBirth}
						onChangeText={val => updateField('dateOfBirth', val)}
					/>
				)}
				onSubmitEditing={() => {
					phoneNumInput.focus();
				}}
				blurOnSubmit={false}
				style={styles.textInput}
			/>
			<TextInput
				ref={input => {
					phoneNumInput = input;
				}}
				value={app.phoneNumber}
				render={props => (
					<TextInputMask
						{...props}
						type={'custom'}
						options={{
							/**
							 * mask: (String | required | default '')
							 * the mask pattern
							 * 9 - accept digit.
							 * A - accept alpha.
							 * S - accept alphanumeric.
							 * * - accept all, EXCEPT white space.
							 */
							mask: '(999)-999-9999'
						}}
						value={app.phoneNumber}
						onChangeText={val => updateField('phoneNumber', val)}
					/>
				)}
				label='Phone Number (xxx)-xxx-xxxx'
				blurOnSubmit
				style={styles.textInput}
			/>
			<Select
				placeholder='Gender'
				type='gender'
				selected={app.gender}
				setSelected={val => updateField('gender', val)}
			/>
			<Select
				placeholder='Race/Ethnicity'
				type='race'
				selected={app.race}
				setSelected={val => updateField('race', val)}
			/>
			<Select
				multiple
				placeholder='Preffered Spoken Language(s)'
				type='language'
				selected={app.languages}
				setSelected={val => updateField('languages', val)}
			/>
			<Select
				multiple
				placeholder='Do you have any dietary restrictions?'
				type='dietaryRestrictions'
				selected={app.dietaryRestrictions}
				setSelected={val => updateField('dietaryRestrictions', val)}
			/>
			<Select
				multiple
				placeholder='Do you need any special accomodations?'
				type='specialAccomodations'
				selected={app.specialAccomodations}
				setSelected={val => updateField('specialAccomodations', val)}
			/>
			<Select
				placeholder='Shirt Size'
				type='shirtSize'
				selected={app.shirtSize}
				setSelected={val => updateField('shirtSize', val)}
			/>
		</View>,
		<View style={styles.appPage}>
			<Select
				placeholder='School'
				type='school'
				selected={app.sponsorData.school}
				setSelected={val => updateSponsorDataField('school', val)}
			/>
			<Select
				placeholder='Major'
				type='major'
				selected={app.sponsorData.major}
				setSelected={val => updateSponsorDataField('major', val)}
			/>
			<Select
				placeholder='Education Level'
				type='educationLevel'
				selected={app.sponsorData.educationLevel}
				setSelected={val => updateSponsorDataField('educationLevel', val)}
			/>
			<TextInput
				label='GPA (on a 4.0 scale)'
				render={props => (
					<TextInputMask
						{...props}
						type={'custom'}
						options={{
							/**
							 * mask: (String | required | default '')
							 * the mask pattern
							 * 9 - accept digit.
							 * A - accept alpha.
							 * S - accept alphanumeric.
							 * * - accept all, EXCEPT white space.
							 */
							mask: '9.9'
						}}
						value={app.sponsorData.gpa}
						onChangeText={val => updateSponsorDataField('gpa', val)}
					/>
				)}
				blurOnSubmit
				style={styles.textInput}
			/>
		</View>,
		<View style={styles.appPage}>
			<Select
				multiple
				placeholder='Interests'
				type='interests'
				selected={app.sponsorData.interests}
				setSelected={val => updateSponsorDataField('interests', val)}
			/>
			<Select
				placeholder='How many hackathons have you participated in?'
				type='experience'
				selected={app.sponsorData.experience}
				setSelected={val => updateSponsorDataField('experience', val)}
			/>
			<Select
				multiple
				placeholder='Has one of your projects won a prize?'
				type='awards'
				selected={app.sponsorData.hackathonAwards}
				setSelected={val => updateSponsorDataField('hackathonAwards', val)}
			/>
			<Select
				multiple
				placeholder='Skills'
				type='skills'
				selected={app.sponsorData.skills}
				setSelected={val => updateSponsorDataField('skills', val)}
			/>
			<TextInput
				ref={input => {
					aboutInput = input;
				}}
				label='Why do you want to participate at AuburnHacks?'
				multiline
				value={app.sponsorData.aboutYou}
				onChangeText={val => updateSponsorDataField('aboutYou', val)}
				onSubmitEditing={() => {
					challengeInput.focus();
				}}
				blurOnSubmit={false}
				style={StyleSheet.flatten([styles.textInput, { height: 350 }])}
			/>
			<TextInput
				ref={input => {
					challengeInput = input;
				}}
				label='Describe the coolest/most satisfying project you’ve worked on. (Doesn’t have to be tech-related)'
				placeholder='Describe the coolest/most satisfying project you’ve worked on. (Doesn’t have to be tech-related)'
				multiline
				value={app.sponsorData.biggestChallenge}
				onChangeText={val => updateSponsorDataField('biggestChallenge', val)}
				onSubmitEditing={() => {
					resumeInput.focus();
				}}
				blurOnSubmit={false}
				style={StyleSheet.flatten([styles.textInput, { height: 350 }])}
			/>
			<TextInput
				ref={input => {
					resumeInput = input;
				}}
				label='Link to Resume'
				value={app.sponsorData.resume}
				onChangeText={val => updateSponsorDataField('resume', val)}
				blurOnSubmit
				dataDetectorTypes='link'
				style={styles.textInput}
			/>
		</View>,
		<View style={styles.appPage}>
			<View style={styles.checkboxContainer}>
				<Subheading>
					Will you need bus travel from Atlanta? {'('}We will be providing bus
					travel from the ATL Airport / Atlanta Area.{')'}
				</Subheading>
				<Checkbox
					color={colors.primary}
					status={app.needTravel ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('needTravel', !app.needTravel);
					}}
				/>
			</View>
			<View style={styles.checkboxContainer}>
				<Subheading>Opt-in to receive emails from AuburnHacks?</Subheading>
				<Checkbox
					color={colors.primary}
					status={app.emailOptIn ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('emailOptIn', !app.emailOptIn);
					}}
				/>
			</View>
			<View style={styles.checkboxContainer}>
				<Subheading style={{ fontStyle: 'italic' }}>
					I authorize you to share my application/registration information for
					event administration, ranking, MLH administration, pre- and post-event
					informational e-mails, and occasional messages about hackathons
					in-line with{' '}
					<Subheading
						style={{ color: colors.primary, textDecorationLine: 'underline' }}
						onPress={() =>
							WebBrowser.openBrowserAsync('https://mlh.io/privacy')
						}>
						the MLH Privacy Policy
					</Subheading>
					. I further agree to the terms of both the{' '}
					<Subheading
						style={{ color: colors.primary, textDecorationLine: 'underline' }}
						onPress={() =>
							WebBrowser.openBrowserAsync(
								'https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions'
							)
						}>
						{' '}
						MLH Contest Terms and Conditions
					</Subheading>{' '}
					and the{' '}
					<Subheading
						style={{ color: colors.primary, textDecorationLine: 'underline' }}
						onPress={() =>
							WebBrowser.openBrowserAsync('https://mlh.io/privacy')
						}>
						the MLH Privacy Policy
					</Subheading>
					.
				</Subheading>
				<Checkbox
					color={colors.primary}
					status={app.sendToSponsors ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('sendToSponsors', !app.sendToSponsors);
					}}
				/>
			</View>
			<View style={styles.checkboxContainer}>
				<Subheading style={{ fontStyle: 'italic' }}>
					Do you accept the{' '}
					<Subheading
						accessibilityRole='link'
						style={{ color: colors.primary, textDecorationLine: 'underline' }}
						onPress={() =>
							WebBrowser.openBrowserAsync(
								'https://static.mlh.io/docs/mlh-code-of-conduct.pdf'
							)
						}>
						MLH Code of Conduct
					</Subheading>{' '}
					and the{' '}
					<Subheading
						accessibilityRole='link'
						style={{ color: colors.primary, textDecorationLine: 'underline' }}
						onPress={() =>
							WebBrowser.openBrowserAsync(
								'https://drive.google.com/file/d/1oaYukg6gLMciTBAAyRDgjCRhnvSkp6OA/view'
							)
						}>
						INFORMED CONSENT WAIVER for AUBURNHACKS
					</Subheading>
					?
				</Subheading>
				<Checkbox
					color={colors.primary}
					status={app.acceptCodeOfConduct ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('acceptCodeOfConduct', !app.acceptCodeOfConduct);
					}}
				/>
			</View>
		</View>
	];

	return (
		<Provider theme={props.theme}>
			<View
				onLayout={() => {
					setTitle(titles[pageIndex].title);
				}}
				style={StyleSheet.flatten([
					styles.container,
					{ backgroundColor: colors.background }
				])}>
				<View style={styles.title}>
					<Headline style={{ fontSize: 36 }}>{title}</Headline>
				</View>
				<ScrollView
					style={styles.applicationForm}
					contentContainerStyle={{ alignItems: 'center' }}
					showsHorizontalScrollIndicator={false}>
					<View
						style={{
							width: width < 500 ? width : 500,
							maxWidth: 500,
							padding: 10,
							borderWidth: 2,
							padding: 20,
							margin: 50,
							borderRadius: 10,
							borderColor: Colors.iconDefault
						}}>
						{pages[pageIndex]}
						<View style={styles.paginator}>
							<IconButton
								icon='arrow-left'
								onPress={() => {
									pageIndex > 0 ? setPageIndex(pageIndex - 1) : null;
									setTitle(titles[pageIndex - 1].title);
								}}
								color={pageIndex !== 0 ? Colors.iconDefault : colors.background}
							/>
							<View style={styles.paginatorDots}>
								{pages.map((_, idx) => (
									<Button
										key={idx}
										icon='circle'
										compact
										color={
											idx === pageIndex
												? Colors.iconSelected
												: Colors.iconDefault
										}
										onPress={() => {
											setPageIndex(idx);
											setTitle(titles[idx].title);
										}}
									/>
								))}
							</View>
							<IconButton
								icon='arrow-right'
								onPress={() => {
									pageIndex < pages.length - 1
										? setPageIndex(pageIndex + 1)
										: null;
									setTitle(titles[pageIndex + 1].title);
								}}
								color={
									pageIndex !== pages.length - 1
										? Colors.iconDefault
										: colors.background
								}
							/>
						</View>
						{pageIndex === pages.length - 1 ? (
							<Button
								style={styles.button}
								mode='contained'
								onPress={submitApp}
								loading={submitApplicationResult.loading}
								disabled={!(app.sendToSponsors && app.acceptCodeOfConduct)}>
								Submit Application
							</Button>
						) : null}
					</View>
				</ScrollView>
			</View>
		</Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	applicationForm: {
		padding: 10,
		width: '100%'
	},
	appPage: {},
	paginator: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	paginatorDots: {
		flexDirection: 'row'
	},
	textInput: {
		marginBottom: 10
	},
	button: {
		marginTop: 5,
		alignSelf: 'flex-end'
	},
	checkboxContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10
	},
	title: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	}
});

export default withTheme(ApplicationScreen);
