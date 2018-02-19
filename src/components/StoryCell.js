import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import vagueTime from 'vague-time';
import parse from 'url-parse';
import HTMLView from 'react-native-htmlview';

class StoryCell extends Component {
	state = { story: undefined, read: false };

	componentDidMount() {
		const { itemID } = this.props;
		this._setupListener(itemID);
	}

	componentWillUnmount() {
		const { itemID } = this.props;
		this._teardownListener(itemID);
	}

	render() {
		const { story } = this.state;

		if (story) {
			const { title, url, score, time, by, text } = story;
			const { read } = this.state;

			return (
				<View style={styles.container}>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.storyContainer}
						onPress={this._pressedStory}>
						<View
							style={{
								opacity: read && !this.props.hideCommentBubble ? 0.3 : 1.0,
							}}>
							<Text style={styles.titleContainer}>
								{title}
								{url && (
									<Text style={styles.url}> ({parse(url).hostname})</Text>
								)}
							</Text>
							<Text style={styles.info}>
								{score} points by {by} {this._timeAgo(time)}
							</Text>
							{text &&
								this.props.detailMode && (
									<HTMLView
										style={styles.html}
										value={text}
										onLinkPress={this._pressedURL}
									/>
								)}
						</View>
					</TouchableOpacity>
					{this.props.hideCommentBubble ? null : story.type === 'story' ||
					story.type === 'poll' ? (
						<TouchableOpacity onPress={this._pressedComments}>
							<View style={styles.commentBubble}>
								<Text style={styles.commentCount}>{story.descendants}</Text>
							</View>
						</TouchableOpacity>
					) : null}
				</View>
			);
		}

		//TODO:
		// empty view prob should go here.
		return null;
	}

	_setupListener(itemID) {
		firebase
			.database()
			.ref('v0/item/' + itemID)
			.on('value', snapshot => {
				const story = snapshot.val();
				this.setState({ story });
				// FIXME: replace this code
				// SecureStore.getItemAsync(String(this.props.itemID)).then(read => {
				// 	this.setState({ story: story, read: read !== undefined });
				// });
			});
	}

	_teardownListener(itemID) {
		firebase
			.database()
			.ref('v0/item/' + itemID)
			.off();
	}

	_pressedStory = () => {
		const { story } = this.state;
		this.setState({ read: true });
		this.props.onPress(story);
	};

	_pressedComments = () => {
		const { story } = this.state;
		this.setState({ read: true });
		this.props.onPressComments(story);
	};

	_pressedURL = url => {
		// FIXME: plez
		//WebBrowser.openBrowserAsync(url);
	};

	_timeAgo(time) {
		return vagueTime.get({
			to: time * 1000,
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 17,
		borderBottomColor: 'white',
		borderBottomWidth: 1,
	},
	storyContainer: {
		flex: 1,
	},
	titleContainer: { fontWeight: 'bold', fontSize: 16 },
	url: {
		color: 'grey',
		fontWeight: 'normal',
		fontSize: 13,
	},
	info: { marginTop: 5, color: 'grey', fontSize: 13 },
	html: { marginTop: 10 },
	commentBubble: {
		marginLeft: 10,
		padding: 8,
		backgroundColor: 'white',
		borderRadius: 8,
		minWidth: 35,
		alignItems: 'center',
	},
	commentCount: { fontWeight: 'bold' },
});

export default StoryCell;
