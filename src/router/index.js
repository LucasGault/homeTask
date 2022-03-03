import { createWebHistory, createRouter } from "vue-router";
import { getAuth } from "firebase/auth";
// import "firebase/auth";
import store from "../store";


const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/VLogin.vue"),
  },
  {
    path: "/group",
    name: "Group",
    component: () => import("../views/VGroup.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dd",
    name: "dd",
    component: () => import("../views/dd.vue"),
  },
  {
    path: "/group/:uid",
    name: "GroupDetail",
    component: () => import("../views/GroupDetail.vue"),
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// console.log(firebase);
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  // console.log(requiresAuth);
  // console.log(store.state.userProfile);
  // console.log(!store.state.userProfile.prenom);
  //Si pas connecté
  if (requiresAuth && !store.state.userProfile.prenom) {
    next({
      name: "Login"
    });
  } else {
    next();
  }
});


export default router;
