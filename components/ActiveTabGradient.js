import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';
import { withTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	svg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const ActiveTabGradient = props => {
	const { colors } = props.theme;

	return (
		<Svg styles={styles.svg}>
			<Defs>
				<RadialGradient
					id='grad'
					cx='150'
					cy='75'
					rx='85'
					ry='55'
					fx='150'
					fy='75'
					gradientUnits='userSpaceOnUse'>
					<Stop offset='0' stopColor={colors.primary} stopOpacity='1' />
					<Stop offset='1' stopColor='transparent' stopOpacity='1' />
				</RadialGradient>
			</Defs>
			<Ellipse cx='150' cy='75' rx='85' ry='55' fill='url(#grad)' />
		</Svg>
	);
};

export default withTheme(ActiveTabGradient);
