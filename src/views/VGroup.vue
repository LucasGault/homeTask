<template>
  <div>
    <div class="max-w-4xl mt-12 mx-2 md:mx-auto bg-white rounded-xl p-4 md:px-10 md:py-8 space-y-6">
      <Flex jBetween>
        <Title is="h2" t3xl fBlack>Groupe</Title>
      </Flex>
      <div class="group-container">
        <Flex jBetween iCenter>
          <Title is="h3" t2xl fBold>Liste de mes groupes</Title>
          <Button blue class="text-lg" @click="toggleGrp()">
            Créer un groupe
          </Button>
        </Flex>
        <div v-if="groups.length == 0">
          <Text>Vous n'avez pas encore de groupe.</Text>
          <Text>Créez en un ou attendez de vous faire inviter</Text>
        </div>
        <div v-else class=" space-y-4">
          <div v-for="group in groups" :key="group.uid">
            <Flex jBetween v-if="!group.pending">
              <Title is="h4" txl fMedium>
                {{ group.name }}
              </Title>
              <Button
                blue
                is="router-link"
                :to="{ name: 'GroupDetail', params: { uid: group.uid } }"
                class="text-lg"
              >
                Voir le groupe
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </div>
    <AddGrp v-if="isGrp" @close="toggleGrp"></AddGrp>
    <div v-for="group in groups" :key="group.uid">
      <ModalPendingGrp
        v-if="group.pending"
        :group="group"
        @close="modalClose(group)"
      ></ModalPendingGrp>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

import AddGrp from '../components/modal/AddGrp.vue'
import ModalPendingGrp from '../components/modal/ModalPendingGrp.vue'
// import Modal from '../components/ui/Modal.vue'
import Flex from '../components/ui/Flex.vue'
import Button from '../components/ui/Button.vue'
import Title from '../components/ui/Title.vue'
import Text from '../components/ui/Text.vue'

export default {
  components: {
    AddGrp,
    ModalPendingGrp,
    Flex,
    Button,
    Title,
    Text,
  },
  data() {
    return {
      isGrp: false,
      groups: [],
    }
  },
  mounted() {
    this.getGrps()
  },
  methods: {
    toggleGrp() {
      this.isGrp = !this.isGrp
      // console.log(this.isGrp);
    },
    async getGrps() {
      this.groups = []
      const querySnapshot = await getDocs(
        collection(this.$db, 'users', this.$auth.currentUser.uid, 'groups')
      )
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.uid = doc.id
        this.groups.push(data)
      })
    },
    async modalClose(group) {
      await deleteDoc(
        doc(this.$db, 'users', this.$auth.currentUser.uid, 'groups', group.uid)
      )
      this.getGrps()
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    },
  },
  computed: {
    ...mapState(['userProfile']),
  },
}
</script>

<style lang="postcss" scoped>
.group-container {
  @apply space-y-4;
  /* max-width: 60%; */
}
@screen md {
  .group-container {
    /* max-width: 60%; */
  }
}
</style>
