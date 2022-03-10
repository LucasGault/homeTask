import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router";
import {
  getFirestore,
  getDoc,
  getDocs,
  doc,
  setDoc,
  collection,
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
    planningTasks: [],
    attrs : [],
    tasksDone : [],
    task: "",
    groupName: "",
    color: "",
    userProfile: localStorage.getItem("userProfile")
  },
  mutations: {
    setUserProfile(state, user) {
      state.userProfile = user;
      localStorage.setItem("userProfile", JSON.stringify(user));
    },
     /**
     * Récupère la liste des taches de la collection taches de firestore
     * et la push dans tasks
     */
    async getTasks(state) {
      state.tasks = []
      const querySnapshot = await getDocs(collection(getFirestore(), 'tasks'))
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.uid = doc.id
        state.tasks.push(data)
      })
    },
    /**
     * Récupère la liste des taches de la collection group/${idGroup}/planningTasks du groupe
     * selectionné de firestore et la push dans planningTasks
     */
    async getPlanningTasks(state) {
      state.planningTasks = [];
      const querySnapshot = await getDocs(
        collection(getFirestore(), "group", router.currentRoute.value.params.uid, "planningTasks")
      );
      querySnapshot.forEach(async (doc) => {
        let data = doc.data();
        if (typeof data.name == "object") {
          const userRef = await getDoc(data.name);
          const userInfo = await userRef.data();
          data.uid = userRef.id;
          data.name = userInfo.name;
        }
        state.planningTasks.push(data);
        state.task = await state.planningTasks[0];
      });
    },
     /**
     * getUsersGroup récupère les users dans le groupe et set la bonne couleur
     */
    async getUsersGroup(state) {
      const auth = getAuth()
      state.users = [];
      const docRefGroup = doc(getFirestore(), "group", router.currentRoute.value.params.uid);
      const docSnapGroup = await getDoc(docRefGroup);
      if (docSnapGroup.exists()) {
        let data = docSnapGroup.data();
        state.groupName = data.name;
        data.users.forEach(async (user) => {
          if (user.uid.id == auth.currentUser.uid) {
            state.color = user.color;
          }
          let docSnapUser = await getDoc(user.uid);
          if (docSnapUser.exists()) {
            var dataUser = docSnapUser.data();
            dataUser.uid = docSnapUser.id;
            dataUser.color = user.color;
            dataUser.nbTaskDone = 0;
            state.users.push(dataUser);
          } else {
            console.log("No such user!" + user);
          }
        });
      } else {
        console.log("No such document!");
      }
    },
    countNbTasksDone(state, index) {
      state.users[index].nbTaskDone++
    },
    /**
     * Récupère la liste des taches finies de la collection group/${idGroup}/tasksDone du groupe
     * selectionné de firestore et la push dans tasksDone, et attrs (pour le calendrier)
     */
    async getTasksDone(state) {
      state.attrs = []
      state.tasksDone = []
      //reset des nbTaskDone
      await state.users.forEach((user) => {
        user.nbTaskDone = 0
      })
      const querySnapshot = await getDocs(
        collection(getFirestore(), 'group', router.currentRoute.value.params.uid, 'tasksDone')
      )
      querySnapshot.forEach(async (doc) => {
        let data = doc.data()
        let calendar = {}
        let taskDone = {}
        let indexTask = state.tasks.findIndex((obj) => obj.uid == data.task.id)
        const userRef = await getDoc(data.user)
        const userInfo = await userRef.data()
        data.uid = doc.id

        calendar.uid = data.uid
        calendar.dot = data.color
        calendar.dates = new Date(data.doneAt.toDate())
        calendar.popover = {}
        calendar.popover.label = `${state.tasks[indexTask].name} / ${userInfo.prenom}`

        taskDone.uid = data.uid
        taskDone.task = state.tasks[indexTask]
        taskDone.user = userInfo
        taskDone.date = new Date(data.doneAt.toDate())
        taskDone.color = data.color

        taskDone.user.uid = userRef.id
        let indexUser = state.users.findIndex(
          (obj) => obj.uid == taskDone.user.uid
        )
        state.users[indexUser].nbTaskDone++
        // this.$store.commit('countNbTasksDone', indexUser)
        state.tasksDone.push(taskDone)
        state.attrs.push(calendar)
        state.tasksDone.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date)
        })
      })
    },
    addTaskDone(state, object) {
      state.attrs.push(object.calendar)
      state.tasksDone.unshift(object.taskDone)
    },
    removeTaskDone(state, uid) {
      const auth = getAuth().currentUser.uid
      let indexTask = state.tasksDone.findIndex((obj) => obj.uid == uid)
      let indexCalendar = state.attrs.findIndex((obj) => obj.uid == uid)
      let indexUser = state.users.findIndex((obj) => obj.uid == auth)
      state.tasksDone.splice(indexTask, 1)
      state.attrs.splice(indexCalendar, 1)
      state.users[indexUser].nbTaskDone--
      
    },
    addNbTaskDone(state, uid) {
      let indexUser = state.users.findIndex((obj) => obj.uid == uid)
      state.users[indexUser].nbTaskDone++
    },
    addPlanningTask(state, task) {
      state.planningTasks.push(task)
    },
    /**
     * Faire en sorte que les couleurs soient changé partout sans avoir besoin de refresh la DB
     * @param {*} state 
     * @param {*} color 
     */
    setColor(state, color) {
      const auth = getAuth().currentUser.uid
      let indexUser = state.users.findIndex((obj) => obj.uid == auth)
      state.users[indexUser].color = color

    }
  },
  actions: {
    async fetchUserProfile({ commit }, user) {
      const docRef = doc(getFirestore(), "users", user.uid);
      const userProfile = await getDoc(docRef);
      // console.log(userProfile.data());
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
          // console.log("user", user);
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