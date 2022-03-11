<template>
  <header class="">
    <Flex is="nav" jBetween iCenter class="px-2 pt-2 md:py-4">
      <Button is="router-link" :to="{ name: 'Home' }" class="logo">
        <Flex iCenter>
          <svg viewBox="0 0 78 79" fill="none">
            <path
              d="M73.8462 67.73V40.3992C73.8464 38.4977 73.4584 36.6162 72.7059 34.87C71.9535 33.1237 70.8525 31.5494 69.4703 30.2436L43.7215 5.90919C42.4247 4.68314 40.7077 4 38.9231 4C37.1384 4 35.4215 4.68314 34.1246 5.90919L8.37586 30.2436C6.99369 31.5494 5.89266 33.1237 5.14023 34.87C4.3878 36.6162 3.9998 38.4977 4 40.3992V67.73C4 69.5825 4.73588 71.359 6.04575 72.6689C7.35562 73.9788 9.13218 74.7146 10.9846 74.7146H66.8615C68.714 74.7146 70.4905 73.9788 71.8004 72.6689C73.1103 71.359 73.8462 69.5825 73.8462 67.73Z"
              class="stroke-black"
              stroke-width="6.98462"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M55.0992 25.8838L58.4454 29.23L44.9663 42.6855C47.4877 46.3145 47.8412 50.674 45.7204 53.5018L30.8274 38.6088C33.6552 36.488 38.0147 36.8414 41.6436 39.3629L55.0992 25.8838V25.8838ZM23.4516 60.8776C18.7151 56.141 15.8166 50.4855 15.0154 45.207L26.515 40.2819L44.0473 57.8141L39.1222 69.3138C33.8437 68.5126 28.1881 65.6141 23.4516 60.8776Z"
              class="fill-black"
            />
          </svg>
          <Title t3xl fBlack class="text-black">HomeTask</Title>
        </Flex>
      </Button>
      <div class="hidden md:block">
        <Button
          is="router-link"
          blue
          :to="{ name: 'Group' }"
          v-if="$router.currentRoute.value.name != 'Login'"
        >
          Mes Groupes
        </Button>
      </div>
      <div
        class="log hidden md:block"
        v-if="
          $router.currentRoute.value.name != 'Login' ||
          $router.currentRoute.value.name != 'GroupDetail'
        "
      >
        <Button blue @click="logout" v-if="showNav"> Deconnexion </Button>
        <Button blue is="router-link" v-else :to="{ name: 'Login' }"> Connexion </Button>
      </div>
      <div class="block md:hidden z-50">
        <Button
          ref="button"
          @click="toggleMenu"
          class="menu-btn"
          :class="{ 'menu-btn--open': isMenuOpen }"
        >
          <div class="bar-container w-full">
            <span class="bar line1"></span>
            <span class="bar line2"></span>
            <span class="bar line3"></span>
          </div>
        </Button>
      </div>
    </Flex>
    <transition name="slide-fade">
      <NavMobile :showNav="showNav" @close="toggleMenu" v-show="isMenuOpen"></NavMobile>
    </transition>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Flex from "../components/ui/Flex.vue";
import Button from "../components/ui/Button.vue";
import Title from "../components/ui/Title.vue";
import NavMobile from "../components/NavMobile.vue";
export default {
  components: {
    Flex,
    Button,
    Title,
    NavMobile
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
    toggleMenu() {
      // this.$refs.button.blur();
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  computed: {
    ...mapState(["userProfile"]),
    // Verifie si un utilisateur est co
    showNav() {
      return Object.keys(this.userProfile).length > 1;
    },
  },
};
</script>

<style lang="postcss" scoped>
.logo svg {
  width: 32px;
}

.logo {
  @apply outline-none;
}

.menu-btn {
  @apply flex flex-row justify-center items-center rounded-full transition duration-500  z-50;
  width: 60px;
  z-index: 50;
  /* height: 40px; */
  outline: none;
}

.bar-container {
  @apply flex flex-col justify-between;
  height: 18px;
}

.menu-btn .bar {
  width: 100%;
  height: 3px;
  @apply block transition-all duration-[600ms] origin-center bg-black rounded-full;
}
.line3 {
  @apply self-end;
}

.menu-btn--open .line1 {
  width: 50%;
  transform: rotateZ(45deg);
}
.menu-btn--open .line2 {
  transform: rotateZ(-45deg);
}

.menu-btn--open .line3 {
  width: 50%;
  transform: rotateZ(45deg);
}
.slide-fade-enter-active {
  transition: all 0.7s cubic-bezier(0.1, 0.75, 0.56, 1);
  /* transition: all 0.3s ease; */
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate(100rem, 0);
  /* opacity: 0; */
}
</style>
