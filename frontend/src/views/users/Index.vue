<template>
  <Layout>
    <h2>All Users</h2>
    <!-- TODO: Need to add new endpoint -->
    <router-link to="/users/create">Add User</router-link>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul v-if="users.length">
        <li v-for="user in users" :key="user._id">
          <router-link :to="`/users/${user._id}`">{{ user.email }}</router-link>
        </li>
      </ul>
      <h3 v-else>No other users</h3>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      loading: false
    };
  },
  components: {
    Layout
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.loading = true;
      axios
        .get("/api/users")
        .then(({ data }) => {
          this.loading = false;
          this.users = data;
        })
        .catch(res => console.log(res));
    }
  }
};
</script>

<style></style>
