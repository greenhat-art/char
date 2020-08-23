import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBQAtkJLl2wSmjKPcbqolCxhRzCvwMJIW0",
    authDomain: "charityzan.firebaseapp.com",
    databaseURL: "https://charityzan.firebaseio.com",
    projectId: "charityzan",
    storageBucket: "charityzan.appspot.com",
    messagingSenderId: "486935401183",
    appId: "1:486935401183:web:01e117a15870e4529a4f6a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
