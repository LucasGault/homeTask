<template>
  <Modal @close="$emit('close')">
    <!-- <div class=" mb-8"> -->
    <Title is="h2" class="text-2xl text-center font-bold mt-4"
      >Quitter le Groupe</Title
    >
    <div class="mx-8 mt-4 space-y-4">
      <!-- <p class="text-center text-lg ">
          Vous avez été invité dans un groupe
        </p> -->
      <div class="space-y-4">
        <Text center v-if="users.length == 1">
          Quitter ce groupe supprimera définitivement le groupe.
        </Text>
        <Text center>Êtes-vous sûr de vouloir quitter le groupe?</Text>
      </div>
      <Flex jBetween class="pt-4 mt-8 mb-4">
        <Button
          green
          @click="$emit('close')"
          class="CTA-green text-xl font-bold"
        >
          Annuler
        </Button>
        <Button red @click="leaveGrp" class="CTA-red text-xl font-bold">
          Quitter
        </Button>
      </Flex>
    </div>
  </Modal>
</template>

<script>
import { doc, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore'

import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Modal from '../ui/Modal.vue'
import Title from '../ui/Title.vue'
import Text from '../ui/Text.vue'
export default {
  emits: ['close'],
  props: {
    color: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  components: { Flex, Button, Modal, Title, Text },
  methods: {
    async leaveGrp() {
      console.log(this.$route.params.uid)
      console.log(this.$auth.currentUser.uid)
      await deleteDoc(
        doc(
          this.$db,
          'users',
          this.$auth.currentUser.uid,
          'groups',
          this.$route.params.uid
        )
      )
      if (this.users.length == 1) {
        await deleteDoc(doc(this.$db, 'group', this.$route.params.uid))
      } else {
        const groupRef = doc(this.$db, 'group', this.$route.params.uid)
        await updateDoc(groupRef, {
          users: arrayRemove({
            uid: doc(this.$db, 'users', this.$auth.currentUser.uid),
            color: this.color,
          }),
        })
      }
      // await this.$parent.getGrps()

      this.$router.push({ name: 'Group' })
    },
  },
}
</script>