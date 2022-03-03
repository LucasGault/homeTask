<template>
  <Flex
    is="nav"
    col
    class="space-y-4 px-2 py-4 md:space-y-0 md:flex-row md:justify-between md:items-center"
  >
    <Flex is="router-link" iCenter :to="{ name: 'Home' }" class="logo">
      <svg width="78" height="79" viewBox="0 0 78 79" fill="none">
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
      <Title t3xl fBlack>HomeTask</Title>
    </Flex>
    <div>
      <Button
        is="router-link"
        blue
        :to="{ name: 'Group' }"
        v-if="$router.currentRoute.value.name != 'Login'"
      >
        Voir mes groupes
      </Button>
    </div>
    <div
      class="log"
      v-if="
        $router.currentRoute.value.name != 'Login' ||
        $router.currentRoute.value.name != 'GroupDetail'
      "
    >
      <Button blue @click="logout" v-if="showNav"> Deconnexion </Button>
      <Button blue is="router-link" v-else :to="{ name: 'Login' }">
        Connexion
      </Button>
    </div>
  </Flex>
</template>

<script>
import { mapState } from 'vuex'
import Flex from '../components/ui/Flex.vue'
import Button from '../components/ui/Button.vue'
import Title from '../components/ui/Title.vue'
export default {
  components: {
    Flex,
    Button,
    Title,
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    },
  },
  computed: {
    ...mapState(['userProfile']),
    // Verifie si un utilisateur est co
    showNav() {
      return Object.keys(this.userProfile).length > 1
    },
  },
}
</script>

<style lang='postcss' scoped>
.logo svg {
  width: 32px;
}

.logo {
  @apply outline-none;
}
</style>