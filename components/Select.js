import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import {
	Text,
	TextInput,
	Searchbar,
	withTheme,
	Portal,
	Button,
	RadioButton,
	Modal,
	IconButton
} from 'react-native-paper';
import { ApplicationData } from '../constants';
import { SelectedItem } from '../components';

const Select = props => {
	const { colors } = props.theme;
	const [searchText, setSearchText] = useState('');
	const [data, setData] = useState([]);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (ApplicationData[props.type]) {
			setData(ApplicationData[props.type]);
		}
	}, [props.type]);

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
		} else {
			props.setSelected('');
		}
	};

	const isSelected = item => {
		for (let i = 0; i < props.selected.length; i++) {
			if (props.selected[i] === item) {
				return true;
			}
		}
		return false;
	};

	const renderSelectedItems = () => {
		if (props.multiple) {
			return (
				<View style={styles.selectedItemsContainer}>
					{props.selected.map((item, idx) => (
						<SelectedItem item={item} key={idx} removeItem={removeItem} />
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

	let modal = null;
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
						// outline: 'none'
					}
				])}
				placeholder={props.placeholder}
				iconColor='#8B9AAD'
				onFocus={() => setFocused(true)}
			/>
			{renderSelectedItems()}
			{focused ? (
				<Portal>
					<Modal
						ref={ref => {
							modal = ref;
						}}
						contentContainerStyle={StyleSheet.flatten([
							styles.modal,
							{
								backgroundColor: colors.surface
							}
						])}
						visible={focused}
						onDismiss={() => setFocused(false)}>
						{props.multiple ? (
							<ScrollView
								nestedScrollEnable
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.modalContent}>
								{data.map((item, idx) => (
									<View style={styles.item} key={idx}>
										<RadioButton
											onPress={() => {
												let newItems = props.selected;
												newItems.push(item);
												props.setSelected(newItems);
											}}
											color={colors.primary}
											value={item}
											status={isSelected(item) ? 'checked' : 'unchecked'}
										/>
										<Text>{item}</Text>
									</View>
								))}
							</ScrollView>
						) : (
							<ScrollView
								nestedScrollEnabled
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.modalContent}>
								{data.map((item, idx) => (
									<View style={styles.item} key={idx}>
										<RadioButton
											onPress={() => props.setSelected(item)}
											color={colors.primary}
											value={item}
											status={props.selected === item ? 'checked' : 'unchecked'}
										/>
										<Text>{item}</Text>
									</View>
								))}
							</ScrollView>
						)}
						<View style={styles.customInput}>
							<TextInput
								style={StyleSheet.flatten([
									styles.searchInput,
									{
										backgroundColor: colors.surface,
										outline: 'none'
									}
								])}
								mode='outlined'
								value={searchText}
								onChangeText={setSearchText}
								placeholder='Other...'
								placeholderTextColor={colors.placeholder}
							/>
							<IconButton
								icon='plus-circle'
								onPress={() => {
									if (props.multiple) {
										let newItems = props.selected;
										newItems.push(searchText);
										props.setSelected(newItems);
									} else {
										props.setSelected(searchText);
									}
									setSearchText('');
								}}
							/>
						</View>
						<Button mode='contained' onPress={() => modal.hideModal()}>
							done
						</Button>
					</Modal>
				</Portal>
			) : null}
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
		flex: 1,
		borderWidth: 0,
		fontSize: 16
	},
	selectedItemsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 10
	},
	modal: {
		width: '100%',
		justifyContent: 'center',
		maxWidth: 450,
		maxHeight: 500,
		margin: 10,
		padding: 10,
		alignSelf: 'center',
		borderRadius: 10
	},
	modalContent: {},
	item: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	customInput: { flexDirection: 'row', margin: 5, alignItems: 'center' }
});

Select.propTypes = {};

export default withTheme(Select);
