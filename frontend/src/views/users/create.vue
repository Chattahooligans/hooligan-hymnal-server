<template>
  <Layout>
    <h2>Create User</h2>
    <UserForm :user="user" :formMethod="addUser" :cancel="cancel" />
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import UserForm from "@/forms/UserForm";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        songbookAllowed: false,
        rosterAllowed: false,
        foesAllowed: false,
        usersAllowed: false
      }
    };
  },
  components: {
    Layout,
    UserForm
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
