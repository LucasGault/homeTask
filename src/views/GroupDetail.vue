<template>
  <div class="space-y-4 pt-2">
    <Flex jBetween iCenter class="mx-2">
      <Title is="h2" t3xl fBlack>{{ $store.state.groupName }}</Title>
      <GroupActionMenu />
    </Flex>
    <div class="w-full max-w-6xl mx-auto px-2 py-16 sm:px-0">
      <GroupTabBody
        :users="users"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import Flex from "../components/ui/Flex.vue";
import Title from "../components/ui/Title.vue";
import GroupActionMenu from "../components/group/GroupActionMenu.vue";
import GroupTabBody from "../components/group/GroupTabBody.vue";

export default {
  name: "GroupDetails",
  components: {
    Flex,
    Title,
    GroupActionMenu,
    GroupTabBody,
  },
  data() {
    return {
      users: [],
      planningTasks: [],
      // taskDoneAt: {
      //   name: "",
      //   date: new Date(),
      // },
      deleteTask: {},
      color: "",
      task: { name: "" },
      errorMessage: "",
    };
  },
  async mounted() {
    this.$store.commit("getUsersGroup");
    this.$store.commit("getPlanningTasks");
    this.$store.commit("getTasks");
    // function getMonday(d) {
    //   d = new Date(d)
    //   var day = d.getDay(),
    //     diff = d.getDate() - day + (day == 0 ? -6 : 1) // adjust when day is sunday
    //   return new Date(d.setDate(diff))
    // }
    // console.log(getMonday(new Date()))
  },
};
</script>
