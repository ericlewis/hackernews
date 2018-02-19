import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';
import vagueTime from 'vague-time';
import HTMLView from 'react-native-htmlview';

class CommentCell extends Component {
	state = { comment: undefined, collapsed: false };

	componentDidMount() {
		this._setupListener(this.props.itemID);
	}

	componentWillUnmount() {
		this._teardownListener(this.props.itemID);
	}

	render() {
		const comment = this.state.comment;

		if (comment) {
			if (comment.deleted) {
				return null;
			}

			const timeAgo = vagueTime.get({
				to: comment.time * 1000,
			});

			return (
				<View
					style={{
						flex: 1,
						paddingHorizontal: 12,
						marginTop: 15,
						borderColor: 'gray',
						borderLeftWidth: 1,
					}}>
					<TouchableWithoutFeedback onPress={this._toggleCollapse}>
						{!this.state.collapsed ? (
							<View>
								<Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
									[‒] {comment.by}
									<Text style={{ fontWeight: 'normal' }}> {timeAgo}</Text>
								</Text>
								<HTMLView value={comment.text} onLinkPress={this._handleURL} />
								{comment.kids
									? comment.kids.map(comment => (
											<CommentCell key={comment} itemID={comment} />
										))
									: null}
							</View>
						) : (
							<View>
								<Text style={{ fontWeight: 'bold', opacity: 0.4 }}>
									[+] {comment.by}
									<Text style={{ fontWeight: 'normal' }}> {timeAgo}</Text>
								</Text>
							</View>
						)}
					</TouchableWithoutFeedback>
				</View>
			);
		}

		return null;
	}

	_toggleCollapse = () => {
		collapseState = !this.state.collapsed;

		// FIXME: change this code out with abstraction
		// if (collapseState === true) {
		// 	SecureStore.setItemAsync(
		// 		String(comment.id),
		// 		String(comment.id),
		// 	).catch(err => console.warn(err));
		// } else {
		// 	SecureStore.deleteItemAsync(String(comment.id)).catch(err =>
		// 		console.warn(err),
		// 	);
		// }
		this.setState({ collapsed: collapseState });
	};

	_handleURL = url => {
		// FIXME: plz
		//WebBrowser.openBrowserAsync(url);
	};

	_setupListener(itemID) {
		firebase
			.database()
			.ref('v0/item/' + itemID)
			.on('value', snapshot => {
				const comment = snapshot.val();
				// FIXME: replace this code
				/*SecureStore.getItemAsync(String(this.props.itemID)).then(collapsed => {
					this.setState({
						comment: comment,
						collapsed: collapsed !== undefined,
					});
				});*/
			});
	}

	_teardownListener(itemID) {
		firebase
			.database()
			.ref('v0/item/' + itemID)
			.off();
	}
}

export default CommentCell;
