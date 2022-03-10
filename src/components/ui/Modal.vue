<template>
  <Transition name="fade">
    <Flex @keyup.esc="$emit('close')" jCenter iCenter class="modalBg">
      <div class="modalContainer rounded-xl bg-gray-300 px-8 py-4 shadow-md">
        <slot />
      </div>
    </Flex>
  </Transition>
</template>

<script>
import Flex from './Flex.vue'

export default {
  name: 'MainModal',
  components: {
    Flex,
  },
  emits: ['close'],
  mounted() {
    this.addEvents()
  },
  methods: {
    addEvents() {
      document
        .querySelector('.modalBg')
        .addEventListener('click', this.clickOutside)
    },
    removeEvents() {
      document
        .querySelector('.modalBg')
        .removeEventListener('click', this.clickOutside)
    },
    clickOutside(ev) {
      if (!ev.target.closest('.modalContainer')) {
        this.$emit('close')
      }
    },
    key() {
      console.log('key')
    },
  },
  beforeUnmount() {
    this.removeEvents()
  },
}
</script>

<style lang='postcss' scoped>
.fade-enter-active, .fade-leave-active {
  opacity: 1;

  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.modalBg {
  @apply fixed top-0 left-0 w-screen h-screen;
  --webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 2;
}

.modalContainer {
  min-width: 30vw;
}
</style>