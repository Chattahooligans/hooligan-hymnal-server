<template>
  <fragment>
    <label class="font-semibold flex-1" :for="name">{{ label }}</label>
    <select
      class="bg-transparent border rounded h-8 shadow"
      :name="name"
      :id="name"
      :value="value"
      @input="updateValue"
    >
      <option disabled value="">Please select one</option>
      <option v-for="(option, i) in options" :value="option" :key="i">{{
        option
      }}</option>
    </select>
  </fragment>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style></style>
