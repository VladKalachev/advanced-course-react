import firebase from "firebase";

export const appName = "advreact-ca735";
export const firebaseConfig = {
  apiKey: "AIzaSyCtmlr1JhVZMkihNPUn6pyhxpVOaryQMQA",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: "https://advreact-ca735.firebaseio.com",
  projectId: `${appName}`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "249321202423"
};

firebase.initializeApp(firebaseConfig);
