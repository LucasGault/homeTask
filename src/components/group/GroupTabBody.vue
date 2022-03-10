<template>
  <div>
    <TabGroup>
      <TabList class="flex p-1 space-x-1 bg-gray-300 rounded-xl">
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-500',
            ]"
          >
            <Title is="h3" v-if="$store.state.users.length == 1" class="">Participant</Title>
            <Title is="h3" v-else class="">Participants</Title>
          </button>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-500',
            ]"
          >
            Calendrier
          </button>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-500',
            ]"
          >
            Tâches
          </button>
        </Tab>
      </TabList>
      <TabPanels class="mt-2">
        <!-- participant -->
        <TabPanel
          :class="[
            'bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
          ]"
        >
          <Flex col class="space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <Text
              tlg
              fSemiBold
              center
              :class="user.color"
              class="py-2 px-4 rounded"
              v-for="user in $store.state.users"
              :key="user"
            >
              {{ user.prenom }} {{ user.nbTaskDone }}
            </Text>
          </Flex>
        </TabPanel>
        <!-- calendar -->
        <TabPanel
          :class="[
            'bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
          ]"
        >
          <GroupCalendar/>
        </TabPanel>
        <!-- tasks -->
        <TabPanel
          :class="[
            'bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
          ]"
        >
          <GroupTasks />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script>
import Flex from '../ui/Flex.vue'
import Title from '../ui/Title.vue'
import Text from '../ui/Text.vue'
import GroupTasks from './GroupTasks.vue'
import GroupCalendar from './GroupCalendar.vue'

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
export default {
  name: 'TabGroupBody',
  components: {
    Flex,
    Title,
    Text,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    GroupTasks,
    GroupCalendar,
  },
  mounted() {
    this.$store.commit("getTasksDone")
    console.log(this.$store.state.tasksDone);
    console.log(this.$store.state.attrs);
  },
}
</script>