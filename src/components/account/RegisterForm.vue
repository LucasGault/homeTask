<template>
  <Flex is="form" col jBetween class="h-full" @submit.prevent="signUp">
    <Title fBold t3xl>Créer un compte</Title>
    <div class="space-y-2">
      <Flex col class="pt-4">
        <Input
          id_input="lastname_register"
          name="Nom *"
          type_input="text"
          placeholder_name="Nom"
          v-model:value.trim="signupForm.nom"
          required
        ></Input>
      </Flex>
      <Flex col>
        <Input
          id_input="firstname_register"
          name="Prénom *"
          type_input="text"
          placeholder_name="Prénom"
          v-model:value.trim="signupForm.prenom"
          required
        ></Input>
      </Flex>
      <Flex col>
        <Input
          id_input="email2"
          name="Email *"
          type_input="email"
          placeholder_name="you@email.com"
          v-model:value.trim="signupForm.email"
          required
        ></Input>
      </Flex>
      <Flex col>
        <Input
          id_input="password2"
          name="Mot de passe *"
          type_input="password"
          placeholder_name="********"
          v-model:value.trim="signupForm.password"
          required
          @keyup="passwordValidation"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required_title="Doit contenir un numéro, une minuscule, une majuscule et au moins 8 caractères"
        ></Input>
        <div @click="togglePwd($refs.password2)"></div>
      </Flex>
      <Flex col>
        <Input
          id_input="password3"
          name="Confirmer le Mot de passe *"
          type_input="password"
          placeholder_name="********"
          v-model:value.trim="signupForm.password2"
          required
        ></Input>
        <div @click="togglePwd($refs.password3)"></div>
      </Flex>
      <div class="passVerif">
        <p :class="{ weakPass: verification.isStrongPass }">
          Le mot de passe doit contenir au minimum 8 caractères, une minuscule,
          une majuscule, un chiffre, et les deux mots de passes doivent être
          identique
        </p>
      </div>
    </div>
    <div class="btnGroup">
      <Button
        is="input"
        type="button"
        blue
        @click="$parent.toggleForm('login')"
        value="Se connecter"
      />
      <Button is="input" type="submit" green value="S'inscrire" />
    </div>
  </Flex>
</template>

<script>
import Input from '../ui/VInput.vue'
import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Title from '../ui/Title.vue'
export default {
  components: { Input, Flex, Button, Title },
  data() {
    return {
      signupForm: {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password2: '',
        // telephone: "",
      },
      verification: {
        isStrongPass: false,
        isStrongMin: false,
        isStrongMaj: false,
        isStrongNumber: false,
        isStrongLength: false,
        isSame: false,
      },
    }
  },
  methods: {
    /**
     * Au click sur le bouton signUp lance la fonction du store pour s'inscrire au site
     * si le formulaire est valide, sinon affiche les messages d'erreurs en conséquences
     */
    async signUp() {
      if (this.passwordValidation()) {
        await this.$store.dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          nom: this.signupForm.nom,
          prenom: this.signupForm.prenom,
          title: this.signupForm.title,
          // telephone: this.signupForm.telephone,
        })
      } else if (!this.passwordValidation()) {
        this.verification.isStrongPass = true
        setTimeout(() => {
          this.verification.isStrongPass = false
        }, 3000)
      } else {
        this.$store.state.isError = true
        this.$store.state.errorMsg =
          'Veuillez renseigner toutes les informations'
      }
    },
    /**
     * Appelle les différentes fonctions de validations des formulaires pour retourner true ou false
     */
    passwordValidation() {
      var lowerCaseLetters = /[a-z]/g
      var upperCaseLetters = /[A-Z]/g
      var numbers = /[0-9]/g
      this.verification.isSame = this.sameValidation()
      this.verification.isStrongLength = this.lengthValidation()
      this.verification.isStrongMin = this.caseValidation(lowerCaseLetters)
      this.verification.isStrongMaj = this.caseValidation(upperCaseLetters)
      this.verification.isStrongNumber = this.caseValidation(numbers)
      return (
        this.verification.isSame &&
        this.verification.isStrongLength &&
        this.verification.isStrongMin &&
        this.verification.isStrongMaj &&
        this.verification.isStrongNumber
      )
    },
    caseValidation(regexCase) {
      if (this.signupForm.password.match(regexCase)) {
        return true
      } else {
        return false
      }
    },
    lengthValidation() {
      if (this.signupForm.password.length >= 8) {
        return true
      } else {
        return false
      }
    },
    sameValidation() {
      if (
        this.signupForm.password == this.signupForm.password2 &&
        this.signupForm.password != 0
      ) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>