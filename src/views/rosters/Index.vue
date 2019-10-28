<template>
  <Layout>
    <h2>Rosters</h2>
    <router-link :to="{ name: 'create-roster' }">Create Roster</router-link>
    <ul v-if="rosters.length">
      <li v-for="roster in rosters" :key="roster._id">
        <router-link :to="{ name: 'view-roster', params: { id: roster._id } }">{{ roster.rosterTitle }}</router-link>
        <!-- {{ roster }} -->
      </li>
    </ul>
    <h3 v-else>No Rosters</h3>
  </Layout>
</template>

<script>
import axios from "axios"
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    deleteRoster(id) {
      axios.delete(`/api/rosters/${id}`).then((res) => {
        console.log(res)
      }).catch(err => console.log(err))
    }
  },
  computed: {
    ...mapGetters(["rosters"])
  }
};
</script>

<style></style>
