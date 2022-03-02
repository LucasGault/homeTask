<template>
  <div class="poppins w-screen min-h-screen bg-gray-200">
    <NavBar></NavBar>

    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar
  },
  name: "App",
};
</script>

<style>
</style>
