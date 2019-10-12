<template>
  <Layout>
    <h2>{{ user.email }}</h2>
    <div>
      <h3>Update Password</h3>
      <form @submit.prevent="updatePassword">
        <div class="flex flex-col mb-3">
          <BaseInput
            type="password"
            label="Current Password"
            name="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="flex flex-col mb-3">
          <BaseInput
            type="password"
            label="New Password"
            name="newPassword"
            v-model="newPassword"
            placeholder="New Password"
          />
          <!-- <label for="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            v-model="newPassword"
          /> -->
        </div>
        <div>
          <label for="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            v-model="confirmNewPassword"
          />
        </div>
        <div>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import { userInfo } from "@/vuex/helpers";
import NProgress from "nprogress";
import BaseInput from "@/components/BaseInput";
export default {
  data() {
    return {
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  components: {
    BaseInput
  },
  computed: {
    ...userInfo
  },
  methods: {
    updatePassword() {
      const { id } = this.user;
      if (this.newPassword !== this.confirmNewPassword) {
        this.$swal({
          title: "The passwords did not match"
        }).then(() => {
          this.newPassword = "";
          this.confirmNewPassword = "";
        });
      }
      NProgress.start();
      axios
        .put(`/api/users/${id}/reset-password`, {
          password: this.password,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword
        })
        .then(res => {
          NProgress.done();
          console.log(res);
        })
        .catch(err => {
          NProgress.done();
          console.log(err.response);
        });
    }
  }
};
</script>

<style></style>
