import React, { Component } from 'react';
import { FlatList } from 'react-native';
import pluralize from 'pluralize';
import CommentCell from '../components/CommentCell';
import StoryCell from '../components/StoryCell';
import { FooterSpacer } from '../components/FooterSpacer';

class Comments extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: pluralize('Comment', navigation.state.params.descendants || 0, true),
	});

	render() {
		const story = this.props.navigation.state.params;
		return (
			<FlatList
				data={story.kids}
				keyExtractor={this._key}
				ListHeaderComponent={this._header(story)}
				ListFooterComponent={FooterSpacer}
				renderItem={this._renderItem}
			/>
		);
	}

	_header = story => (
		<StoryCell
			itemID={story.id}
			hideCommentBubble
			detailMode
			onPress={this._handlePress}
		/>
	);

	_key = item => String(item);

	_renderItem = ({ item }) => <CommentCell itemID={item} />;

	_handlePress = story =>
		this.props.navigation.navigate('WebBrowser', { story });
}

export default Comments;
