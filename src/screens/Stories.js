import React, { Component } from 'react';
import { FlatList } from 'react-native';
import pluralize from 'pluralize';
import { api } from '../config';
import { ScreenNames } from '../screens';
import StoryCell from '../components/StoryCell';

class Feed extends Component {
	state = { storyIDs: [] };

	componentDidMount() {
		this._setupFeedListener();
	}

	componentWillUnmount() {
		this._teardownFeedListener();
	}

	render() {
		const { storyIDs } = this.state;
		return (
			<FlatList
				data={storyIDs}
				keyExtractor={this._key}
				renderItem={this._renderItem}
			/>
		);
	}

	_setupFeedListener() {
		const { endpoint } = this.props.feed;
		api
			.child(endpoint)
			.limitToFirst(100)
			.on('value', snapshot => {
				const storyIDs = snapshot.val();
				this.setState({ storyIDs });
			});
	}

	_teardownFeedListener() {
		const { endpoint } = this.props.feed;
		api.child(endpoint).off();
	}

	_key = item => String(item);

	_renderItem = ({ item }) => (
		<StoryCell
			itemID={item}
			onPress={this._handlePress}
			onPressComments={this._handlePressComments}
		/>
	);

	_handlePress = story => {
		const { navigator } = this.props;
		if (story.url) {
			navigator.push({ screen: ScreenNames.WebBrowser, passProps: { story } });
		} else {
			this._handlePressComments(story);
		}
	};

	_handlePressComments = story => {
		const { navigator } = this.props;
		navigator.push({
			screen: ScreenNames.Comments,
			title: pluralize('Comment', story.descendants || 0, true),
			passProps: { story },
		});
	};
}

export default Feed;
