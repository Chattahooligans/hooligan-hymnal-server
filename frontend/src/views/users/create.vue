<template>
  <Layout>
    <h2>Create User</h2>
    <form>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="email"
          label="Email"
          placeholder="email@email.com"
          arPlaceholder="Enter new user email address"
          :required="true"
          v-model="user.email"
        />
      </div>
      <div class="flex mb-3">
        <div class="flex flex-col md:w-1/2">
          <BaseInput
            type="checkbox"
            name="songbookAllowed"
            label="Songs & Song Books"
            v-model="user.sonbookAllowed"
          />
        </div>
        <div class="flex flex-col md:w-1/2">
          <BaseInput
            type="checkbox"
            name="rosterAllowed"
            label="Players &
          Rosters"
            v-model="user.rosterAllowed"
          />
        </div>
      </div>
      <div class="flex mb-3">
        <div class="flex flex-col mb:w-1/2">
          <BaseInput
            type="checkbox"
            name="foesAllowed"
            label="Foes Allowed"
            v-model="user.foesAllowed"
          />
        </div>
        <div class="flex flex-col mb:w-1/2">
          <BaseInput
            type="checkbox"
            name="pushNotificationsAllowed"
            label="Push
          Notifications"
            v-model="user.pushNotificationsAllowed"
          />
        </div>
      </div>
      <div>
        <button class="rounded px-3 py-2 bg-blue-700 text-white" type="submit">
          Add User
        </button>
      </div>
    </form>
    <UserForm :user="user" :formMethod="addUser" :cancel="cancel" />
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import UserForm from "@/forms/UserForm";
import BaseInput from "@/components/BaseInput";
import axios from "axios";
export default {
  data() {
    return {
      holder: "",
      user: {
        email: "",
        password: "",
        songbookAllowed: false,
        rosterAllowed: false,
        foesAllowed: false,
        pushNotificationsAllowed: false,
        usersAllowed: false
      }
    };
  },
  components: {
    Layout,
    UserForm,
    BaseInput
  },
  methods: {
    addUser() {
      axios
        .post(`/api/users`, this.user)
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => console.log(err.response));
    },
    cancel() {
      this.user = {
        email: "",
        password: "",
        songbookAllowed: false,
        rosterAllowed: false,
        foesAllowed: false,
        usersAllowed: false
      };
    }
  }
};
</script>

<style></style>
