<template>
  <Modal @close="$emit('close')" class="">
    <Title t2xl center fBold is="h2" class="mt-4"> Supprimer une tâche </Title>
    <div class="mx-0 md:mx-8 mt-4 space-y-4">
      <div class="">
        <Text txl fSemiBold center
          >Êtes-vous sûr de vouloir supprimer la tâche:</Text
        >
        <Text tlg fMedium center class="p-4 mt-4 rounded-xl" :class="deleteTask.color">
          {{ deleteTask.task.name }}, faite le
          {{ deleteTask.date.toLocaleString() }}
        </Text>
        <!-- <Text tlg fMedium >  </Text> -->
      </div>
      <Flex jBetween class="pt-4 mt-8 mb-4">
        <Button
          green
          @click="$emit('close')"
          class="text-xl font-bold"
        >
          Annuler
        </Button>
        <Button red @click="deleteTaskDone" class="text-xl font-bold">
          <Flex iCenter class="space-x-2">
            <svg
              width="40"
              height="40"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"
              ></path>
            </svg>
            <Text class="" fSemiBold>Supprimer</Text>
          </Flex>
        </Button>
      </Flex>
    </div>
  </Modal>
</template>

<script>
import Modal from '../ui/Modal.vue'
import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Title from '../ui/Title.vue'
import Text from '../ui/Text.vue'

import { doc, deleteDoc } from 'firebase/firestore'

export default {
  name: 'ModalDelete',
  props: {
    deleteTask: Object,
  },
  emits: ['close'],

  mounted() {
  },
  methods: {
    async deleteTaskDone() {
      await deleteDoc(
        doc(
          this.$db,
          'group',
          this.$route.params.uid,
          'tasksDone',
          this.deleteTask.uid
        )
      )
      console.log(this.deleteTask.uid);
      this.$store.commit("removeTaskDone", this.deleteTask.uid)
      //bancale
      // this.$parent.$parent.$parent.$parent.$parent.getTasksDone()
      this.$emit('close')
    },
  },
  components: { Modal, Flex, Button, Title, Text },
}
</script>