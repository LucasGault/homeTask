<template>
  <Flex @keyup.esc="$emit('close')" jCenter iCenter class="modalBg">
    <div class="modalContainer rounded-xl bg-gray-300 px-8 py-4 shadow-md">
      <slot />
    </div>
  </Flex>
</template>

<script>
import Flex from './Flex.vue'

export default {
  name: 'MainModal',
  components: {
    Flex
  },
  emits: ['close'],
  mounted() {
    this.addEvents()
  },
  methods: {
    addEvents() {
      document.querySelector('.modalBg').addEventListener('click', this.clickOutside)
    },
    removeEvents() {
      document.querySelector('.modalBg').removeEventListener('click', this.clickOutside)
    },
    clickOutside(ev) {
      if (!ev.target.closest('.modalContainer')) {
        this.$emit('close')
      }
    },
    key() {
      console.log('key');
    }
  },
  beforeUnmount() {
    this.removeEvents()
  },
}
</script>

<style lang='postcss' scoped>
.modalBg {
  @apply fixed top-0 left-0 w-screen h-screen;
  --webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 1;
}

.modalContainer {
  min-width: 30vw;
}
</style>