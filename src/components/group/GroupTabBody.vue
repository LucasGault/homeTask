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
            <Title is="h3" v-if="users.length == 1" class="">Participant</Title>
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
              v-for="user in users"
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
          <GroupCalendar :taskDoneAt="taskDoneAt" :planningTasks="planningTasks" :task="task" />
        </TabPanel>
        <!-- tasks -->
        <TabPanel
          :class="[
            'bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
          ]"
        >
          <GroupTasks :planningTasks="planningTasks" :tasksDone="tasksDone" />
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
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  Timestamp,
} from 'firebase/firestore'
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
  data() {
    return {
      tasksDone: [],
      attrs: [],
    }
  },
  props: {
    users: Array,
    tasks: Array,
    planningTasks: Array,
    taskDoneAt: Object,
    task: Object,
  },
  mounted() {
    this.getTasksDone()
  },
  methods: {
    /**
     * Ajoute une tache finie de la collection group/${idGroup}/tasksDone du groupe
     * selectionné de firestore et appelle getTasksDone
     */
    async taskDone() {
      // console.log(this.task);
      const docData = {
        doneAt: Timestamp.fromDate(this.taskDoneAt.date),
        user: doc(this.$db, 'users', this.$auth.currentUser.uid),
        task: doc(this.$db, 'tasks', this.task.uid),
        color: this.$parent.color,
      }
      await addDoc(
        collection(this.$db, 'group', this.$route.params.uid, 'tasksDone'),
        docData
      )
      this.getTasksDone()
    },
    /**
     * Récupère la liste des taches finies de la collection group/${idGroup}/tasksDone du groupe
     * selectionné de firestore et la push dans tasksDone, et attrs (pour le calendrier)
     */
    async getTasksDone() {
      this.attrs = []
      this.tasksDone = []
      //reset des nbTaskDone
      await this.users.forEach((user) => {
        user.nbTaskDone = 0
      })
      const querySnapshot = await getDocs(
        collection(this.$db, 'group', this.$route.params.uid, 'tasksDone')
      )
      querySnapshot.forEach(async (doc) => {
        let data = doc.data()
        let calendar = {}
        let taskDone = {}
        // console.log(data);
        // console.log(this.tasks);
        let indexTask = this.tasks.findIndex((obj) => obj.uid == data.task.id)
        const userRef = await getDoc(data.user)
        const userInfo = await userRef.data()
        data.uid = doc.id

        calendar.dot = data.color
        calendar.dates = new Date(data.doneAt.toDate())
        calendar.popover = {}
        calendar.popover.label = `${this.tasks[indexTask].name} / ${userInfo.prenom}`

        taskDone.uid = data.uid
        taskDone.task = this.tasks[indexTask]
        taskDone.user = userInfo
        taskDone.date = new Date(data.doneAt.toDate())
        taskDone.color = data.color

        taskDone.user.uid = userRef.id
        let indexUser = this.users.findIndex(
          (obj) => obj.uid == taskDone.user.uid
        )
        this.$parent.users[indexUser].nbTaskDone++
        this.tasksDone.push(taskDone)
        this.attrs.push(calendar)
        this.tasksDone.sort(function (a, b) {
          // console.log(a,b);
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date)
        })
      })
    },
  },
  
}
</script>