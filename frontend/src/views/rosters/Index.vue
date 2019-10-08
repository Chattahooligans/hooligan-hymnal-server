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
import axios from "axios";
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
  created() {
    this.getRosters();
  },
  methods: {
    getRosters() {
      this.loading = true;
      axios
        .get("/api/roster")
        .then(({ data }) => {
          this.loading = false;
          this.rosters = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style></style>
