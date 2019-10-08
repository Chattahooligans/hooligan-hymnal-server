<template>
  <Layout>
    <h2>Goal Keeper Nickname</h2>
    <form @submit.prevent="addGoalkeeperNickname">
      <vue-form-generator
        :schema="schema"
        :model="goalkeeper"
        :options="formOptions"
      >
      </vue-form-generator>
      <div>
        <button type="submit">Add Goalkeeper Nickname</button>
      </div>
    </form>
  </Layout>
</template>

<script>
import { validators } from "vue-form-generator";
export default {
  data() {
    return {
      goalkeeper: {
        sender: "",
        push: false,
        nickname: "",
        backgroundColor: "",
        textColor: ""
      },
      schema: {
        groups: [
          {
            legend: "Goalkeeper Nickname",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Sender",
                model: "sender",
                id: "sender",
                placeholder: "sender",
                featured: true,
                required: true,
                validator: validators.string
              },
              {
                type: "input",
                inputType: "checkbox",
                label: "Push",
                model: "push"
              },
              {
                type: "input",
                inputType: "text",
                model: "nickname",
                label: "Nickname",
                placeholder: "Nickname",
                required: true,
                featured: true,
                validator: validators.string
              },
              {
                type: "input",
                inputType: "color",
                model: "backgroundColor",
                label: "Background Color"
              },
              {
                type: "input",
                inputType: "color",
                model: "textColor",
                label: "Text Color"
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChange: true,
        fieldIdPrefix: "goalkeeper-"
      }
    };
  },
  methods: {
    addGoalkeeperNickname() {
      // TODO Implement this
      return false;
    }
  }
};
</script>

<style></style>
