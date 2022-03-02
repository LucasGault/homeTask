<template>
  <Modal @close="$emit('close')" >
      <!-- <div class=" mb-8"> -->
      <Title is="h2" t2xl center fBold class="mt-4">
        Invitation dans le groupe
      </Title>
      <Title is="h3" t3xl fBlack center>{{ group.name }}</Title>
      <div class="mx-10 mt-4 space-y-4">
        <!-- <p class="text-center text-lg ">
          Vous avez été invité dans un groupe
        </p> -->
        <Text center>
          Choissiez une couleur pour rentrer dans le groupe
        </Text>
        <Listbox class="size-select" id="color-choice" v-model="color.name">
          <div class="relative">
            <ListboxButton
              :class="color.name"
              class="
                relative
                w-full
                py-2
                pl-3
                pr-10
                text-left
                bg-white
                rounded-lg
                shadow-md
                cursor-default
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-opacity-75
                focus-visible:ring-white
                focus-visible:ring-offset-blue-300
                focus-visible:ring-offset-2
                focus-visible:border-indigo-500
                sm:text-lg
              "
            >
              <span class="block truncate">{{ color.name }}</span>
              <span
                class="
                  absolute
                  inset-y-0
                  right-0
                  flex
                  items-center
                  pr-2
                  pointer-events-none
                "
              >
                <SelectorIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="
                  absolute
                  w-full
                  py-1
                  mt-1
                  overflow-auto
                  text-base
                  bg-white
                  rounded-md
                  shadow-lg
                  max-h-36
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                  sm:text-sm
                "
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="color in colors"
                  :key="color.name"
                  :value="color.name"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'text-blue-900 bg-blue-100' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ color.name }}</span
                    >
                    <span
                      v-if="selected"
                      class="
                        absolute
                        inset-y-0
                        left-0
                        flex
                        items-center
                        pl-3
                        text-blue-600
                      "
                    >
                      <CheckIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <Flex jBetween class="mt-8 mb-4">
          <Button red @click="$emit('close')" class="text-xl font-bold">
            Refuser
          </Button>
          <Button green @click="acceptPending" class="text-xl font-bold">
            Accepter
          </Button>
        </Flex>
      </div>
      <!-- <button @click="$emit('close')">
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
        </button> -->
      <!-- </div> -->
  </Modal>
</template>

<script>
import {
  doc,
  deleteField,
  updateDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

import Modal from '../components/ui/Modal.vue'
import Flex from '../components/ui/Flex.vue'
import Button from '../components/ui/Button.vue'
import Title from '../components/ui/Title.vue'
import Text from '../components/ui/Text.vue'
export default {
  emits: ['close'],
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
    Modal,
    Flex,
    Button,
    Title,
    Text
},
  data() {
    return {
      colors: [
        { name: 'gray' },
        { name: 'red' },
        { name: 'orange' },
        { name: 'yellow' },
        { name: 'green' },
        { name: 'teal' },
        { name: 'blue' },
        { name: 'indigo' },
        { name: 'purple' },
        { name: 'pink' },
      ],
      color: { name: 'gray' },
    }
  },
  mounted() {
    this.removeColor()
    // this.addEvents()
  },
  methods: {
    async acceptPending() {
      let docRef = await doc(
        this.$db, 'users', this.$auth.currentUser.uid, 'groups', this.group.uid
      )
      await updateDoc(docRef, {
        pending: deleteField(),
      })
      const groupRef = doc(this.$db, 'group', this.group.uid)
      await updateDoc(groupRef, {
        users: arrayUnion(
          ...[
            {
              uid: doc(this.$db, 'users', this.$auth.currentUser.uid),
              color: this.color.name,
            },
          ]
        ),
      })
      await this.$parent.getGrps()

      this.$router.push({
        name: 'GroupDetail',
        params: { uid: this.group.uid },
      })
    },
    async removeColor() {
      let docGroupRef = await doc(this.$db, 'group', this.group.uid)
      let docGroup = await getDoc(docGroupRef)
      if (docGroup.exists()) {
        docGroup.data().users.forEach((user) => {
          var color = this.colors.find((color) => color.name == user.color)
          this.colors.splice(this.colors.indexOf(color), 1)
          this.color = this.colors[0]
        })
      } else {
        console.log('No such document!')
      }
    },
    // addEvents() {
    //   this.$refs.modalBg.addEventListener('click', this.clickOutside)
    // },
    // removeEvents() {
    //   this.$refs.modalBg.removeEventListener('click', this.clickOutside)
    // },
    // clickOutside(ev) {
    //   if (!ev.target.closest('.modalContainer')) {
    //     // console.log(ev);
    //     this.$emit('close')
    //   }
    // },
  },
  // beforeUnmount() {
  //   this.removeEvents()
  // },
}
</script>

<style lang='postcss' scoped>
.modalContainer {
  max-width: 30vw;
}
</style>