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
	Headline
} from 'react-native-paper';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getToken } from '../auth';
import { Select } from '../components';
import { Colors } from '../constants';
import * as WebBrowser from 'expo-web-browser';

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

const ApplicationScreen = props => {
	const { colors } = props.theme;
	const { width } = useWindowDimensions();
	const [token, setToken] = useState('');
	const [pageIndex, setPageIndex] = useState(0);
	const [app, setApp] = useState({
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
	});
	const [title, setTitle] = useState('');

	useEffect(() => {
		if (token === '') retrieveToken();
	}, [token]);

	const retrieveToken = async () => {
		try {
			const newToken = await getToken();
			setToken(newToken);
		} catch (err) {
			console.log(err);
		}
	};

	const [submitApplication, submitApplicationResult] = useMutation(
		SUBMIT_APPLICATION,
		{
			context: { headers: { authorization: 'Bearer ' + token } }
		}
	);

	const submitApp = async () => {
		try {
			const res = await submitApplication({
				variables: { applicationForm: app }
			});
			console.log(res.data);
			if (res.data.submitApplication.submitted)
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
				label='Student ID'
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
				label='Date of Birth'
				value={app.dateOfBirth}
				onChangeText={val => updateField('dateOfBirth', val)}
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
				label='Phone Number'
				value={app.phoneNumber}
				onChangeText={val => updateField('phoneNumber', val)}
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
				placeholder='Race'
				type='race'
				selected={app.race}
				setSelected={val => updateField('race', val)}
			/>
			<Select
				multiple
				placeholder='Language'
				type='language'
				selected={app.languages}
				setSelected={val => updateField('languages', val)}
			/>
			<Select
				multiple
				placeholder='Dietary Restrictions'
				type='dietaryRestrictions'
				selected={app.dietaryRestrictions}
				setSelected={val => updateField('dietaryRestrictions', val)}
			/>
			<Select
				multiple
				placeholder='Special Accomodations'
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
				ref={input => {
					gpaInput = input;
				}}
				label='GPA'
				value={app.sponsorData.gpa}
				onChangeText={val => updateSponsorDataField('gpa', val)}
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
				setSelected={val => updateSponsorDataField('interest', val)}
			/>
			<Select
				placeholder='Number of Hackathons Attended'
				type='experience'
				selected={app.sponsorData.experience}
				setSelected={val => updateSponsorDataField('experience', val)}
			/>
			<Select
				multiple
				placeholder='Hackathon Awards'
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
				label='About You'
				multiline
				value={app.sponsorData.aboutYou}
				onChangeText={val => updateSponsorDataField('aboutYou', val)}
				onSubmitEditing={() => {
					challengeInput.focus();
				}}
				blurOnSubmit={false}
				style={styles.textInput}
			/>
			<TextInput
				ref={input => {
					challengeInput = input;
				}}
				label='Describe your most challenging project'
				multiline
				value={app.sponsorData.biggestChallenge}
				onChangeText={val => updateSponsorDataField('biggestChallenge', val)}
				onSubmitEditing={() => {
					resumeInput.focus();
				}}
				blurOnSubmit={false}
				style={styles.textInput}
			/>
			<TextInput
				ref={input => {
					resumeInput = input;
				}}
				label='Link to Resume'
				value={app.sponsorData.resume}
				onChangeText={val => updateSponsorDataField('resume', val)}
				blurOnSubmit
				style={styles.textInput}
			/>
		</View>,
		<View style={styles.appPage}>
			<View style={styles.checkboxContainer}>
				<Subheading>Will you need bus travel from Atlanta?*</Subheading>
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
				<Subheading>
					I authorize you to share my application/registration information for
					event administration, ranking, MLH administration, pre- and post-event
					informational e-mails, and occasional messages about hackathons
					in-line with the MLH Privacy Policy. I further agree to the terms of
					both the MLH Contest Terms and Conditions and the MLH Privacy Policy.
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
				<Subheading>
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
			<Subheading>
				*We will be providing bus travel from the ATL Airport / Atlanta Area.
			</Subheading>
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
								disabled={!app.acceptCodeOfConduct}>
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
		alignItems: 'center'
	},
	title: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	}
});

export default withTheme(ApplicationScreen);
