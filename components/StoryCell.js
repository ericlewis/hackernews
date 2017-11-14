import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import vagueTime from 'vague-time';
import parse from 'url-parse';
import { SecureStore, WebBrowser } from 'expo';
import HTMLView from 'react-native-htmlview';

class StoryCell extends Component {
	state = { story: undefined, read: false };

	componentDidMount() {
		this._setupListener(this.props.itemID);
	}

	componentWillUnmount() {
		this._teardownListener(this.props.itemID);
	}

	render() {
		const story = this.state.story;

		if (story) {
			const timeAgo = vagueTime.get({
				to: story.time * 1000,
			});

			return (
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 15,
						paddingVertical: 17,
						borderBottomColor: 'white',
						borderBottomWidth: 1,
					}}>
					<TouchableOpacity
						activeOpacity={0.95}
						style={{ flex: 1 }}
						onPress={() => {
							this.setState({ read: true });
							this.props.onPress(story);
						}}>
						<View
							style={{
								opacity:
									this.state.read && !this.props.hideCommentBubble ? 0.3 : 1.0,
							}}>
							<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
								{story.title}
								{story.url ? (
									<Text
										style={{
											color: 'grey',
											fontWeight: 'normal',
											fontSize: 13,
										}}>
										{' '}
										({parse(story.url).hostname})
									</Text>
								) : null}
							</Text>
							<Text style={{ marginTop: 5, color: 'grey', fontSize: 13 }}>
								{story.score} points by {story.by} {timeAgo}
							</Text>
							{story.text && this.props.detailMode ? (
								<HTMLView
									style={{ marginTop: 10 }}
									value={story.text}
									onLinkPress={this._handleURL}
								/>
							) : null}
						</View>
					</TouchableOpacity>
					{this.props.hideCommentBubble ? null : story.type === 'story' ||
					story.type === 'poll' ? (
						<TouchableOpacity
							onPress={() => {
								this.setState({ read: true });
								this.props.onPressComments(story);
							}}>
							<View
								style={{
									marginLeft: 10,
									padding: 8,
									backgroundColor: 'white',
									borderRadius: 8,
									minWidth: 35,
									alignItems: 'center',
								}}>
								<Text style={{ fontWeight: 'bold' }}>{story.descendants}</Text>
							</View>
						</TouchableOpacity>
					) : null}
				</View>
			);
		}

		return null;
	}

	_setupListener(itemID) {
		firebase
			.database()
			.ref('v0/item/' + itemID)
			.on('value', snapshot => {
				const story = snapshot.val();
				SecureStore.getItemAsync(String(this.props.itemID)).then(read => {
					this.setState({ story: story, read: read !== undefined });
				});
			});
	}

	_teardownListener(itemID) {
		firebase
			.database()
			.ref('v0/item/' + itemID)
			.off();
	}

	_handleURL(url) {
		WebBrowser.openBrowserAsync(url);
	}
}

export default StoryCell;
