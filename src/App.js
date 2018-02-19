import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

export function run() {
	registerScreens();

	Navigation.startSingleScreenApp({
		screen: {
			screen: 'Feeds',
			title: 'Feeds',
		},
	});
}
