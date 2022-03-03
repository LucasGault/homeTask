<template>
  <div>
    <div class="space-y-4 pt-2">
      <Flex jBetween iCenter class="mx-2">
        <Title is="h2" t3xl fBlack>{{ name }}</Title>
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="
                inline-flex
                justify-center
                items-center
                w-full
                px-4
                py-2
                text-lg
                font-medium
                text-white
                bg-blue-500
                rounded-md
                hover:bg-opacity-80
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-900
                focus-visible:ring-opacity-75
              "
            >
              Options
              <ChevronDownIcon
                class="w-5 h-5 ml-2 -mr-1 text-blue-100 hover:text-blue-50"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class=" scale-95 opacity-0"
            enter-to-class=" scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class=" scale-100 opacity-100"
            leave-to-class=" scale-95 opacity-0"
          >
            <MenuItems
              class="
                absolute
                right-0
                w-64
                mt-2
                origin-top-right
                bg-white
                rounded-md
                shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none
              "
            >
              <div class="px-1 space-y-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                    ]"
                    class=""
                    @click="toggleAddUser()"
                  >
                    Ajouter des participants
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                    ]"
                    class=""
                    @click="toggleAddTasks()"
                  >
                    Tâches hebdomadaire
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                    ]"
                    class=""
                    @click="toggleAddSpecial()"
                  >
                    Tâches occasionnelles
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                    ]"
                    class=""
                    @click="toggleChangeColor()"
                  >
                    Changer la couleur
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-red-500 text-white' : 'text-gray-900',
                      'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                    ]"
                    class=""
                    @click="toggleLeaveGrp()"
                  >
                    Quitter le groupe
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-red-500 text-white' : 'text-gray-900',
                      'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                    ]"
                    class=""
                    @click="logout()"
                  >
                    Deconnexion
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </Flex>
      <div class="w-full max-w-6xl mx-auto px-2 py-16 sm:px-0">
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
            <TabPanel
              :class="[
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              ]"
            >
              <Flex col class="space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <Text tlg fMedium
                  :class="user.color"
                  class="
                    py-2
                    px-4
                    rounded
                    text-lg
                    font-semibold
                  "
                  v-for="user in users"
                  :key="user"
                >
                  {{ user.prenom }} {{ user.nbTaskDone }}
                </Text>
              </Flex>
            </TabPanel>
            <TabPanel
              :class="[
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              ]"
            >
              <Flex col jCenter iCenter class="space-y-4 my-4">
                <form
                  class="bg-white shadow rounded px-8 pt-6 pb-8"
                  @submit.prevent="taskDone"
                >
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
                      <label
                        class="block text-gray-600 text-sm font-bold mb-2"
                        for="task-choice"
                      >
                        Tâche réalisé
                      </label>
                      <Listbox v-if="planningTasks.length != 0" id="task-choice" v-model="task">
                        <div class="relative">
                          <ListboxButton
                            class="
                              heightList
                              relative
                              w-full
                              py-2
                              pl-3
                              pr-10
                              mt-4
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
                                max-h-52
                                ring-1 ring-black ring-opacity-5
                                focus:outline-none
                                sm:text-sm
                                z-10
                              "
                            >
                              <ListboxOption
                                v-slot="{ active, selected }"
                                v-for="task in planningTasks"
                                :key="task.uid"
                                :value="task"
                                as="template"
                              >
                                <li
                                  :class="[
                                    active
                                      ? 'text-blue-900 bg-blue-100'
                                      : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pl-10 pr-4',
                                  ]"
                                >
                                  <span
                                    :class="[
                                      selected ? 'font-medium' : 'font-normal',
                                      'block truncate',
                                    ]"
                                    >{{ task.name }} {{ task.repetition }}
                                  </span>
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
                                    <CheckIcon
                                      class="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </li>
                              </ListboxOption>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>
                      <Button v-else blue @click="toggleAddTasks()">
                        Ajouter une tâche
                      </Button>
                    </Flex>
                    <Button is="input" type="submit" value="Task done" green class="md:self-end"/>
                  </Flex>
                  <Text error italic
                    class="mt-1"
                    v-if="errorDateMessage"
                  >
                    {{ errorDateMessage }}
                  </Text>
                  <!-- <p class="text-blue-500 text-xs font-bold mt-1" v-else>
                  We got it. Thanks!
                </p> -->
                </form>
                <div class="w-full max-w-xl">
                  <v-calendar
                    is-expanded
                    :from-date="new Date()"
                    :attributes="attrs"
                  />
                </div>
              </Flex>
            </TabPanel>
            <TabPanel
              :class="[
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              ]"
            >
              <div class="tasksContainer">
                <div class="planningTasksContainer">
                  <Title is="h4" txl fBold>
                    À faire
                    <span class="font-medium text-lg"> (dans la semaine) </span> 
                  </Title>
                  <div v-for="task in planningTasks" :key="task.uid">
                    <Text>{{ task.name }} x{{ task.repetition }}</Text>
                  </div>
                </div>
                <div class="doneTasksContainer" v-if="tasksDone.length != 0">
                  <Title is="h4" txl fBold>fait</Title>
                  <div v-for="taskDone in tasksDone" :key="taskDone.uid">
                    <Text>{{ taskDone.task.name }} {{ taskDone.user.prenom }}</Text>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
    <AddUserInGrp
      @close="toggleAddUser"
      v-if="isAddUser"
      :name="name"
      :users="users"
    ></AddUserInGrp>
    <AddTasksHebdo
      @close="toggleAddTasks"
      v-if="isAddTasks"
      :tasks="tasks"
    ></AddTasksHebdo>
    <AddTasksSpecial
      @close="toggleAddSpecial"
      v-if="isAddSpecial"
    ></AddTasksSpecial>
    <LeaveGrp
      @close="toggleLeaveGrp"
      v-if="isLeaveGrp"
      :color="color"
      :users="users"
    ></LeaveGrp>
    <ChangeColor
      @close="toggleChangeColor"
      v-if="isChangeColor"
      :colorUser="color"
      :users="users"
    >
    </ChangeColor>
  </div>
</template>

<script>
import AddUserInGrp from '../components/modal/AddUserInGrp.vue'
import AddTasksHebdo from '../components/modal/AddTasksHebdo.vue'
import LeaveGrp from '../components/modal/LeaveGrp.vue'
import ChangeColor from '../components/modal/ChangeColor.vue'
import AddTasksSpecial from '../components/modal/AddTasksSpecial.vue'
import Flex from '../components/ui/Flex.vue'
import Button from '../components/ui/Button.vue'
import Title from '../components/ui/Title.vue'
import Text from '../components/ui/Text.vue'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronDownIcon, CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { mapState } from 'vuex'
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  collection,
  Timestamp,
  query,
  where,
} from 'firebase/firestore'

export default {
  name: 'GroupDetails',
  components: {
    Flex,
    Button,
    Title,
    Text,
    AddUserInGrp,
    AddTasksHebdo,
    AddTasksSpecial,
    LeaveGrp,
    ChangeColor,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    ChevronDownIcon,
    CheckIcon,
    SelectorIcon,
  },
  data() {
    return {
      isAddUser: false,
      isAddTasks: false,
      isAddSpecial: false,
      isLeaveGrp: false,
      isChangeColor: false,
      users: [],
      tasks: [],
      tasksDone: [],
      name: '',
      attrs: [],
      planningTasks: [],
      taskDoneAt: {
        name: '',
        date: new Date(),
      },
      color: '',
      task: { name: '' },
      errorMessage: '',
    }
  },
  async mounted() {
    this.getUsersGroup()
    this.getPlanningTasks()
    this.getTask()
    this.getTasksDone()
    // console.log(this.tasks);
  },
  methods: {
    /**
     * Récupère la liste des taches de la collection taches de firestore
     * et la push dans tasks
     */
    async getTask() {
      this.tasks = []
      const querySnapshot = await getDocs(collection(this.$db, 'tasks'))
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.uid = doc.id
        this.tasks.push(data)
      })
    },
    /**
     * Récupère la liste des taches de la collection group/${idGroup}/planningTasks du groupe
     * selectionné de firestore et la push dans planningTasks
     */
    async getPlanningTasks() {
      this.planningTasks = []
      const querySnapshot = await getDocs(
        collection(this.$db, 'group', this.$route.params.uid, 'planningTasks')
      )
      querySnapshot.forEach(async (doc) => {
        let data = doc.data()
        // console.log(data);
        if (typeof data.name == 'object') {
          const userRef = await getDoc(data.name)
          const userInfo = await userRef.data()
          // console.log(userRef);
          data.uid = userRef.id
          data.name = userInfo.name
        }
        this.planningTasks.push(data)
        this.task = await this.planningTasks[0]
      })
      // console.log(this.planningTasks)
      // console.log(this.task)
    },

    async getUsersGroup() {
      this.users = []
      const docRefGroup = doc(this.$db, 'group', this.$route.params.uid)
      const docSnapGroup = await getDoc(docRefGroup)

      if (docSnapGroup.exists()) {
        let data = docSnapGroup.data()
        this.name = data.name
        data.users.forEach(async (user) => {
          if (user.uid.id == this.$auth.currentUser.uid) {
            this.color = user.color
            // console.log(this.color)
          }
          let docSnapUser = await getDoc(user.uid)
          if (docSnapUser.exists()) {
            var dataUser = docSnapUser.data()
            dataUser.uid = docSnapUser.id
            dataUser.color = user.color
            dataUser.nbTaskDone = 0
            this.users.push(dataUser)
          } else {
            console.log('No such user!' + user)
          }
          // console.log(this.users);
        })
      } else {
        console.log('No such document!')
      }
    },
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
        color: this.color,
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
      // console.log(this.users);
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
        taskDone.user.uid = userRef.id
        let indexUser = this.users.findIndex(
          (obj) => obj.uid == taskDone.user.uid
        )
        this.users[indexUser].nbTaskDone++
        // console.log(taskDone.user);
        // console.log(indexUser);
        this.tasksDone.push(taskDone)
        this.attrs.push(calendar)
      })
      // console.log(this.tasksDone);
      // await setTimeout(this.addNbTasks(),5000)
      // await this.addNbTasks();
    },
    async getReste() {
      // await console.log(this.tasksDone);
      // var array = this.planningTasks
      // console.log(array);
      await this.tasksDone.forEach(async (task) => {
        // console.log("ee");
        await console.log(task)
      })
    },
    async searchUser() {
      // console.log(this.users);
      if (this.email) {
        if (this.users.find((user) => user.email == this.email)) {
          this.errorMessage = "L'utilisateur est déjà dans le groupe"
          this.$refs.inputError.classList.add('inputError')
        } else {
          const usersRef = collection(this.$db, 'users')
          const q = query(usersRef, where('email', '==', this.email))
          const querySnapshot = await getDocs(q)
          // console.log(querySnapshot.size);
          if (querySnapshot.size != 0) {
            querySnapshot.forEach((doc) => {
              var dataUser = {}
              dataUser = doc.data()
              dataUser.uid = doc.id
              dataUser.color = {}
              dataUser.name = ''
              this.userToAdd.push(dataUser)
            })
            this.email = ''
          } else {
            this.errorMessage = "L'adresse email est inexistante ou invalide"
            this.$refs.inputError.classList.add('inputError')
          }
        }
      } else {
        this.errorMessage = 'Veuillez indiquer une adresse email'
        this.$refs.inputError.classList.add('inputError')
      }
    },
    async addUser() {
      if (this.userToAdd.length != 0) {
        this.userToAdd.forEach(async (user) => {
          const docData = {
            name: this.name,
            pending: true,
          }
          await setDoc(
            doc(this.$db, 'users', user.uid, 'groups', this.$route.params.uid),
            docData
          )
        })
        // await this.$parent.getUsersGroup();
        this.toggleAddUser()
      } else {
        this.errorMessage = 'Veuillez indiquer une adresse email'
        this.$refs.inputError.classList.add('inputError')
      }
    },

    toggleAddUser() {
      this.isAddUser = !this.isAddUser
      console.log(this.isAddUser)
    },
    toggleAddTasks() {
      this.isAddTasks = !this.isAddTasks
      // console.log(this.isAddTasks);
    },
    toggleAddSpecial() {
      this.isAddSpecial = !this.isAddSpecial
    },
    toggleLeaveGrp() {
      this.isLeaveGrp = !this.isLeaveGrp
    },
    toggleChangeColor() {
      this.isChangeColor = !this.isChangeColor
    },
    toggleErrorClass() {
      this.$refs.inputError.classList.toggle('inputError')
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    },
  },
  computed: {
    ...mapState(['userProfile']),
    // Verifie si un utilisateur est co
    showNav() {
      return Object.keys(this.userProfile).length > 1
    },
    errorDateMessage() {
      if (!this.taskDoneAt.date) return 'Date is required.'
      return ''
    },
  },
}
</script>

<style lang="postcss" scoped>
.inputText {
  @apply bg-white text-gray-700 py-2 px-3 appearance-none border border-gray-300 rounded shadow-none;
}
.inputText:focus {
  @apply outline-none;
}
.heightList {
  /* height: 44px; */
  width: 16rem;
}
</style>
