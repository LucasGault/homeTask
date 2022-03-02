import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc
  // collection,
  // addDoc
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendEmailVerification
} from "firebase/auth";

const store = createStore({
  state: {
    users: [],
    tasks: [],
    userProfile: localStorage.getItem("userProfile")
  },
  mutations: {
    createUser(state, user) {
      state.users.push(user);
      // state.users = []
    },
    createTask(state, task) {
      state.tasks.push(task);
      // state.users = []
    },
    setUserProfile(state, user) {
      state.userProfile = user;
      localStorage.setItem("userProfile", JSON.stringify(user));
    }
  },
  actions: {
    async fetchUserProfile({ commit }, user) {
      const docRef = doc(getFirestore(), "users", user.uid);
      const userProfile = await getDoc(docRef);
      console.log(userProfile.data());
      // const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit("setUserProfile", userProfile.data());
      // if (router.currentRoute.path === "/merch/login") {
      router.push({ name: "Home" });
      // }
    },
    async login({ dispatch, commit }, form) {
      // sign user in
      var user;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then(userCredential => {
          // Signed in
          user = userCredential.user;
          dispatch("fetchUserProfile", user);
          console.log("user", user);
          // ...
        })
        .catch(error => {
          commit("setLogError", error.code);
          return error.code;
        });
    },
    async signup({ dispatch /*, commit*/ }, form) {
      // sign user up
      var user;
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(userCredential => {
          // Signed in
          user = userCredential.user;
          // sendEmailVerification(auth.currentUser);
          setDoc(doc(getFirestore(), "users", user.uid), {
            nom: form.nom,
            prenom: form.prenom,
            email: form.email
          });

          dispatch("fetchUserProfile", user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });

      // await getAuth()
      //   .createUserWithEmailAndPassword(form.email, form.password)
      //   .then(async userCredential => {
      //     // Signed in
      //     user = userCredential.user;
      //     const actionCodeSettings = {
      //       url: `http://localhost:8080/`
      //     };
      //   })
      //   .catch(error => {
      //     commit("setLogError", error.code);
      //     return error.code;
      //   });

      // fetch user profile and set in state
      // dispatch('fetchUserProfile', user)
    },
    async logout({ commit }) {
      await getAuth().signOut();
      commit("setUserProfile", {});
    }
  },
  plugins: [createPersistedState()]
});


export default store