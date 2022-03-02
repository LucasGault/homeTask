<template>
  <Flex col>
    <label :for="id_input">{{ name }}</label>
    <input
    v-if="type_input == 'number'"
      :id="id_input"
      :type="type_input"
      :value="value"
      :placeholder="placeholder_name"
      :required="required"
      :min="min"
      :max="max"
      @input="$emit('update:value', $event.target.value)"
    />
    <input
    v-else
      :id="id_input"
      :type="type_input"
      :value="value"
      :placeholder="placeholder_name"
      :required="required"
      :title="required_title"
      :pattern="pattern"
      @input="$emit('update:value', $event.target.value)"
    />
  </Flex>
</template>

<script>
import Flex from './Flex.vue'
export default {
  components:{
    Flex
  },
  name: 'VInput',
  props: {
    value: [String, Number],
    // value: Number,
    id_input: String,
    name: String,
    type_input: String,
    placeholder_name: String,
    number: Boolean,
    required: Boolean,
    required_title: String,
    pattern: String,
    min: {
      type:Number,
      default: 1,
    },
    max: {
      type:Number,
      default: 14,
    }
  },
}
</script>

<style lang="postcss" scoped>
label {
  @apply text-xl font-medium;
}
input {
  @apply rounded-lg p-2 shadow-md mt-4;
  /* max-width: 60%; */
}
</style>
