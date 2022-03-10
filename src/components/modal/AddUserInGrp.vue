<template>
  <Modal @close="$emit('close')">
    <Flex jBetween class="mb-8">
      <Title t2xl fExtraBold>Ajouter des utilisateurs</Title>
      <Button @click="$emit('close')">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.364 2.05026L11.9497 0.636042C11.5592 0.245518 10.9261 0.245518 10.5355 0.636042L7 4.17158L3.46447 0.636042C3.07394 0.245518 2.44078 0.245518 2.05025 0.636042L0.636039 2.05026C0.245514 2.44078 0.245515 3.07394 0.636039 3.46447L4.17157 7L0.636039 10.5355C0.245515 10.9261 0.245515 11.5592 0.636039 11.9498L2.05025 13.364C2.44078 13.7545 3.07394 13.7545 3.46447 13.364L7 9.82843L10.5355 13.364C10.9261 13.7545 11.5592 13.7545 11.9497 13.364L13.364 11.9498C13.7545 11.5592 13.7545 10.9261 13.364 10.5355L9.82843 7L13.364 3.46447C13.7545 3.07394 13.7545 2.44078 13.364 2.05026Z"
            fill="black"
          />
        </svg>
      </Button>
    </Flex>
    <Flex col>
      <Flex is="form" col @submit.prevent="searchUser" class="space-y-4">
        <label for="addEmail">Ajouter des participants</label>
        <div>
          <Flex jBetween>
            <input
              ref="inputError"
              type="email"
              v-model="email"
              name="email"
              placeholder="email"
              id="addEmail"
              class="
                mail_input
                focus:invalid:border-red-500 focus:invalid:ring-red-500
              "
              @input="resetError"
            />
            <Button
              is="input"
              type="submit"
              value="Rechercher"
              blue 
              class="rounded-l-none rounded-r-lg"
            />
          </Flex>
          <div class="errorContainer">
            <Text error v-if="errorMessage">{{ errorMessage }}</Text>
          </div>
        </div>
      </Flex>
      <div class="space-y-4" v-if="userToAdd.length != 0">
        <Flex jBetween iCenter v-for="user in userToAdd" :key="user.uid">
          <Text tlg fMedium>{{ user.prenom }} {{ user.nom }}</Text>
          <Button
            is="input"
            type="button"
            value="Supprimer"
            red
            @click="deleteUser(user)"
          />
        </Flex>
      </div>
      <Button @click="addUser" green class="mt-4" > Ajouter </Button>
    </Flex>
  </Modal>
</template>

<script>
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore'

import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Modal from '../ui/Modal.vue'
import Title from '../ui/Title.vue'
import Text from '../ui/Text.vue'
export default {
  components: {
    Flex,
    Button,
    Modal,
    Title,
    Text,
  },
  emits: ['close'],
  data() {
    return {
      errorMessage: '',
      email: '',
      userToAdd: [],
    }
  },
  methods: {
    async searchUser() {
      if (this.email) {
        if (this.$store.state.users.find((user) => user.email == this.email)) {
          this.errorMessage = "L'utilisateur est déjà dans le groupe"
          this.$refs.inputError.classList.add('inputError')
        } else {
          const usersRef = collection(this.$db, 'users')
          const q = query(usersRef, where('email', '==', this.email))
          const querySnapshot = await getDocs(q)
          // console.log(querySnapshot.size);
          if (querySnapshot.size != 0) {
            querySnapshot.forEach((doc) => {
              var dataUser = {}
              dataUser = doc.data()
              dataUser.uid = doc.id
              dataUser.color = {}
              dataUser.name = ''
              this.userToAdd.push(dataUser)
            })
            this.email = ''
          } else {
            this.errorMessage = "L'adresse email est inexistante ou invalide"
            this.$refs.inputError.classList.add('inputError')
          }
        }
      } else {
        this.errorMessage = 'Veuillez indiquer une adresse email'
        this.$refs.inputError.classList.add('inputError')
      }
    },
    async addUser() {
      if (this.userToAdd.length != 0) {
        this.userToAdd.forEach(async (user) => {
          const docData = {
            name: this.$store.state.groupName,
            pending: true,
          }
          await setDoc(
            doc(this.$db, 'users', user.uid, 'groups', this.$route.params.uid),
            docData
          )
        })
        // await this.$parent.getUsersGroup();
        await this.$emit('close')
      } else {
        this.errorMessage = 'Veuillez indiquer une adresse email'
        this.$refs.inputError.classList.add('inputError')
      }
    },
    deleteUser(user) {
      this.userToAdd.splice(this.userToAdd.indexOf(user), 1)
    },
    resetError() {
      this.errorMessage = ''
      this.$refs.inputError.classList.remove('inputError')
    },
    toggleErrorClass() {
      this.$refs.inputError.classList.toggle('inputError')
    },
  },
}
</script>

<style lang='postcss' scoped>
.modalContainer {
  min-width: 35vw;
}

.mail_input {
  @apply rounded-l-lg rounded-r-none p-2 shadow-none flex-auto mt-0 border border-gray-400 placeholder-gray-400;
}
.mail_input:focus {
  @apply ring-offset-2 ring-1 border-sky-500 ring-sky-500;
}
.mail_input:invalid {
  @apply border-red-500 bg-red-200 bg-opacity-50 text-red-600;
}
.mail_input:disabled {
  @apply bg-gray-50 text-gray-500 border-gray-200 shadow-none;
}
.mail_input:valid {
  @apply border-blue-500;
}
.mail_input:focus:invalid {
  @apply border-red-500 ring-red-500;
}

label {
  @apply text-xl font-medium;
}
.inputError {
  @apply border-red-500 text-red-600;
}
/* .inputError:invalid:focus {
  @apply border-red-500 ring-red-500;
} */
</style>