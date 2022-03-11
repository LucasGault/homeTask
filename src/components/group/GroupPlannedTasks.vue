<template>
  <div>
    <div class="planningTasksContainer space-y-2">
      <Title is="h4" t2xl fBold>
        Tâches à faire
        <span class="font-medium text-lg"> (dans la semaine) </span>
      </Title>
      <div v-for="task in $store.state.planningTasks" :key="task.uid">
        <Flex
          jBetween
          iCenter
          class="px-4 md:px-6 py-4 rounded-xl bg-green-100 text-green-900"
          :class="[
            { green: colorTaskByWeek(task) == 'green' },
            { orange: colorTaskByWeek(task) == 'orange' },
            { red: colorTaskByWeek(task) == 'red' },
          ]"
        >
          <Text tlg fMedium
            >{{ task.name }}
            <span class="text-base font-normal">x{{ task.repetition }}</span>
          </Text>
          <Text tlg fBold> {{ task.doneWeek }} </Text>
          <Button blue class>
            <Flex iCenter class="space-x-4">
              <!-- <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.26 17.85C29.26 24.0275 24.6925 29.1025 18.76 29.96V33.6L11.76 27.475L18.76 21.35V25.41C20.4731 25.0185 22.0028 24.0578 23.0994 22.6847C24.1959 21.3116 24.7946 19.6073 24.7975 17.85C24.7975 15.3125 23.555 13.0725 21.6825 11.655L25.095 8.66252C26.4048 9.80792 27.4541 11.2205 28.1726 12.8052C28.891 14.3899 29.2618 16.1101 29.26 17.85V17.85ZM5.74001 17.15C5.74001 10.99 10.3075 5.89753 16.24 5.04002V1.40002L23.24 7.52503C20.9125 9.57253 18.5675 11.6025 16.24 13.65V9.59002C14.5269 9.98153 12.9972 10.9423 11.9006 12.3154C10.8041 13.6885 10.2054 15.3928 10.2025 17.15C10.2025 19.6875 11.445 21.9275 13.3175 23.345L9.905 26.3375C8.5939 25.1932 7.54362 23.7809 6.8251 22.1959C6.10658 20.611 5.73655 18.8903 5.74001 17.15V17.15Z" fill="black"/>
</svg> -->
              <svg
                width="20"
                height="20"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 2.1875C14.4715 2.1875 11.511 3.08556 8.99283 4.76812C6.4747 6.45068 4.51206 8.84217 3.35309 11.6402C2.19413 14.4382 1.89089 17.517 2.48172 20.4873C3.07256 23.4577 4.53093 26.1861 6.67243 28.3276C8.81392 30.4691 11.5423 31.9274 14.5127 32.5183C17.483 33.1091 20.5618 32.8059 23.3598 31.6469C26.1578 30.4879 28.5493 28.5253 30.2319 26.0072C31.9144 23.489 32.8125 20.5285 32.8125 17.5C32.8125 13.4389 31.1992 9.54408 28.3276 6.67243C25.4559 3.80078 21.5611 2.1875 17.5 2.1875V2.1875ZM17.5 8.75C17.8245 8.75 18.1417 8.84622 18.4115 9.02649C18.6813 9.20677 18.8916 9.463 19.0157 9.76278C19.1399 10.0626 19.1724 10.3924 19.1091 10.7107C19.0458 11.0289 18.8895 11.3213 18.6601 11.5507C18.4307 11.7802 18.1383 11.9364 17.8201 11.9997C17.5018 12.063 17.1719 12.0305 16.8722 11.9064C16.5724 11.7822 16.3161 11.5719 16.1359 11.3021C15.9556 11.0323 15.8594 10.7151 15.8594 10.3906C15.8594 9.9555 16.0322 9.5382 16.3399 9.23053C16.6476 8.92285 17.0649 8.75 17.5 8.75ZM21.875 26.3867H13.125V23.9258H16.2695V17.6367H14.2187V15.1758H18.7305V23.9258H21.875V26.3867Z"
                  fill="currentColor"
                />
              </svg>

              <Text class="hidden md:block" fSemiBold>Informations</Text>
            </Flex>
          </Button>
        </Flex>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../ui/Title.vue";
import Button from "../ui/Button.vue";
import Flex from "../ui/Flex.vue";
import Text from "../ui/Text.vue";
export default {
  name: "GroupPlannedTasks",
  methods: {
    colorTaskByWeek(task) {
      if (task.repetition == 1 && task.doneWeek == 1) {
        return "green";
      } else if (task.doneWeek <= Math.ceil(task.repetition / 3)) {
        return "red";
      } else if (task.doneWeek < task.repetition) {
        return "orange";
      }
      return "green";
    },
  },
  components: { Title, Button, Flex, Text },
};
</script>

<style lang="scss" scoped></style>
