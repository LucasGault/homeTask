<template>
  <component
    :is="is"
    :class="[
      { 'text-center': center },
      { 'text-xl': txl },
      { 'text-2xl': t2xl },
      { 'text-3xl': t3xl },
      { 'font-medium': fMedium },
      { 'font-bold': fBold },
      { 'font-extrabold': fExtraBold },
      { 'font-black': fBlack },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'VTitle',
  props: {
    is: {
      type: String,
      default: 'h1',
    },
    txl: Boolean,
    t2xl: Boolean,
    t3xl: Boolean,
    fMedium: Boolean,
    fBold: Boolean,
    fExtraBold: Boolean,
    fBlack: Boolean,
    center: Boolean
  },
}
</script>

<style lang="scss" scoped></style>
