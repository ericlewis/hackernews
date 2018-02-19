import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import config from '../../config';
import * as firebase from 'firebase';

import StoryCell from '../../components/StoryCell';

class Feed extends Component {
	state = { storyIDs: [] };

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.key,
	});

	componentDidMount() {
		const endpoint = this.props.navigation.state.params.endpoint;
		this._setupFeedListener(endpoint);
	}

	componentWillUnmount() {
		const endpoint = this.props.navigation.state.params.endpoint;
		this._teardownFeedListener(endpoint);
	}

	render() {
		const { storyIDs } = this.state;

		return (
			<FlatList
				data={storyIDs}
				keyExtractor={item => String(item)}
				renderItem={({ item }) => (
					<StoryCell
						itemID={item}
						onPress={this._handlePress}
						onPressComments={this._handlePressComments}
					/>
				)}
			/>
		);
	}

	_setupFeedListener(endpoint) {
		firebase
			.database()
			.ref('v0/' + endpoint)
			.limitToFirst(100)
			.on('value', snapshot => {
				const storyIDs = snapshot.val();
				this.setState({ storyIDs });
			});
	}

	_teardownFeedListener(endpoint) {
		firebase
			.database()
			.ref('v0/' + endpoint)
			.off();
	}

	_handlePress = story => {
		if (story.url) {
			//WebBrowser.openBrowserAsync(story.url);
		} else {
			this.props.navigation.navigate('Comments', story);
		}

		// FIXME: replace this code
		// SecureStore.setItemAsync(String(story.id), String(story.id)).catch(err =>
		// 	console.warn(err),
		// );
	};

	_handlePressComments = story => {
		this.props.navigation.navigate('Comments', story);
		// FIXME: replace this code
		// SecureStore.setItemAsync(String(story.id), String(story.id)).catch(err =>
		// 	console.warn(err),
		// );
	};
}

export default Feed;
