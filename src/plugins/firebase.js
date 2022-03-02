// import { createApp } from "vue";
import * as firebase from "firebase/app";

// import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";

// import Vue from "vue";


// const firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
// console.log();
// const db = getFirestore();
// const app = createApp({});
// app.config.globalProperties.$db = db

// Vue.prototype.$db = db;
