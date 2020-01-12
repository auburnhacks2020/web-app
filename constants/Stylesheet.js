const heading = "roboto-mono-bold";
const text = "montserrat";
const robotoMono = "roboto-mono";

export default {
	container: {
		flex: 1,
		backgroundColor: '#03244d'
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		width: '90%',
		backgroundColor: '#000',
		padding: 20,
		alignSelf: 'center',
		borderRadius: 5,
		marginBottom: 50
	},
	par: {
		fontFamily: text,
		fontSize: 17,
		paddingTop: 10,
		fontWeight: '400'
	},
	modalpar: {
		fontWeight: '300',
		fontSize: 17,
		color: '#ffffff'
	},
	btn: {
		backgroundColor: '#03244d'
	},
	btn2: {
	backgroundColor: '#000',
	margin: 10
	},
	cardbtn: {
		backgroundColor: '#03244d',
		alignSelf: 'flex-end'
	},
	cardAction: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 10
	},
	cardContent: {
		paddingTop: 10
	},
	links: {
		color: '#f68026'
	},
	centerText: {
		textAlign: 'center'
	},
	robotoMono,
	heading,
	text
};
