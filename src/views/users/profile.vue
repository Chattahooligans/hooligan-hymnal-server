<template>
  <Layout>
    <h2 class="font-bold text-2xl mb-3">Hello {{ user.email }}</h2>
    <div>
      <h3 class="font-semibold text-xl pb-2 mb-3 border-b">Update Password</h3>
      <div class="rounded shadow p-3">
        <form ref="passwordForm" @submit.prevent="updatePassword">
          <div class="flex flex-col mb-3">
            <BaseInput
              type="password"
              label="Current Password"
              name="password"
              placeholder="Password"
              arPlaceholder="Enter your current password"
              v-model="password"
              :required="true"
            />
          </div>
          <div class="flex flex-col mb-3">
            <BaseInput
              type="password"
              label="New Password"
              name="newPassword"
              v-model="newPassword"
              placeholder="New Password"
              arPlaceholder="Enter your new password"
              :required="true"
            />
          </div>
          <div class="flex flex-col mb-3">
            <BaseInput
              type="password"
              label="Confirm New Password"
              name="confirmNewPassword"
              v-model="confirmNewPassword"
              arPlaceholder="Confirm your new password"
              placeholder="Confirm New Password"
              :required="true"
            />
          </div>
          <div class="flex flex-col mb-3">
            <button
              class="rounded px-3 py-2 bg-blue-600 text-white"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
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
        .then(() => {
          NProgress.done();
          this.$swal({
            title: "Password successfully updated!",
            type: "success"
          }).then(() => {
            this.$refs.passwordForm.reset();
          });
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
