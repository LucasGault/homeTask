<template>
  <div>
    <div class="tasksContainer p-2 space-y-4">
      <div class="planningTasksContainer space-y-2">
        <Title is="h4" t2xl fBold>
          Tâches à faire
          <span class="font-medium text-lg"> (dans la semaine) </span>
        </Title>
        <div v-for="task in $store.state.planningTasks" :key="task.uid">
          <Text tlg fMedium
            >{{ task.name }}
            <span class="text-base font-normal">x{{ task.repetition }}</span>
          </Text>
        </div>
      </div>
      <div class="doneTasksContainer space-y-2" v-if="$store.state.tasksDone.length != 0">
        <Title is="h4" t2xl fBold>
          Tâches faites
          <span class="font-medium text-lg"> (les 7 derniers jours) </span>
        </Title>
        <TransitionGroup name="task" tag="div" class="space-y-2">
          <div v-for="taskDone in $store.state.tasksDone" :key="taskDone.uid">
            <Flex
              jBetween
              iCenter
              class="px-4 md:px-6 py-4 rounded-xl fade_in_out"
              :class="taskDone.color"
              v-if="new Date(taskDone.date) >= new Date(getWeekBefore())"
            >
              <div>
                <Text tlg fMedium>
                  {{ taskDone.task.name }} {{ taskDone.user.prenom }},
                </Text>
                <Text> le {{ taskDone.date.toLocaleString() }} </Text>
              </div>
              <Button
                v-if="taskDone.user.uid == $auth.currentUser.uid"
                red
                @click="deleteTaskDone(taskDone)"
              >
                <Flex iCenter class="space-x-4">
                  <svg
                    width="40"
                    height="40"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"
                    ></path>
                  </svg>
                  <Text class="hidden md:block" fSemiBold>Supprimer</Text>
                </Flex>
              </Button>
            </Flex>
          </div>
        </TransitionGroup>
      </div>
    </div>
    <transition name="fade">
      <DeleteTaskDone
        v-if="isDeleteTaskDone"
        @close="toggleDeleteTaskDone"
        :deleteTask="deleteTask"
      />
    </transition>
  </div>
</template>

<script>
import Flex from "../ui/Flex.vue";
import Button from "../ui/Button.vue";
import Title from "../ui/Title.vue";
import Text from "../ui/Text.vue";
import DeleteTaskDone from "../modal/DeleteTaskDone.vue";

export default {
  name: "TaskGroup",
  components: { Flex, Button, Title, Text, DeleteTaskDone },
  data() {
    return {
      isDeleteTaskDone: false,
    };
  },
  methods: {
    getWeekBefore() {
      var today = new Date();
      var weekBefore = new Date();
      weekBefore.setDate(today.getDate() - 7);
      return weekBefore;
    },
    deleteTaskDone(task) {
      this.deleteTask = task;
      this.toggleDeleteTaskDone();
    },
    toggleDeleteTaskDone() {
      this.isDeleteTaskDone = !this.isDeleteTaskDone;
    },
  },
};
</script>

<style lang="postcss" scoped>
.task-enter-active,
.task-leave-active {
  transition: all 1s ease;
  transition-delay: 0.3s;
}
.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* .fade_in_out {
  animation: 1s slidein;
}
@keyframes slidein {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
} */
</style>
