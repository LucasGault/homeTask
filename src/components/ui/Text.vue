<template>
  <component
    :is="is"
    :class="[
      { 'text-sm text-red-500': error },
      { 'text-center': center },
      { 'text-sm': tsm },
      { 'text-lg': tlg },
      { 'text-xl': txl },
      { 'text-2xl': t2xl },
      { 'text-3xl': t3xl },
      { 'font-medium': fMedium },
      { 'font-semibold': fSemiBold },
      { 'font-bold': fBold },
      { 'font-extrabold': fExtraBold },
      { 'font-black': fBlack },
      { italic },
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
      default: 'p',
    },
    error: Boolean,
    tsm: Boolean,
    tlg: Boolean,
    txl: Boolean,
    t2xl: Boolean,
    t3xl: Boolean,
    fMedium: Boolean,
    fSemiBold: Boolean,
    fBold: Boolean,
    fExtraBold: Boolean,
    fBlack: Boolean,
    center: Boolean,
    italic: Boolean,
  },
}
</script>