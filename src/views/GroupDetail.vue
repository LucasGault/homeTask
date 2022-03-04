<template>
  <div class="space-y-4 pt-2">
    <Flex jBetween iCenter class="mx-2">
      <Title is="h2" t3xl fBlack>{{ name }}</Title>
      <GroupActionMenu/>
    </Flex>
    <div class="w-full max-w-6xl mx-auto px-2 py-16 sm:px-0">
      <GroupTabBody
        :users="users"
        :tasks="tasks"
        :planningTasks="planningTasks"
        :taskDoneAt="taskDoneAt"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import Flex from '../components/ui/Flex.vue'
import Title from '../components/ui/Title.vue'
import GroupActionMenu from '../components/group/GroupActionMenu.vue'
  import GroupTabBody from '../components/group/GroupTabBody.vue'
// import DeleteTaskDone from '../components/modal/DeleteTaskDone.vue'

import {
  doc,
  getDoc,
  getDocs,
  collection,
} from 'firebase/firestore'

export default {
  name: 'GroupDetails',
  components: {
    Flex,
    Title,
    GroupActionMenu,
    GroupTabBody,
  },
  data() {
    return {
      users: [],
      tasks: [],
      // tasksDone: [],
      name: '',
      planningTasks: [],
      taskDoneAt: {
        name: '',
        date: new Date(),
      },
      deleteTask: {},
      color: '',
      task: { name: '' },
      errorMessage: '',
    }
  },
  async mounted() {
    this.getUsersGroup()
    this.getPlanningTasks()
    this.getTask()
    // console.log(this.getWeekBefore())
    // function getMonday(d) {
    //   d = new Date(d)
    //   var day = d.getDay(),
    //     diff = d.getDate() - day + (day == 0 ? -6 : 1) // adjust when day is sunday
    //   return new Date(d.setDate(diff))
    // }
    // console.log(getMonday(new Date()))
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
    
    // async getReste() {
    //   // await console.log(this.tasksDone);
    //   // var array = this.planningTasks
    //   // console.log(array);
    //   await this.tasksDone.forEach(async (task) => {
    //     // console.log("ee");
    //     await console.log(task)
    //   })
    // },
  },
}
</script>