<template>
  <div class="fixed top-0 right-0 w-5/6 bg-gray-100 h-full">
    <Flex col  jBetween class=" h-1/6 mt-24 ml-12">
      <div>
        <Button
          @click="$emit('close')"
          is="router-link"
          blue
          :to="{ name: 'Group' }"
          v-if="$router.currentRoute.value.name != 'Login'"
        >
          Mes Groupes
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
        <Button blue is="router-link" v-else :to="{ name: 'Login' }"> Connexion </Button>
      </div>
    </Flex>
  </div>
</template>

<script>
import Button from "./ui/Button.vue";
import Flex from "./ui/Flex.vue";
export default {
  name: "NavMobile",
  created() {},
  data() {
    return {};
  },
  props: {
    showNav: Boolean,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$emit("close");

      this.$router.push({ name: "Login" });
    },
  },
  components: { Button, Flex },
};
</script>

<style lang="scss" scoped></style>
