import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtbW0PwRcdLzTYZPnNmzTbp3BiIxeVgUo",
  authDomain: "rex-bills.firebaseapp.com",
  databaseURL: "https://rex-bills-default-rtdb.firebaseio.com",
  projectId: "rex-bills",
  storageBucket: "rex-bills.appspot.com",
  messagingSenderId: "890952963286",
  appId: "1:890952963286:web:3e0c8cb324fb8b0aa0e577",
  measurementId: "G-VDDRT31J37",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
