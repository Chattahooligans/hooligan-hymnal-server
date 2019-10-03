<template>
  <Layout>
    <h2>All Players</h2>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul>
        <li v-for="player in players" :key="player._id">
          {{ player.name }}
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
export default {
  data() {
    return {
      loading: false,
      players: []
    };
  },
  components: {
    Layout
  },
  methods: {
    getPlayers() {
      this.$axios
        .get("/api/players")
        .then(({ data }) => (this.players = data))
        .catch(res => console.log(res));
    }
  }
};
</script>

<style></style>
