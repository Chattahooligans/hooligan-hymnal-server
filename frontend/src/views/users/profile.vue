<template>
  <Layout>
    <h2>{{ user.email }}</h2>
    <div>
      <h3>Update Password</h3>
      <form @submit.prevent="updatePassword">
        <div>
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div>
          <label for="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            v-model="newPassword"
          />
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
export default {
  data() {
    return {
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    };
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
      axios
        .put(`/api/users/${id}/reset-password`, {
          password: this.password,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
  }
};
</script>

<style></style>
