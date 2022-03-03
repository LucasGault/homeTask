<template>
  <component :is="is"
    class="text-white py-2 px-4 rounded-lg hover:bg-opacity-80 cursor-pointer"
    :class="[
      { 'bg-blue-500': blue },
      { 'bg-red-500': red },
      { 'bg-green-500': green },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    is: {
      type: String,
      default: "button"
    },
    blue: {
      type: Boolean,
    },
    red: {
      type: Boolean,
    },
    green: {
      type: Boolean,
    },
  },
}
</script>