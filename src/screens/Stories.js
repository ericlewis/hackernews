import React, { Component } from 'react';
import { FlatList, Linking } from 'react-native';
import pluralize from 'pluralize';
import { api } from '../config';
import { ScreenNames } from '../screens';
import StoryCell from '../components/StoryCell';

class Feed extends Component {
	state = {
		storyIDs: [],
		postURL: null,
	};

	static navigatorButtons = {
		rightButtons: [
			{
				title: 'Post',
				id: 'post',
			},
		],
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = event => {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'post') {
				this._pushPostScreen();
			}
		}
	};

	componentDidMount() {
		Linking.getInitialURL().then(url => {
			if (url.includes('hackernews://post') && this.state.postURL !== url) {
				this._pushPostScreen(url);
			}
		});

		Linking.addEventListener('url', this._handleDeeplink);
		this._setupFeedListener();
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleDeeplink);
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

	_handleDeeplink = event => {
		const { url } = event;
		if (url.includes('hackernews://post')) {
			this._pushPostScreen(url);
		}
	};

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

	_pushPostScreen = url => {
		this.setState(
			{ postURL: url },
			this.props.navigator.push({
				screen: ScreenNames.Post,
				title: 'Submit Article',
				passProps: {
					url: this._getParameterByName('url', url),
					title: this._getParameterByName('title', url),
				},
			}),
		);
	};

	_getParameterByName = (name, url) => {
		const strippedName = name.replace(/[[\]]/g, '\\$&');
		const regex = new RegExp(`[?&]${strippedName}(=([^&#]*)|&|#|$)`);
		const results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	};
}

export default Feed;
