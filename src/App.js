import React from 'react';
import { FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Feed from './screens/Feed';
import Comments from './screens/Comments';
import WebBrowser from './screens/WebBrowser';
import FeedCell from './components/FeedCell';

const feeds = [
	{ key: 'Top', endpoint: 'topstories' },
	{ key: 'New', endpoint: 'newstories' },
	{ key: 'Best', endpoint: 'beststories' },
	{ key: 'Ask', endpoint: 'askstories' },
	{ key: 'Show', endpoint: 'showstories' },
	{ key: 'Jobs', endpoint: 'jobstories' },
];

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Feeds',
	};

	componentWillMount() {
		this.props.navigation.navigate('Feed', feeds[0]);
	}

	render() {
		return (
			<FlatList
				data={feeds}
				renderItem={({ item }) => (
					<FeedCell
						item={item}
						onPress={() => this.props.navigation.navigate('Feed', item)}
					/>
				)}
			/>
		);
	}
}

export default StackNavigator({
	Home: {
		screen: HomeScreen,
	},
	Feed: {
		screen: Feed,
	},
	Comments: {
		screen: Comments,
	},
	WebBrowser: {
		screen: WebBrowser,
	},
});
