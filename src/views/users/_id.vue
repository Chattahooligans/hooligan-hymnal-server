<template>
  <Layout>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="message">
      {{ message }}
    </div>
    <div v-else>
      <h2>
        {{ user.email }} -
        <router-link :to="`/users/${user._id}/edit`">Edit</router-link>
      </h2>
      <h3>Users Permissions</h3>
      <ul>
        <li>
          Songs & Song Books:
          <input type="checkbox" :checked="user.songbookAllowed" disabled />
        </li>
        <li>
          Players & Rosters & Goalkeepers:
          <input type="checkbox" :checked="user.rosterAllowed" disabled />
        </li>
        <li>
          Foes:
          <input type="checkbox" :checked="user.foesAllowed" disabled />
        </li>
        <li>
          Users/Admin:
          <input type="checkbox" :checked="user.usersAllowed" disabled />
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      message: "",
      user: {}
    };
  },
  created() {
    this.getUser();
  },
  components: {
    Layout
  },
  methods: {
    getUser() {
      this.loading = true;
      const { id } = this.$route.params;
      axios.get(`/api/users/${id}`).then(({ data }) => {
        this.loading = false;
        if (data.message) {
          this.message = data.message;
        } else {
          this.user = data;
        }
      });
    }
  }
};
</script>

<style></style>
