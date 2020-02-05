import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DataTable, Surface, Paragraph } from 'react-native-paper';
import { Header } from '../components';
import { stylesheet } from '../constants';

const schedule = [{
    
}]

export default function SocialScreen() {
	return (
		<ScrollView style={stylesheet.container}>
			<Header title='Schedule of Events' />
			<Surface style={styles.surface}>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Day</DataTable.Title>
						<DataTable.Title>Time</DataTable.Title>
						<DataTable.Title>Event</DataTable.Title>
						<DataTable.Title>Location</DataTable.Title>
					</DataTable.Header>

					<DataTable.Row>
						<DataTable.Cell><Paragraph style={{flexWrap:'wrap'}}>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>11:00 AM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Check-In Opens</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Brown-Kopel</Paragraph></DataTable.Cell>
					</DataTable.Row>

					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>12:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Opening Ceremony</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>12:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Lunch Opens</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>12:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Team Formation</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>1:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Hacking Begins</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Brown-Kopel</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>1:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Cyber Challenge: BASH & Crypto</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 2</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>1:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>First time programming crash course</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>2:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>
							Tech Talk: Alabama Securities Commission
						</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>3:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Cyber Event: Password Cracking</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 2</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>5:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Dinner Opens</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>5:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Cyber Challenge Web</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 2</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>6:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Tech Talk: Kotlin for Java</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshoop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>7:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>MLH Cyber Security Competition</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 2</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>9:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Bob Ross: MS Paint</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>9:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Cyber Challenge: Forensics</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 2</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>10:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Late Night Snack</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Saturday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>11:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Quiet Room Opens</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>11:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Cyber Event: Lock Picking</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 2</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>8:00 AM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Breakfast Opens</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>9:00 AM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Cyber Event: Pwning</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 2</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>10:00 AM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>
							Workshop: Make Art With Code
						</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>10:30 AM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Cyber Event: Reversing</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Workshop Room 1</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>11:00 AM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Submissions due on Devpost: Soft Deadline</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Brown-Kopel</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>11:30 AM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Lunch Opens</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>1:00 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Expo Begins</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell><Paragraph>Sunday</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>3:30 PM</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Closing Ceremonies and Announcement of Winners</Paragraph></DataTable.Cell>
						<DataTable.Cell><Paragraph>Ballroom</Paragraph></DataTable.Cell>
					</DataTable.Row>
				</DataTable>
			</Surface>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
    surface: {
        margin: Dimensions.get('window').width < 500 ? 5 : 20
    }
})

SocialScreen.navigationOptions = {};
