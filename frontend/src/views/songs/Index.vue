<template>
  <div>
    <h2>All Songs</h2>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      Error
    </div>
    <div v-else>
      <ul>
        <li v-for="song in songs" :key="song._id">
          {{ song.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      loading: false,
      error: null
    };
  },
  mounted() {
    this.getSongs();
  },
  methods: {
    getSongs() {
      this.loading = false;
      this.$axios
        .get("/api/songs")
        .then(({ data }) => {
          this.loading = false;
          this.songs = data;
        })
        .catch(({ data }) => (this.message = data));
    }
  }
};
</script>

<style></style>
