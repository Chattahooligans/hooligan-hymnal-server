<template>
  <Layout>
    <h2>Rosters</h2>
    <router-link :to="{ name: 'create-roster' }">Create Roster</router-link>
    <ul v-if="rosters.length">
      <li v-for="roster in rosters" :key="roster._id">
        {{ roster }}
      </li>
    </ul>
    <h3 v-else>No Rosters</h3>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["rosters"])
  }
};
</script>

<style></style>
