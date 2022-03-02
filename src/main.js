import { createApp } from "vue";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

import App from "./App.vue";
import "./plugins/firebase";
import "./assets/css/tailwind.css";
import "./assets/css/style.css";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";


const db = getFirestore();
const auth = getAuth();
// const app = createApp({});
// app.config.globalProperties.$db = db
const app = createApp(App)
.use(VCalendar, {})
.use(store)
.use(router)
app.config.globalProperties.$db = db
app.config.globalProperties.$auth = auth
app.mount("#app");


// app.config.globalProperties.$http = () => {
//   console.log('test');
// }
