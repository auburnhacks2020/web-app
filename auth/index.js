import { AsyncStorage } from 'react-native';

export const onSignIn = async token => {
	try {
		await AsyncStorage.setItem('currentUserToken', token);
	} catch (err) {
		console.log(err);
	}
};

export const onSignOut = async () => {
	try {
		await AsyncStorage.removeItem('currentUserToken');
	} catch (err) {
		console.log(err);
	}
};

export const isSignedIn = () => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('currentUserToken')
			.then(res => {
				if (res !== null) {
					resolve(true);
				} else {
					resolve(false);
				}
			})
			.catch(err => {
				console.log(err);
				reject(err);
			});
	});
};

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('currentUserToken');
		return token;
	} catch (err) {
		console.log(error)
	}
};
