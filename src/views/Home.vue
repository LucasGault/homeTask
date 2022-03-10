<template>
  <div>
    <div class="p-2 space-y-4">
      <div v-if="userProfile">
        <Text txl fSemiBold>Bonjour {{ userProfile.prenom }}</Text>
      </div>
      <div>
        <Button
          blue
          v-if="userProfile.isAdmin"
          @click="toggleTask()"
        >
          Ajouter une tache
        </Button>
      </div>
    </div>
    <!-- <AddTask v-if="isTask && userProfile.isAdmin" @close="toggleTask"></AddTask> -->
    <Modal v-if="isTask && userProfile.isAdmin" @close="toggleTask">
      <Flex jBetween class="mb-6">
        <Title is="h2" t2xl fExtraBold class="text-2xl font-extrabold">Ajouter une tâche</Title>
        <Button @click="toggleTask">
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
      <Flex is="form" col @submit.prevent="addTask">
        <Flex col>
          <Input
            id_input="task"
            name="Nom de la tâche *"
            type_input="text"
            placeholder_name="Nom de la tâche"
            v-model:value.trim="task.name"
            required
            @input="resetError"
          ></Input>
          <div class="errorContainer">
            <Text error v-if="errorMessage" class="errorMessage">{{ errorMessage }}</Text>
          </div>
        </Flex>
        <Button green class="mt-4">Add Task</Button>
      </Flex>
    </Modal>
  </div>
</template>

<script>
import { addDoc, collection } from 'firebase/firestore'

// import AddTask from "../components/AddTask.vue";
import Modal from '../components/ui/Modal.vue'
import Input from '../components/ui/VInput.vue'
import Flex from '../components/ui/Flex.vue'
import Button from '../components/ui/Button.vue'
import Title from '../components/ui/Title.vue'
import Text from '../components/ui/Text.vue'

import { mapState } from 'vuex'

export default {
  name: 'HomeViews',
  components: { Modal, Input, Flex, Button, Title, Text },
  data() {
    return {
      users: [],
      group: {},
      name: '',
      email: '',
      isTask: false,
      task: {
        name: '',
        // number: 1,
      },
      errorMessage: '',
    }
  },
  mounted() {
    document.title = `HomeTask`
  },
  methods: {
    toggleTask() {
      this.isTask = !this.isTask
    },
    resetError() {
      this.errorMessage = ''
    },
    async addTask() {
      if (this.task.name != '') {
        try {
          const docRef = await addDoc(collection(this.$db, 'tasks'), {
            name: this.task.name,
            // number: this.task.number,
          })
          // this.$parent.getTask();
          this.toggleTask()
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      } else {
        // console.log('Pas de nom')
        this.errorMessage = 'Veuillez indiquer un nom de groupe'
      }
    },
  },
  computed: {
    ...mapState(['userProfile']),
  },
}
</script>