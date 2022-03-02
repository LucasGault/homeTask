<template>
  <component :is="is"
    class="flex"
    :class="[
      { 'justify-between': jBetween },
      { 'justify-center': jCenter },
      { 'items-center': iCenter },
      { 'flex-col': col },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "FlexBox",
  props: {
    is: {
      type: String,
      default: "div"
    },
    jBetween: {
      type: Boolean,
    },
    jCenter: {
      type: Boolean,
    },
    iCenter: {
      type: Boolean,
    },
    col: {
      type: Boolean,
    },
  },
};
</script>
