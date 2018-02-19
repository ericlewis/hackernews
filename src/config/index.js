import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
	databaseURL: 'https://hacker-news.firebaseio.com/',
};

firebase.initializeApp(firebaseConfig);
