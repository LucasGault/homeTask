<template>
  <div>
    <Flex col jCenter iCenter class="space-y-4 my-4">
      <form class="bg-white shadow rounded px-8 pt-6 pb-8" @submit.prevent="taskDone()">
        <Flex col class="space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Flex col jBetween>
            <label
              class="block text-gray-600 text-sm font-bold mb-2"
              for="date_task_done"
            >
              Selectionne une date
            </label>
            <v-date-picker v-model="taskDoneAt.date" class="">
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  id="date_task_done"
                  class="inputText"
                  :class="{ 'border-red-600': errorDateMessage }"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </v-date-picker>
          </Flex>
          <Flex col jBetween>
            <label class="block text-gray-600 text-sm font-bold mb-2" for="task-choice">
              Tâche réalisé
            </label>
            <!-- Error here -->
            <Listbox
        
              v-if="$store.state.planningTasks.length != 0"
              id="task-choice"
              v-model="task"
            >
              <div class="relative">
                <ListboxButton
                  class="list_box_button focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-lg"
                >
                  <span class="block truncate">{{ task.name }}</span>
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
                    class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-52 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="planningTask in $store.state.planningTasks"
                      :key="planningTask.uid"
                      :value="planningTask"
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
                          >{{ planningTask.name }} {{ planningTask.repetition }}
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
            <!-- <Button v-else blue @click="toggleAddTasks()"> fix cette partie -->
            <Button
              class="bg-gray-500 cursor-not-allowed"
              v-else
              disabled
              @click="toggleAddTasks()"
            >
              Ajouter une tâche
            </Button>
          </Flex>
          <Button is="input" type="submit" value="Task done" green class="md:self-end" />
        </Flex>
        <Text error italic class="mt-1" v-if="errorDateMessage">
          {{ errorDateMessage }}
        </Text>
      </form>
      <div class="w-full max-w-xl">
        <v-calendar
          is-expanded
          :from-date="new Date()"
          :attributes="$store.state.attrs"
        />
      </div>
    </Flex>
  </div>
</template>

<script>
import Flex from "../ui/Flex.vue";
import Button from "../ui/Button.vue";
import Text from "../ui/Text.vue";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { doc, addDoc, collection, Timestamp } from "firebase/firestore";
export default {
  name: "GroupCalendar",
  components: {
    Flex,
    Button,
    Text,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
  },
  data() {
    return {
      task: this.$store.state.planningTasks[0],
      taskDoneAt: {
        name: "",
        date: new Date(),
      },
    };
  },
  methods: {
    async taskDone() {
      const docData = {
        doneAt: Timestamp.fromDate(this.taskDoneAt.date),
        user: doc(this.$db, "users", this.$auth.currentUser.uid),
        task: doc(this.$db, "tasks", this.task.uid),
        color: this.$store.state.color,
      };
      const task = await addDoc(
        collection(this.$db, "group", this.$route.params.uid, "tasksDone"),
        docData
      );
      var user = this.$store.state.userProfile;
      user.uid = this.$auth.currentUser.uid;
      const taskDone = {
        uid: task.id,
        task: this.task,
        user,
        date: this.taskDoneAt.date,
        color: this.$store.state.color,
      }
      const calendar = {
        uid: task.id,
        dot: this.$store.state.color,
        dates: this.taskDoneAt.date,
        popover: {label:`${this.task.name} / ${this.$store.state.userProfile.prenom}`} 
      }
      this.$store.commit('addTaskDone', {taskDone, calendar})
      this.$store.commit('addNbTaskDone', user.uid)
    },
  },
  computed: {
    errorDateMessage() {
      if (!this.taskDoneAt.date) return "Date is required.";
      return "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.list_box_button {
  @apply relative w-full py-2 pl-3  pr-10 mt-4 text-left bg-white rounded-lg shadow-md cursor-default;
  width: 16rem;
}
.inputText {
  @apply bg-white text-gray-700 py-2 px-3 appearance-none border border-gray-300 rounded shadow-none;
}
.inputText:focus {
  @apply outline-none;
}
</style>
