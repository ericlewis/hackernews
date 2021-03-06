import { Navigation } from 'react-native-navigation';
import Feeds from './Feeds';
import Stories from './Stories';
import Comments from './Comments';
import WebBrowser from './WebBrowser';

export const ScreenNames = {
	Feeds: 'Feeds',
	Stories: 'Stories',
	Comments: 'Comments',
	WebBrowser: 'WebBrowser',
};

const screens = [
	{ screen: ScreenNames.Feeds, component: Feeds },
	{ screen: ScreenNames.Stories, component: Stories },
	{ screen: ScreenNames.Comments, component: Comments },
	{ screen: ScreenNames.WebBrowser, component: WebBrowser },
];

export function registerScreens() {
	screens.forEach(({ screen, component }) => {
		Navigation.registerComponent(screen, () => component);
	});
}
