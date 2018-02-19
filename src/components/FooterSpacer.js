import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	footer: {
		height: 30,
	},
});

export const FooterSpacer = () => <View style={styles.footer} />;
