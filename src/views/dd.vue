<template>
  <Listbox v-model="selectedPerson">
    <ListboxLabel>Assignee:</ListboxLabel>
    <ListboxButton>{{ selectedPerson.name }}</ListboxButton>
    <ListboxOptions>
      <ListboxOption v-for="person in people" :key="person" :value="person">
        {{ person.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script>
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'

  export default {
    components: {
      Listbox,
      ListboxLabel,
      ListboxButton,
      ListboxOptions,
      ListboxOption,
    },

    setup() {
      const people = [
        { id: 1, name: 'Durward Reynolds' },
        { id: 2, name: 'Kenton Towne' },
        { id: 3, name: 'Therese Wunsch' },
        { id: 4, name: 'Benedict Kessler' },
        { id: 5, name: 'Katelyn Rohan' },
      ]
      const selectedPerson = ref(people[0])

      return {
        people,
        selectedPerson,
      }
    },
  }
</script>