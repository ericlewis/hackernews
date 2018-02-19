import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import vagueTime from 'vague-time';
import HTMLView from 'react-native-htmlview';
import { ScreenNames } from '../screens';
import { api } from '../config';

class CommentCell extends Component {
	state = { comment: undefined, collapsed: false };

	componentDidMount() {
		this._setupListener(this.props.itemID);
	}

	componentWillUnmount() {
		this._teardownListener(this.props.itemID);
	}

	render() {
		const { comment } = this.state;

		if (comment) {
			const { navigator } = this.props;

			if (comment.deleted) {
				return null;
			}

			const timeAgo = vagueTime.get({
				to: comment.time * 1000,
			});

			return (
				<View style={styles.container}>
					<TouchableWithoutFeedback onPress={this._toggleCollapse}>
						{!this.state.collapsed ? (
							<View>
								<Text style={styles.title}>
									[‒] {comment.by}
									<Text style={styles.timeAgo}> {timeAgo}</Text>
								</Text>
								<HTMLView value={comment.text} onLinkPress={this._handleURL} />
								{comment.kids &&
									comment.kids.map(comment => (
										<CommentCell
											key={comment}
											itemID={comment}
											navigator={navigator}
										/>
									))}
							</View>
						) : (
							<View>
								<Text style={[styles.title, styles.collapsed]}>
									[+] {comment.by}
									<Text style={styles.timeAgo}> {timeAgo}</Text>
								</Text>
							</View>
						)}
					</TouchableWithoutFeedback>
				</View>
			);
		}

		return null;
	}

	_setupListener = itemID => {
		api.child(`item/${itemID}`).on('value', snapshot => {
			const comment = snapshot.val();
			this.setState({ comment });
		});
	};

	_teardownListener = itemID => {
		api.child(`item/${itemID}`).off();
	};

	_toggleCollapse = () => {
		const { collapsed } = this.state;
		this.setState({ collapsed: !collapsed });
	};

	_handleURL = url => {
		this.props.navigator.push({
			screen: ScreenNames.WebBrowser,
			passProps: { url },
		});
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 12,
		marginTop: 15,
		borderColor: 'gray',
		borderLeftWidth: 1,
	},
	title: { fontWeight: 'bold', paddingBottom: 5 },
	timeAgo: { fontWeight: 'normal' },
	collapsed: { opacity: 0.4 },
});

export default CommentCell;
