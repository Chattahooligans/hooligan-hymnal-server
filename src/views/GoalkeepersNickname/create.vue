<template>
  <Layout>
    <h2>Goal Keeper Nickname</h2>
    <form @submit.prevent="addGoalkeeperNickname">
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Sender"
          name="sender"
          placeholder="Sender"
          arPlaceholder="Sender name"
          v-model="goalkeeper.sender"
          :required="true"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Nickname"
          name="nickname"
          placeholder="Nickname"
          arPlaceholder="Enter Players Nickname"
          :required="true"
          v-model="goalkeeper.nickname"
        />
      </div>
      <div class="flex flex-row mb-3">
        <div class="md:w-1/2">
          <BaseInput
            label="Background Color"
            name="background-color"
            type="color"
            v-model="goalkeeper.backgroundColor"
          />
        </div>
        <div class="md:w-1/2">
          <BaseInput
            label="Text Color"
            name="text-color"
            type="color"
            v-model="goalkeeper.textColor"
          />
        </div>
      </div>
      <div class="flex flex-row mb-3">
        <label for="push">
          Push?
          <input type="checkbox" name="push" id="push" v-model="goalkeeper.push" />
        </label>
      </div>
      <div class>
        <button
          class="rounded px-3 py-2 bg-blue-600 text-white mr-3"
          type="submit"
        >Add Goalkeeper Nickname</button>
        <button
          class="rounded px-3 py-2 bg-red-700 text-white"
          type="button"
          @click="clearForm"
        >Clear Form</button>
      </div>
    </form>
  </Layout>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import NProgress from "nprogress";
import axios from "axios";
export default {
  data() {
    return {
      goalkeeper: {
        sender: "",
        push: false,
        nickname: "",
        backgroundColor: "",
        textColor: ""
      }
    };
  },
  components: {
    BaseInput
  },
  methods: {
    addGoalkeeperNickname() {
      NProgress.start();
      axios
        .post(`/api/goalkeeperNicknames`, this.goalkeeper)
        .then(res => {
          console.log(res);
          NProgress.done();
        })
        .catch(err => {
          console.log(err.response);
          NProgress.done();
        });
      // TODO Implement this
      // return false;
    },
    clearForm() {
      this.goalkeeper = {
        sender: "",
        push: false,
        nickname: "",
        backgroundColor: "",
        textColor: ""
      };
      // location.reload();
    }
  }
};
</script>

<style></style>
