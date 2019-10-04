<template>
  <Layout>
    <h2>All Players</h2>
    <router-link to="/players/create">Add Player</router-link>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul v-if="players.length">
        <li v-for="player in players" :key="player._id">
          <router-link :to="`/players/${player._id}`">{{
            player.name
          }}</router-link>
        </li>
      </ul>
      <h3 v-else>No Players</h3>
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
      players: []
    };
  },
  components: {
    Layout
  },
  created() {
    this.getPlayers();
  },
  methods: {
    getPlayers() {
      axios
        .get("/api/players")
        .then(({ data }) => (this.players = data))
        .catch(res => console.log(res));
    }
  }
};
</script>

<style></style>
