<template>
  <Layout>
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
          <router-link :to="`/songs/${song._id}`">{{ song.title }}</router-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      songs: [],
      loading: false,
      error: null
    };
  },
  components: {
    Layout
  },
  mounted() {
    this.getSongs();
  },
  methods: {
    getSongs() {
      this.loading = false;
      axios
        .get("/api/songs")
        .then(({ data }) => {
          this.loading = false;
          this.songs = data;
        })
        .catch(({ data }) => (this.message = data));
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style></style>
