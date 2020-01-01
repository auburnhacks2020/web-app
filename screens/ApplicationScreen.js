import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
	Text,
	TextInput,
	Button,
	IconButton,
	Checkbox,
	withTheme,
	Subheading,
	Paragraph
} from 'react-native-paper';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Select, ClearBottomTabsView } from '../components';
import { Colors } from '../constants';

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
			interest: [],
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

	const submitApplication = () => {
		alert('App Sumbitted... or not 👀');
	};

	let dobInput,
		phoneNumInput,
		challengeInput,
		resumeInput = null;

	const pages = [
		<View style={styles.appPage}>
			<TextInput
				ref={input => {
					sidInput = input;
				}}
				mode='outlined'
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
				mode='outlined'
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
				mode='outlined'
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
				type='dietaryRestricitions'
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
			<TextInput
				ref={input => {
					schoolInput = input;
				}}
				mode='outlined'
				label='School'
				value={app.sponsorData.school}
				onChangeText={val => updateSponsorDataField('school', val)}
				blurOnSubmit
				style={styles.textInput}
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
				mode='outlined'
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
				type='interest'
				selected={app.sponsorData.interest}
				setSelected={val => updateSponsorDataField('interest', val)}
			/>
			<Select
				placeholder='Experience'
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
				mode='outlined'
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
				mode='outlined'
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
				mode='outlined'
				label='Link to Resume'
				value={app.sponsorData.resume}
				onChangeText={val => updateSponsorDataField('resume', val)}
				blurOnSubmit
				style={styles.textInput}
			/>
		</View>,
		<View style={styles.appPage}>
			<View style={styles.checkboxContainer}>
				<Subheading>Will you need travel reimbursments?</Subheading>
				<Checkbox
					status={app.needTravel ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('needTravel', !app.needTravel);
					}}
				/>
			</View>
			<View style={styles.checkboxContainer}>
				<Subheading>Opt-in to emails from AuburnHacks?</Subheading>
				<Checkbox
					status={app.emailOptIn ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('emailOptIn', !app.emailOptIn);
					}}
				/>
			</View>
			<View style={styles.checkboxContainer}>
				<Subheading>Would you like to send your info to sponsors?</Subheading>
				<Checkbox
					status={app.sendToSponsors ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('sendToSponsors', !app.sendToSponsors);
					}}
				/>
			</View>
			<View style={styles.checkboxContainer}>
				<Subheading>Do you accept the MLH Code of Conduct?</Subheading>
				<Checkbox
					status={app.acceptCodeOfConduct ? 'checked' : 'unchecked'}
					onPress={() => {
						updateField('acceptCodeOfConduct', !app.acceptCodeOfConduct);
					}}
				/>
			</View>
		</View>
	];

	console.log(width);

	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: colors.background }
			])}>
			<ScrollView
				style={styles.applicationForm}
				contentContainerStyle={{ alignItems: 'center' }}>
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
							onPress={() =>
								pageIndex > 0 ? setPageIndex(pageIndex - 1) : null
							}
							color={pageIndex !== 0 ? Colors.iconDefault : colors.background}
						/>
						<View style={styles.paginatorDots}>
							{pages.map((_, idx) => (
								<Button
									icon='circle'
									compact
									color={
										idx === pageIndex ? Colors.iconSelected : Colors.iconDefault
									}
									onPress={() => setPageIndex(idx)}
								/>
							))}
						</View>
						<IconButton
							icon='arrow-right'
							onPress={() =>
								pageIndex < pages.length - 1
									? setPageIndex(pageIndex + 1)
									: null
							}
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
							onPress={submitApplication}
							loading={false}
							disabled={!app.acceptCodeOfConduct}>
							Submit Application
						</Button>
					) : null}
				</View>
			</ScrollView>
		</View>
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
	}
});

export default withTheme(ApplicationScreen);
