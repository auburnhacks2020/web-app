import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
	DataTable,
	Surface,
	Paragraph,
	Headline,
	Card,
	Modal,
	Portal,
	Provider,
	Button
} from 'react-native-paper';
import { Header } from '../components';
import { stylesheet, layout } from '../constants';

export default function SocialScreen() {
	const Saturday = [
		{
			event: 'Check-In Opens',
			time: '11:00 AM',
			location: 'Ballroom',
			id: 0
		},
		{
			event: 'Opening Ceremony',
			time: '12:00 PM',
			location: 'Ballroom',
			id: 1
		},
		{
			event: 'Lunch Opens',
			time: '12:30 PM',
			location: 'Ballroom',
			id: 2
		},
		{
			event: 'Team Formation',
			time: '12:30 PM',
			location: 'Workshop Room 1',
			id: 3
		},
		{
			event: 'Hacking Begins',
			time: '1:00 PM',
			location: 'Brown-Kopel',
			id: 4
		},
		{
			event: 'Cyber Challenge: BASH & Crypto',
			time: '1:30 PM',
			location: 'Workshop Room 2',
			id: 5
		},
		{
			event: 'First time programming crash course',
			time: '1:30 PM',
			location: 'Workshop Room 1',
			id: 6
		},
		{
			event: 'Tech Talk: Alabama Securities Commission',
			time: '2:30 PM',
			location: 'Workshop Room 1',
			id: 7
		},
		{
			event: 'Cyber Event: Password Cracking',
			time: '3:00 PM',
			location: 'Workshop Room 2',
			id: 8
		},
		{
			event: 'MLH Slideshow Karaoke',
			time: '4:00 PM',
			location: 'Workshop Room 1',
			id: 9
		},
		{
			event: 'Dinner Opens',
			time: '5:00 PM',
			location: 'Ballroom',
			id: 28
		},
		{
			event: 'Cyber Challenge Web',
			time: '5:30 PM',
			location: 'Workshop Room 2',
			id: 10
		},
		{
			event: 'Tech Talk: Kotlin for Java',
			time: '6:00 PM',
			location: 'Workshop Room 1',
			id: 11
		},
		{
			event: 'MLH Cyber Security Competition',
			time: '7:30 PM',
			location: 'Workshop Room 2',
			id: 12
		},
		{
			event: 'Bob Ross: MS Paint',
			time: '9:00 PM',
			location: 'Workshop Room 1',
			id: 13
		},
		{
			event: 'Cyber Challenge: Forensics',
			time: '9:30 PM',
			location: 'Workshop Room 2',
			id: 14
		},
		{
			event: 'Late Night Snack',
			time: '10:00 PM',
			location: 'Ballroom',
			id: 15
		},
		{
			event: 'Quiet Room Opens',
			time: '11:00 PM',
			location: 'Workshop Room 1',
			id: 16
		},
		{
			event: 'Cyber Event: Lock Picking',
			time: '11:30 PM',
			location: 'Workshop Room 2',
			id: 17
		}
	];

	const Sunday = [
		{
			event: 'Breakfast Opens',
			time: '8:00 AM',
			location: 'Ballroom',
			id: 18
		},
		{
			event: 'Cyber Event: Pwning',
			time: '9:00 AM',
			location: 'Workshop Room 2',
			id: 19
		},
		{
			event: 'Workshop: Make Art With Code',
			time: '10:00 AM',
			location: 'Workshop Room 1',
			id: 20
		},
		{
			event: 'Cyber Event: Reversing',
			time: '10:30 AM',
			location: 'Workshop Room 2',
			id: 21
		},
		{
			event: 'Submissions due on Devpost: Soft Deadline',
			time: '11:00 AM',
			location: 'Brown-Kopel',
			id: 22
		},
		{
			event: 'Lunch Opens',
			time: '11:30 AM',
			location: 'Ballroom',
			id: 23
		},
		{
			event: 'Expo Begins',
			time: '1:00 PM',
			location: 'Ballroom',
			id: 24
		},
		{
			event: 'Expo Ends',
			time: '2:30 PM',
			location: 'Ballroom',
			id: 25
		},
		{
			event: 'Closing Ceremonies and Announcement of Winners',
			time: '3:30 PM',
			location: 'Ballroom',
			id: 26
		},
		{
			event: 'Goodbye',
			time: '4:00 PM',
			location: 'Ballroom',
			id: 27
		}
	];

	const [event, setEvent] = useState(0);
	const [time, setTime] = useState(0);
	const [location, setLocation] = useState(0);
	const [visible, setVisible] = useState(false);
	return (
		<Provider>
			<Portal>
				<ScrollView style={stylesheet.container}>
					<Header title='Schedule of Events' />
					<Surface style={styles.surface}>
						<Headline
							style={{
								alignSelf: 'center',
								fontSize: 40,
								padding: 5,
								color: '#fff'
							}}>
							Saturday
						</Headline>
						<DataTable>
							<DataTable.Header>
								<DataTable.Title>
									<Paragraph style={styles.text}>Event</Paragraph>
								</DataTable.Title>
								<DataTable.Title>
									<Paragraph style={styles.text}>Time</Paragraph>
								</DataTable.Title>
								<DataTable.Title>
									<Paragraph style={styles.text}>Location</Paragraph>
								</DataTable.Title>
							</DataTable.Header>
							{Saturday.map(event => (
								<DataTable.Row
									key={event.id}
									onPress={() => {
										setEvent(event.event);
										setTime(event.time);
										setLocation(event.location);
										setVisible(true);
									}}>
									<DataTable.Cell>
										<Paragraph style={styles.text}>{event.event}</Paragraph>
									</DataTable.Cell>
									<DataTable.Cell>
										<Paragraph style={styles.text}>{event.time}</Paragraph>
									</DataTable.Cell>
									<DataTable.Cell>
										<Paragraph style={styles.text}>{event.location}</Paragraph>
									</DataTable.Cell>
								</DataTable.Row>
							))}
						</DataTable>
					</Surface>
					<Surface style={styles.surface}>
						<Headline
							style={{
								alignSelf: 'center',
								fontSize: 40,
								padding: 5,
								color: '#fff'
							}}>
							Sunday
						</Headline>
						<DataTable>
							<DataTable.Header>
								<DataTable.Title>
									<Paragraph style={styles.text}>Event</Paragraph>
								</DataTable.Title>
								<DataTable.Title>
									<Paragraph style={styles.text}>Time</Paragraph>
								</DataTable.Title>
								<DataTable.Title>
									<Paragraph style={styles.text}>Location</Paragraph>
								</DataTable.Title>
							</DataTable.Header>
							{Sunday.map(event => (
								<DataTable.Row
									key={event.id}
									onPress={() => {
										setEvent(event.event);
										setTime(event.time);
										setLocation(event.location);
										setVisible(true);
									}}>
									<DataTable.Cell>
										<Paragraph style={styles.text}>{event.event}</Paragraph>
									</DataTable.Cell>
									<DataTable.Cell>
										<Paragraph style={styles.text}>{event.time}</Paragraph>
									</DataTable.Cell>
									<DataTable.Cell>
										<Paragraph style={styles.text}>{event.location}</Paragraph>
									</DataTable.Cell>
								</DataTable.Row>
							))}
						</DataTable>
					</Surface>
				</ScrollView>
				<Modal
					animationType='slide'
					dismissable={true}
					visible={visible}
					onDismiss={() => setVisible(false)}>
					<Card
						style={
							layout.isBrowser
								? {
										width: '50%',
										alignSelf: 'center',
										backgroundColor: '#181818'
								  }
								: {
										width: '90%',
										alignSelf: 'center',
										backgroundColor: '#181818'
								  }
						}>
						<Card.Title title={event} titleStyle={{ color: '#fff' }} />
						<Card.Content>
							<Paragraph style={stylesheet.modalpar}>
								Time: {time}
								{'\n'}Location: {location}
							</Paragraph>
						</Card.Content>
						<Card.Actions style={{ justifyContent: 'flex-end', padding: 20 }}>
							<Button
								mode='contained'
								style={{ backgroundColor: '#03244d', alignSelf: 'flex-end' }}
								onPress={() => setVisible(false)}>
								Close
							</Button>
						</Card.Actions>
					</Card>
				</Modal>
			</Portal>
		</Provider>
	);
}

const styles = StyleSheet.create({
	surface: {
		margin: 10,
		backgroundColor: '#000'
	},
	text: {
		color: '#fff'
	}
});

SocialScreen.navigationOptions = {};
