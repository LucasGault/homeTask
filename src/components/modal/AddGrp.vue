<template>
  <Modal @close="$emit('close')">
    <Flex jBetween class="mb-6">
      <Title is="h2" t2xl fExtraBold>Créer un groupe</Title>
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
    <Flex is="form" col @submit.prevent="createGroup">
      <Flex col>
        <Input
          id_input="group_name"
          name="Nom du groupe *"
          type_input="text"
          placeholder_name="Nom du groupe"
          v-model:value.trim="group.name"
          required
          @input="resetError"
        ></Input>
        <div class="errorContainer mt-1 mb-2">
          <Text error v-if="errorMessage" >{{ errorMessage }}</Text>
        </div>
      </Flex>
      <label class="mb-4" for="color-choice"> Choisi ta couleur </label>
      <Listbox id="color-choice" v-model="color.name">
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
              <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
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
      <Button is="input" type="submit" green class="mt-4" value="Créer le groupe"/>
    </Flex>
  </Modal>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
// import Input from './VInput.vue'
import Input from '../ui/VInput.vue'
import Modal from '../ui/Modal.vue'
import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Title from '../ui/Title.vue'
import Text from '../ui/Text.vue'

export default {
  emits: ['close'],
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
    Input,
    Modal,
    Flex,
    Button,
    Title,
    Text
  },

  data() {
    return {
      errorMessage: '',
      group: {
        name: '',
      },
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
  methods: {
    async createGroup() {
      if (this.group.name != '') {
        const docData = {
          name: this.group.name,
        }
        const addGroup = await addDoc(
          collection(this.$db, 'users', this.$auth.currentUser.uid, 'groups'),
          docData
        )
        await setDoc(doc(this.$db, 'group', addGroup.id), {
          name: docData.name,
          users: [
            {
              uid: doc(this.$db, 'users', this.$auth.currentUser.uid),
              color: this.color.name,
            },
          ],
        })
        this.$parent.getGrps()
        this.$emit('close')
      } else {
        console.log('Pas de nom')
        this.errorMessage = 'Veuillez remplir un nom de groupe'
      }
    },
    resetError() {
      this.errorMessage = ''
    },
  },
}
</script>