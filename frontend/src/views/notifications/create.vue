<template>
  <Layout>
    <div class="container mx-auto shadow p-3 mt-6">
      <h1>New Notification</h1>
      <form method="POST" @submit.prevent="submitNotification">
        <div class="flex flex-col mb-3">
          <BaseInput
            type="textarea"
            label="Message"
            name="message"
            placeholder="Message"
            v-model="message"
          />
        </div>
        <div class="flex flex-col mb-3">
          <BaseInput
            type="textarea"
            label="Annoucement"
            name="annoucment"
            placeholder="Annoucment"
            v-model="annoucement"
          />
        </div>
        <div class="mb-3">
          <label class="font-semibold"
            >Push?
            <input type="checkbox" name="checkbox" id="checkbox" />
          </label>
        </div>
        <div class="mb-3">
          <button
            class="bg-blue-600 text-white px-3 py-2 rounded"
            type="submit"
            :class="{ 'opacity-50': disabled }"
            :disabled="disabled"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script>
import NProgress from "nprogress";
import BaseInput from "@/components/BaseInput";
import $http from "@/services/api-service";
export default {
  data() {
    return {
      disabled: false,
      sender: "", // this needs to be a token.. make it select from dropdown?
      send_time: null,
      sender_latitude: "",
      sender_longitude: "",
      message: "",
      push: false,
      song: "",
      goalkeeperNickname: "",
      annoucement: ""
    };
  },
  components: {
    BaseInput
  },
  methods: {
    submitNotification() {
      this.disabled = true;
      NProgress.start();
      setTimeout(() => {
        this.disabled = false;
        NProgress.done();
      }, 2000);
    }
  }
};
</script>

<style></style>
