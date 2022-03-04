<template>
  <Modal @close="$emit('close')">
    <Flex jBetween class="mb-6">
      <Title is="h2" t2xl fExtraBold>Tâches hebdomadaires</Title>
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
    <Flex is="form" col @submit.prevent="addTask" class="space-y-4">
      <div>
        <label for="task-pre">Ajouter une tâche</label>
        <Listbox class="mt-2" id="task-pre" v-model="task">
          <div class="relative">
            <ListboxButton
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
                heightmin
              "
            >
              <span class="block truncate">{{ task.name }}</span>
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
                  max-h-48
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                  sm:text-sm
                "
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="task in tasks"
                  :key="task.name"
                  :value="task"
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
                      >{{ task.name }}</span
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
      </div>
      <Flex col>
        <Input
          id_input="rep"
          name="Répétitions dans la semaine"
          type_input="number"
          placeholder_name="Répétitions dans la semaine"
          v-model:value.trim="task.number"
          required
          min="1"
          max="14"
        />
      </Flex>
      <Button is="input" type="submit" green value="Ajouter une tâche" />
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

import { addDoc, collection, doc } from 'firebase/firestore'

import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Modal from '../ui/Modal.vue'
import Input from '../ui/VInput.vue'
import Title from '../ui/Title.vue'
export default {
  emits: ['close'],
  props: {
    tasks: {
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
    Flex,
    Button,
    Modal,
    Input,
    Title,
  },
  data() {
    return {
      task: {
        name: '',
        number: 1,
      },
      task2: null,
    }
  },
  mounted() {
    this.task = this.tasks[0]
    this.task.number = 1
    // this.addEvents()
    // console.log(this.tasks)
  },
  methods: {
    async addTask() {
      var data = {}
      if (this.task2) {
        data.name = this.task2
      } else {
        data.name = doc(this.$db, 'tasks', this.task.uid)
      }
      data.repetition = this.task.number
      try {
        await addDoc(
          collection(
            this.$db,
            'group',
            this.$route.params.uid,
            'planningTasks'
          ),
          data
        )
        // console.log('Document written with ID: ', docRef.id)
        this.$parent.$parent.$parent.getPlanningTasks()
        this.$emit('close')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
  },
}
</script>

<style lang='postcss' scoped>
.heightmin {
  min-height: 44px;
}
</style>