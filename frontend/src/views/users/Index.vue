<template>
  <div>
    <h2>All Users</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user._id">{{ user.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      loading: false
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.loading = true;
      this.$axios
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
