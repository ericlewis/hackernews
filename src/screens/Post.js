import React from 'react';
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	Platform,
	Dimensions,
	StyleSheet,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { title: props.title, url: props.url };
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<TextInput
						placeholder="Title"
						onChangeText={text => this.setState({ title: text })}
						value={this.state.title}
						style={styles.textInput}
					/>
					<TextInput
						placeholder="URL"
						onChangeText={text => this.setState({ url: text })}
						value={this.state.url}
						style={styles.textInput}
						keyboardType="url"
					/>
				</View>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>POST!</Text>
				</TouchableOpacity>
				<KeyboardSpacer topSpacing={this._isX() ? -35 : 0} />
			</SafeAreaView>
		);
	}

	_isX = () => {
		const { width: screenWidth, height: screenHeight } = Dimensions.get(
			'window',
		);

		return (
			Platform.OS === 'ios' &&
			!Platform.isPad &&
			!Platform.isTVOS &&
			(screenWidth === 812 || screenHeight === 812)
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textInput: {
		margin: 15,
	},
	button: {
		height: 55,
		backgroundColor: 'green',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: { color: 'white' },
});

export default Post;
