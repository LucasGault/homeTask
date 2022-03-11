<template>
  <div class="tasksContainer p-2 space-y-4">
    <GroupPlannedTasks></GroupPlannedTasks>
    <GroupDoneTasks :plannedTask="plannedTask" ></GroupDoneTasks>
  </div>
</template>

<script>
import GroupDoneTasks from "./GroupDoneTasks.vue";
import GroupPlannedTasks from "./GroupPlannedTasks.vue";

export default {
  name: "TaskGroup",
  components: { GroupDoneTasks, GroupPlannedTasks },
  data() {
    return {
      plannedTask: this.$store.state.planningTasks,
    };
  },
  mounted() {
    this.checkPlannedTask();
  },
  methods: {
    checkPlannedTask() {
      console.log(this.getMonday(new Date()));
      this.plannedTask.forEach((task) => {
        task.doneWeek = 0;
      });
      this.$store.state.tasksDone.forEach((taskDone) => {
        if (new Date(taskDone.date) >= new Date(this.getMonday(new Date()))) {
          console.log(taskDone);
          const indexPlannedTask = this.plannedTask.findIndex(
            (obj) => obj.uid == taskDone.task.uid
          );
          this.plannedTask[indexPlannedTask].doneWeek++;
        }
      });
    },
    getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 0); // adjust when day is monday
      return new Date(d.setDate(diff));
    },
    
  },
};
</script>
