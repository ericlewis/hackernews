import React from 'react';
import { FlatList, Text } from 'react-native';

import { StackNavigator } from 'react-navigation';
import Feed from './screens/Feed';
import Comments from './screens/Comments';

import FeedCell from './components/FeedCell';

class HomeScreen extends React.Component {
	feeds = [
		{ key: 'Top', endpoint: 'topstories' },
		{ key: 'New', endpoint: 'newstories' },
		{ key: 'Best', endpoint: 'beststories' },
		{ key: 'Ask', endpoint: 'askstories' },
		{ key: 'Show', endpoint: 'showstories' },
		{ key: 'Jobs', endpoint: 'jobstories' },
	];

	static navigationOptions = {
		title: 'Feeds',
	};

	componentWillMount() {
		this.props.navigation.navigate('Feed', this.feeds[0]);
	}

	render() {
		return (
			<FlatList
				data={this.feeds}
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
});
