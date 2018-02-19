import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class FeedCell extends Component {
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this._onPress}>
				<Text style={styles.text}>{this.props.item.key}</Text>
			</TouchableOpacity>
		);
	}

	_onPress = () => this.props.onPress();
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 55,
		justifyContent: 'center',
		paddingHorizontal: 15,
	},
	text: { fontWeight: 'bold' },
});

export default FeedCell;
