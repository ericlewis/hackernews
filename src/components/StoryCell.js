import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import vagueTime from 'vague-time';
import parse from 'url-parse';
import HTMLView from 'react-native-htmlview';
import { ScreenNames } from '../screens';
import { api } from '../config';

class StoryCell extends Component {
	state = { story: undefined, read: false };

	componentDidMount() {
		this._setupListener();
	}

	componentWillUnmount() {
		this._teardownListener();
	}

	render() {
		const { story } = this.state;

		if (story) {
			const { title, url, score, time, by, text } = story;
			const { read } = this.state;
			const { detailMode } = this.props;
			const { hideCommentBubble } = this.props;

			return (
				<View style={styles.container}>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.storyContainer}
						onPress={this._pressedStory}>
						<View
							style={read && !hideCommentBubble ? styles.read : styles.unread}>
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
								detailMode && (
									<HTMLView
										style={styles.html}
										value={text}
										onLinkPress={this._pressedURL}
									/>
								)}
						</View>
					</TouchableOpacity>
					{this._commentBubble(story)}
				</View>
			);
		}

		return null;
	}

	_setupListener = () => {
		const { itemID } = this.props;
		api.child(`item/${itemID}`).on('value', snapshot => {
			const story = snapshot.val();
			this.setState({ story });
		});
	};

	_teardownListener = () => {
		const { itemID } = this.props;
		api.child(`item/${itemID}`).off();
	};

	_commentBubble = story => {
		const { hideCommentBubble } = this.props;
		const { type } = story;

		if (hideCommentBubble) {
			return null;
		} else if (type !== 'story' || type !== 'poll') {
			return (
				<TouchableOpacity onPress={this._pressedComments}>
					<View style={styles.commentBubble}>
						<Text style={styles.commentCount}>{story.descendants}</Text>
					</View>
				</TouchableOpacity>
			);
		}

		return null;
	};

	_pressedStory = () => {
		this.setState({ read: true }, () => this.props.onPress(this.state.story));
	};

	_pressedComments = () => {
		this.setState({ read: true }, () =>
			this.props.onPressComments(this.state.story),
		);
	};

	_pressedURL = url => {
		this.props.navigator.push({
			screen: ScreenNames.WebBrowser,
			passProps: { url },
		});
	};

	_timeAgo = time =>
		vagueTime.get({
			to: time * 1000,
		});
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
		backgroundColor: '#EEEEEE',
	},
	read: {
		opacity: 0.3,
	},
	unread: {
		opacity: 1.0,
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
