import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebBrowser extends Component {
	render() {
		const { url, story } = this.props.navigation.state.params;
		return <WebView source={{ uri: url || story.url }} />;
	}
}
