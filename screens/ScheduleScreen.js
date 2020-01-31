import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DataTable, Surface } from 'react-native-paper';
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
						<DataTable.Title>Dessert</DataTable.Title>
						<DataTable.Title numeric>Calories</DataTable.Title>
						<DataTable.Title numeric>Fat</DataTable.Title>
					</DataTable.Header>

					<DataTable.Row>
						<DataTable.Cell>Frozen yogurt</DataTable.Cell>
						<DataTable.Cell numeric>159</DataTable.Cell>
						<DataTable.Cell numeric>6.0</DataTable.Cell>
					</DataTable.Row>

					<DataTable.Row>
						<DataTable.Cell>Ice cream sandwich</DataTable.Cell>
						<DataTable.Cell numeric>237</DataTable.Cell>
						<DataTable.Cell numeric>8.0</DataTable.Cell>
					</DataTable.Row>

					<DataTable.Pagination
						page={1}
						numberOfPages={3}
						onPageChange={page => {
							console.log(page);
						}}
						label='1-2 of 6'
					/>
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
