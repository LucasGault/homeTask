<template>
  <Modal @close="$emit('close')">
    <Flex jBetween class="mb-8">
      <Title is="h2" t2xl fExtraBold>Tâches spéciales</Title>
      <Button @click="$emit('close')">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.364 2.05026L11.9497 0.636042C11.5592 0.245518 10.9261 0.245518 10.5355 0.636042L7 4.17158L3.46447 0.636042C3.07394 0.245518 2.44078 0.245518 2.05025 0.636042L0.636039 2.05026C0.245514 2.44078 0.245515 3.07394 0.636039 3.46447L4.17157 7L0.636039 10.5355C0.245515 10.9261 0.245515 11.5592 0.636039 11.9498L2.05025 13.364C2.44078 13.7545 3.07394 13.7545 3.46447 13.364L7 9.82843L10.5355 13.364C10.9261 13.7545 11.5592 13.7545 11.9497 13.364L13.364 11.9498C13.7545 11.5592 13.7545 10.9261 13.364 10.5355L9.82843 7L13.364 3.46447C13.7545 3.07394 13.7545 2.44078 13.364 2.05026Z"
            fill="black"
          />
        </svg>
      </Button>
    </Flex>
  </Modal>
</template>
<script>
import Flex from '../ui/Flex.vue'
import Button from '../ui/Button.vue'
import Modal from '../ui/Modal.vue'
import Title from '../ui/Title.vue'
export default {
  components: {
    Flex,
    Modal,
    Button,
    Title
  },
  emits: ['close'],

}
</script>