import React, { useState } from 'react';
import { TouchableOpacity, View, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const SIZE = 80;

const ProfileButton = ({ onPress }) => {
	const [focused, setFocused] = useState(false);

	const onClick = () => {
		onPress();
		setFocused(!focused);
	};
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View
				style={{
					position: 'absolute',
                    zIndex: 3,
                    elevation: 3,
					top: -SIZE / 2,
					shadowColor: 'white',
					shadowRadius: 10,
					borderRadius: SIZE / 2,
					backgroundColor: '#48A2F8'
				}}>
				<TouchableOpacity
					onPress={onPress}
					activeOpacity={1}
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						width: SIZE,
						height: SIZE
					}}>
					<Ionicons
						name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
						size={SIZE / 1.5}
						color={focused ? 'green' : 'red'}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default ProfileButton;
