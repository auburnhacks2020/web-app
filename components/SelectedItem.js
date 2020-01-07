import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Text, IconButton } from 'react-native-paper';

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
				icon='close'
				onPress={() => props.removeItem(props.item)}
			/>
		</View>
	) : null;
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		borderWidth: 2,
		paddingLeft: 18,
		marginBottom: 10,
		marginRight: 10
	}
});

export default withTheme(SelectedItem);
