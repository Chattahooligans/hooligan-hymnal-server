<template>
  <fragment>
    <label class="flex-1 font-semibold" :for="name">{{ label }}</label>
    <fragment v-if="type != 'textarea'">
      <input
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :aria-placeholder="arplaceholder"
        :required="required"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        class="border flex-auto rounded p-2 shadow"
        :value="value"
        @input="updateValue"
      />
    </fragment>
    <fragment v-else>
      <textarea
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :aria-placeholder="arplaceholder"
        class="border flex-auto rounded p-2 shadow resize-none"
        height="80"
        width="100"
        :value="value"
        @input="updateValue"
      ></textarea>
    </fragment>
  </fragment>
</template>

<script>
export default {
  props: {
    value: [String, Number, Boolean],
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean
    },
    arplaceholder: {
      type: String
    },
    autocomplete: {
      type: Boolean
    },
    autofocus: {
      type: Boolean
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
