<template>
  <fragment>
    <label class="flex-1 font-semibold" :for="name">{{ label }}</label>
    <fragment v-if="type != 'textarea'">
      <validation-provider
        tag="div"
        class="flex flex-col mb-3"
        :rules="rules"
        :name="name"
        :vid="vid"
        v-slot="{ errors, invalid }"
      >
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
          :class="{ 'border-red-700': errors.length }"
          :value="value"
          @input="updateValue"
        />
        <small class="text-red-700">{{ errors[0] }}</small>
      </validation-provider>
    </fragment>
    <fragment v-else>
      <textarea
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :aria-placeholder="arplaceholder"
        class="border flex-auto rounded p-2 shadow resize-none"
        height="280"
        width="100"
        :value="value"
        :autocomplete="autocomplete"
        @input="updateValue"
      ></textarea>
    </fragment>
  </fragment>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "BaseInput",
  props: {
    value: [String, Number, Boolean],
    name: {
      type: String,
      required: true,
      default: ""
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
      type: [String, Boolean]
    },
    autofocus: {
      type: Boolean
    },
    rules: {
      type: [String, Object],
      default: ""
    },
    vid: {
      type: String,
      default: undefined
    }
  },
  data: () => ({
    currentValue: ""
  }),
  components: {
    ValidationProvider
  },
  methods: {
    updateValue(event) {
      // console.log(event.target.value);
      this.$emit("input", event.target.value);
    }
  }
};
</script>
