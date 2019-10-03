<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      players: []
    };
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
