import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Searchbar, withTheme } from 'react-native-paper';
import { ApplicationData } from '../constants';
import { SelectedItem } from '../components';

const Select = props => {
	const { colors } = props.theme;
	const [searchText, setSearchText] = useState('');
	const [data, setData] = useState([]);

	useEffect(() => {
		if (data && data.length === 0) {
			setData(ApplicationData[props.type]);
		}
	}, [data]);

	const removeItem = val => {
		if (props.multiple) {
			let newItems = props.selected;
			for (let i = 0; i < newItems.length; i++) {
				if (newItems[i] === val) {
					newItems.splice(i, 1);
					break;
				}
			}
			props.setSelected(newItems);
		}
		props.setSelected('');
	};

	const renderSelectedItems = () => {
		if (props.multiple) {
			return (
				<View style={styles.selectedItemsContainer}>
					{props.selected.map(item => (
						<SelectedItem item={item} removeItem={removeItem} />
					))}
				</View>
			);
		}
		return (
			<View style={styles.selectedItemsContainer}>
				<SelectedItem item={props.selected} removeItem={removeItem} />
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Searchbar
				style={StyleSheet.flatten([
					{
						backgroundColor: colors.background
					},
					styles.searchbar
				])}
				value={searchText}
				onChangeText={setSearchText}
				inputStyle={StyleSheet.flatten([
					styles.searchInput,
					{
						outline: 'none'
					}
				])}
				placeholder={props.placeholder}
				iconColor='#8B9AAD'
			/>
			{renderSelectedItems()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10
	},
	searchbar: {
		elevation: 0,
		borderWidth: 1,
		borderColor: '#8B9AAD',
		marginBottom: 10,
		minHeight: 64
	},
	searchInput: {
		borderWidth: 0,
		fontSize: 16
	},
	selectedItemsContainer: {
		flexDirection: 'row'
	}
});

export default withTheme(Select);
