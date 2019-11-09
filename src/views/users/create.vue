<template>
  <Layout>
    <div class="container mx-auto py-4">
      <section class="shadow border rounded p-3">
        <h2>Create User</h2>
        <form ref="userForm" method="POST" @submit.prevent="addUser">
          <div class="mb-3 flex flex-col">
            <BaseInput
              type="text"
              name="name"
              label="First Name"
              placeholder="First Name"
              arPlaceholder="First Name"
              :required="true"
              v-model="user.name"
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
              v-model="user.familyName"
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
              type="text"
              label="Display Name"
              name="display-name"
              placeholder="display-name"
              :required="true"
              v-model="user.displayName"
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
          <h3>Permissions</h3>
          <hr class="mb-3" />
          <div class="mb-3 flex justify-around">
            <label for="songbook" class="font-semibold block"
              >Songbook And Songs Allowed
              <input
                type="checkbox"
                name="songbook"
                class="ml-3"
                id="songbook"
                v-model="user.songbookAllowed"
            /></label>
            <label for="rosters" class="font-semibold block"
              >Rosters & Players Allowed
              <input
                type="checkbox"
                name="rosters"
                class="ml-3"
                id="rosters"
                v-model="user.rosterAllowed"
            /></label>
          </div>
          <div class="mb-3 flex justify-around">
            <label for="push-notificataions" class="font-semibold block"
              >Push Notifications
              <input
                type="checkbox"
                name="push-notificataions"
                class="ml-3"
                id="push-notificataions"
                v-model="user.pushNotificationsAllowed"
            /></label>
            <label for="usersAllowed" class="font-semibold block"
              >Users Allowed
              <input
                type="checkbox"
                name="usersAllowed"
                class="ml-3"
                id="usersAllowed"
                v-model="user.usersAllowed"
            /></label>
          </div>
          <div class="mb-3">
            <button class="btn bg-blue-700 text-white" type="submit">
              Add User
            </button>
          </div>
        </form>
      </section>
    </div>
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
        name: "",
        familyName: "",
        email: "",
        displayName: "",
        password: "",
        songbookAllowed: false,
        rosterAllowed: false,
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
              this.$router.push({ name: "all-users" });
            });
          })
          .catch(({ response }) => {
            // console.log(response);
            this.$swal({
              title: `${response.message}`
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
