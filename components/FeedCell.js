import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class FeedCell extends Component {
	render() {
		return (
			<TouchableOpacity
				style={{
					flex: 1,
					height: 55,
					justifyContent: 'center',
					paddingHorizontal: 15,
				}}
				onPress={() => this.props.onPress()}>
				<Text style={{ fontWeight: 'bold' }}>{this.props.item.key}</Text>
			</TouchableOpacity>
		);
	}
}

export default FeedCell;
