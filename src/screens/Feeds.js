import React from 'react';
import { FlatList } from 'react-native';
import { ScreenNames } from '../screens';
import FeedCell from '../components/FeedCell';

const feeds = [
	{ key: 'Top', endpoint: 'topstories' },
	{ key: 'New', endpoint: 'newstories' },
	{ key: 'Best', endpoint: 'beststories' },
	{ key: 'Ask', endpoint: 'askstories' },
	{ key: 'Show', endpoint: 'showstories' },
	{ key: 'Jobs', endpoint: 'jobstories' },
];

export default class Feeds extends React.Component {
	componentWillMount() {
		this._pushStories(feeds[0]);
	}

	render() {
		return <FlatList data={feeds} renderItem={this._renderItem} />;
	}

	_renderItem = ({ item }) => (
		<FeedCell item={item} onPress={() => this._pushStories(item)} />
	);

	_pushStories = feed =>
		this.props.navigator.push({
			screen: ScreenNames.Stories,
			title: feed.key,
			passProps: { feed },
		});
}
