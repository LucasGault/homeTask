<template>
  <Modal @close="$emit('close')">
    <Title is="h2" t2xl center fBold class="mt-4">Changer la couleur</Title>
    <div class="mx-10 mt-4 space-y-4">
      <Text center>Sélectionner une couleur</Text>
      <Listbox class="size-select" id="color-choice" v-model="color.name">
        <div class="relative">
          <ListboxButton
            :class="color.name"
            class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-lg"
          >
            <span class="block truncate">{{ color.name }}</span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
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
              class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                    :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                  >
                    {{ color.name }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
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
        <Button red @click="$emit('close')" class="text-xl font-bold"> Annuler </Button>
        <Button green @click="changeColor" class="text-xl font-bold"> Changer </Button>
      </Flex>
    </div>
  </Modal>
</template>

<script>
import { doc, arrayRemove, updateDoc, arrayUnion } from "firebase/firestore";

import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

import Flex from "../ui/Flex.vue";
import Button from "../ui/Button.vue";
import Modal from "../ui/Modal.vue";
import Title from "../ui/Title.vue";
import Text from "../ui/Text.vue";
export default {
  emits: ["close"],
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
    Title,
    Text,
  },
  data() {
    return {
      colors: [
        { name: "gray" },
        { name: "red" },
        { name: "orange" },
        { name: "yellow" },
        { name: "green" },
        { name: "teal" },
        { name: "blue" },
        { name: "indigo" },
        { name: "purple" },
        { name: "pink" },
      ],
      color: { name: "gray" },
    };
  },
  mounted() {
    this.removeColor();
    // console.log(this.$store.state.users);

  },
  methods: {
    async changeColor() {
      const groupRef = doc(this.$db, "group", this.$route.params.uid);
      await updateDoc(groupRef, {
        users: arrayRemove({
          uid: doc(this.$db, "users", this.$auth.currentUser.uid),
          color: this.$store.state.color,
        }),
      });
      await updateDoc(groupRef, {
        users: arrayUnion({
          uid: doc(this.$db, "users", this.$auth.currentUser.uid),
          color: this.color.name,
        }),
      });
      // await this.$parent.$parent.$parent.getUsersGroup();
      this.$store.commit("setColor", this.color.name)
      this.$emit("close");
    },
    async removeColor() {
      this.$store.state.users.forEach((user) => {
        var color = this.colors.find((color) => color.name == user.color);
        this.colors.splice(this.colors.indexOf(color), 1);
        this.color = this.colors[0];
      });
      // console.log(this.color)
    },
  },
};
</script>
