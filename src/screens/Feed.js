import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { api } from '../config';
import StoryCell from '../components/StoryCell';

class Feed extends Component {
	state = { storyIDs: [] };

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.key,
	});

	componentDidMount() {
		const { endpoint } = this.props.navigation.state.params;
		this._setupFeedListener(endpoint);
	}

	componentWillUnmount() {
		const { endpoint } = this.props.navigation.state.params;
		this._teardownFeedListener(endpoint);
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

	_setupFeedListener(endpoint) {
		api
			.child(endpoint)
			.limitToFirst(100)
			.on('value', snapshot => {
				const storyIDs = snapshot.val();
				this.setState({ storyIDs });
			});
	}

	_teardownFeedListener = endpoint => {
		api.child(endpoint).off();
	};

	_key = item => String(item);

	_renderItem = ({ item }) => (
		<StoryCell
			itemID={item}
			onPress={this._handlePress}
			onPressComments={this._handlePressComments}
		/>
	);

	_handlePress = story => {
		const { navigation } = this.props;

		if (story.url) {
			navigation.navigate('WebBrowser', { story });
		} else {
			navigation.navigate('Comments', story);
		}
	};

	_handlePressComments = story => {
		const { navigation } = this.props;

		navigation.navigate('Comments', story);
	};
}

export default Feed;
