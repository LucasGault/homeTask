<template>
  <div>
    <LoginForm v-if="showForm == 'login'"></LoginForm>
    <!-- Formulaire de création de compte visible seulement si showForm == register -->
    <RegisterForm v-else-if="showForm == 'register'"></RegisterForm>
  </div>
</template>

<script>
import LoginForm from '../components/account/LoginForm.vue'
import RegisterForm from '../components/account/RegisterForm.vue'
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

export default {
  components: { LoginForm, RegisterForm},
  data() {
    return {
      showForm: 'login',
      verification: {
        isStrongPass: false,
        isStrongMin: false,
        isStrongMaj: false,
        isStrongNumber: false,
        isStrongLength: false,
        isSame: false,
      },
      isCloseNow: false,
      isCloseNew1: false,
      isCloseNew2: false,
    }
  },
  methods: {
    toggleForm(form) {
      this.showForm = form
      if (form == 'register') {
        document.title = `Inscription / homeTask `
      }
      if (form == 'pwd') {
        document.title = `Mot de passe oublié / homeTask `
      }
      if (form == 'login') {
        document.title = `Connexion / homeTask `
      }
      this.$store.state.isError = false
    },
    
    /**
     * Sert à afficher/masquer le mot de passe
     */
    togglePwd(ref) {
      const type = ref.getAttribute('type') === 'password' ? 'text' : 'password'
      ref.setAttribute('type', type)
      if (this.$refs.password1 == ref) {
        this.isCloseNow = !this.isCloseNow
      }
      if (this.$refs.password2 == ref) {
        this.isCloseNew1 = !this.isCloseNew1
      }
      if (this.$refs.password3 == ref) {
        this.isCloseNew2 = !this.isCloseNew2
      }
    },
  },
  components: { LoginForm, RegisterForm },
}
</script>


<style lang="postcss" scoped>
/* .strongPass {
  @apply text-theme-rouge;
}
.weakPass {
  @apply text-theme-rouge;
} */
.passVerif {
  font-size: 0.7rem;
  line-height: 0.75rem;
}
.politiques {
  @apply text-center mt-2;
  font-size: 0.6rem;
  line-height: 0.75rem;
}
.formContainer {
  height: 80vh;
  width: 90vw;
}
/* input {
  @apply pt-2 pb-1 px-2 font-medium;
  border-bottom: 2px solid #000000;
  width: 80vw;
} */
/* .group {
  @apply flex flex-col;
  width: 80vw;
} */

@screen md {
  .registerForm {
    width: 50vw;
  }
  .formContainer {
    width: auto;
  }
}
input {
  outline: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  border-radius: 0;
}
/* input:focus,
input:valid {
  border-bottom: 2px solid #f3b628;
} */
/* label {
  @apply text-xs font-semibold;
  color: #000000;
} */

/* .btnGroup {
  @apply flex justify-between;
} */
</style>
