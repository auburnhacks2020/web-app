import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withTheme, IconButton } from 'react-native-paper';

const SelectedItem = props => {
	const { colors } = props.theme;

	return props.item !== '' && props.item !== 0 ? (
		<View
			style={StyleSheet.flatten([
				styles.container,
				{ borderColor: colors.primary }
			])}>
			<Text>{props.item}</Text>
			<IconButton
				size=''
				icon='close'
				onPress={() => props.removeItem(props.item)}
			/>
		</View>
	) : null;
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 100,
		borderWidth: 1
	}
});

export default withTheme(SelectedItem);
