<template>
  <Layout>
    <h2>Create User</h2>
    <form ref="userForm" method="POST" @submit.prevent="addUser">
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="text"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          arPlaceholder="First Name"
          :required="true"
          v-model="user.firstName"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          arPlaceholder="Last Name"
          :required="true"
          v-model="user.lastName"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="email"
          label="Email"
          name="email"
          placeholder="email@email.com"
          arPlaceholder="New User email address"
          :required="true"
          v-model="user.email"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="password"
          name="password"
          label="Password"
          placeholder="******"
          :required="true"
          v-model="user.password"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="password"
          name="confirm-password"
          label="Confirm Password"
          placeholder="******"
          :required="true"
          v-model="confirmPassword"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="checkbox"
          name="songbook"
          label="Songbook and Songs Allowed"
          v-model="user.songbookAllowed"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="checkbox"
          name="rosters"
          label="Rosters & Players"
          v-model="user.rosterAllowed"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="checkbox"
          name="push-notificataions"
          label="Push Notifications"
          v-model="user.pushNotificationsAllowed"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="checkbox"
          name="users-allowed"
          label="Users Allowed"
          v-model="user.usersAllowed"
        />
      </div>
      <div class="mb-3">
        <button class="btn bg-blue-700 text-white" type="submit">
          Add User
        </button>
      </div>
    </form>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import BaseInput from "@/components/BaseInput";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        songbookAllowed: false,
        rosterAllowed: false,
        foesAllowed: false,
        pushNotificationsAllowed: false,
        usersAllowed: false
      },
      confirmPassword: ""
    };
  },
  components: {
    Layout,
    BaseInput
  },
  methods: {
    addUser() {
      if (this.user.password === this.confirmPassword) {
        axios
          .post(`/api/users`, this.user)
          .then(() => {
            this.$swal({
              title: `${this.user.email} created succesfully!`,
              type: "success"
            }).then(() => {
              this.router.push({ name: "all-users" });
            });
          })
          .catch(({ response }) => {
            this.$swal({
              title: `${response}`
            }).then(() => {
              this.$refs.userForm.reset;
            });
          });
      } else {
        // console.log(this.$refs);
        this.$swal({
          title: "Please verify password match"
        }).then(() => {
          this.user.password = "";
          this.confirmPassword = "";
        });
      }
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
