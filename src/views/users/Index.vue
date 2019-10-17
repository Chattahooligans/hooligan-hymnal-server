<template>
  <Layout>
    <h2 class="text-2xl font-bold mb-3">All Users</h2>
    <router-link class="text-green-700" to="/users/create"
      >Add User</router-link
    >
    <div>
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
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["users"])
  }
};
</script>

<style></style>
