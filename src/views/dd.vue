<template>
  <form @reset.prevent @submit.prevent="thisOne">
    <p>Ceci est un form avec 2 boutons</p>
    <VInput
      id_input="test"
      name="testas"
      type_input="text"
      placeholder_name="lala"
      placeholder="llalalalalal"
    />
    
    <Button is="input" red type="reset" value="no"  @click="secondary"/>
    <Button is="input" green type="submit" value="Submit"/>
    <!-- <input type="submit" value="Envoyer le formulaire"> -->
  </form>
</template>

<script>
import Button from '../components/ui/Button.vue'
import VInput from '../components/ui/VInput.vue'

export default {
  name: 'DD',
  components: {
    Button,
    VInput,
  },
  setup() {},
  methods: {
    thisOne() {
      console.log('yes')
    },
    secondary() {
      console.log('no')
    },
  },
}
</script>