import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import CommentCell from '../components/CommentCell';
import StoryCell from '../components/StoryCell';

class Comments extends Component {
	state = { rootComments: [] };

	static navigationOptions = ({ navigation }) => ({
		title: `${
			navigation.state.params.descendants
				? navigation.state.params.descendants
				: 0
		} ${navigation.state.params.descendants === 1 ? 'Comment' : 'Comments'}`,
	});

	render() {
		const story = this.props.navigation.state.params;
		return (
			<FlatList
				data={story.kids}
				keyExtractor={item => String(item)}
				ListHeaderComponent={
					<StoryCell
						itemID={story.id}
						hideCommentBubble={true}
						detailMode={true}
						onPress={this._handlePress}
					/>
				}
				renderItem={({ item }) => <CommentCell itemID={item} />}
			/>
		);
	}

	_handlePress = story => {
		// FIXME: plx
		//WebBrowser.openBrowserAsync(story.url);
	};
}

export default Comments;
