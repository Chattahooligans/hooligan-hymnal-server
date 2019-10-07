<template>
  <Layout>
    <h2>Rosters</h2>
    <router-link :to="{ name: 'create-roster' }">Create Roster</router-link>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul v-if="rosters.length">
        <li v-for="roster in rosters" :key="roster._id">
          {{ roster }}
        </li>
      </ul>
      <h3 v-else>No Rosters</h3>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
export default {
  data() {
    return {
      loading: false,
      rosters: []
    };
  },
  components: {
    Layout
  },
  methods: {
    getRosters() {
      this.loading = true;
      this.$axios.get("/api/rosters").then(({ data }) => {
        this.loading = false;
        this.rosters = data;
      });
    }
  }
};
</script>

<style></style>
