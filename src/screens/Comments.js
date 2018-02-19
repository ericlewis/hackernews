import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ScreenNames } from '../screens';
import CommentCell from '../components/CommentCell';
import StoryCell from '../components/StoryCell';
import { FooterSpacer } from '../components/FooterSpacer';

class Comments extends Component {
	render() {
		const { story } = this.props;
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

	_renderItem = ({ item }) => (
		<CommentCell itemID={item} navigator={this.props.navigator} />
	);

	_handlePress = story =>
		this.props.navigator.push({
			screen: ScreenNames.WebBrowser,
			passProps: { story },
		});
}

export default Comments;
