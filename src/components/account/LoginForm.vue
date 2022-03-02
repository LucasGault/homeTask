<template>
  <Flex is="form" col jBetween class="h-full" @submit.prevent>
    <Title fBold t3xl>Connexion</Title>
    <div class="">
      <Flex col>
        <Input
          id_input="email1"
          name="Email *"
          type_input="email"
          placeholder_name="you@email.com"
          v-model:value.trim="loginForm.email"
          required
        ></Input>
      </Flex>
      <Flex col>
        <Input
          id_input="password1"
          name="Password *"
          type_input="password"
          placeholder_name="********"
          v-model:value.trim="loginForm.password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required_title="Doit contenir un numéro, une minuscule, une majuscule et au moins 8 caractères"
        ></Input>
        <div @click="togglePwd($refs.password1)"></div>
      </Flex>
    </div>
    <!-- <a
      class="underline cursor-pointer pb-8 text-xs"
      @click="$parent.toggleForm('pwd')"
    >
      Mot de passe oublié?
    </a> -->

    <div class="btnGroup">
      <span
        class="text-white py-2 px-4 rounded-lg hover:bg-opacity-80 bg-blue-500"
        @click="$parent.toggleForm('register')"
      >
        S'inscrire
      </span>
      <Button green @click="login">Se connecter</Button>
    </div>
  </Flex>
</template>

<script>
import Input from '../ui/VInput.vue'
import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Title from '../ui/Title.vue'

export default {
  components: { Input, Button, Flex, Title },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      if (this.loginForm.email && this.loginForm.password) {
        await this.$store.dispatch('login', {
          email: this.loginForm.email,
          password: this.loginForm.password,
        })
      }
    },
  },
}
</script>