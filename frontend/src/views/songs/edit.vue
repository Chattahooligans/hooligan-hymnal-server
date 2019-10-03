<template>
  <Layout>
    <div v-if="loading">Loading...</div>
    <div v-else-if="message">
      {{ message }}
    </div>
    <div v-else>
      <h2>Edit {{ song.title }}</h2>
      <SongForm :edit="true" :song="song" :updateSong="updateSong" />
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import SongForm from "@/forms/SongForm";
export default {
  data() {
    return {
      message: "",
      loading: true,
      song: {}
    };
  },
  components: {
    Layout,
    SongForm
  },
  mounted() {
    this.getSong();
  },
  methods: {
    getSong() {
      const { id } = this.$route.params;
      this.$axios
        .get(`/api/song/${id}`)
        .then(({ data }) => {
          if (data.message) {
            this.loading = false;
            this.message = data.message;
          } else {
            this.song = data;
            this.loading = false;
          }
        })
        .catch(res => console.log(res));
    },
    updateSong() {
      const { id } = this.$router.params;
      this.$axios
        .put(`/api/songs/${id}`)
        .then(({ data }) => {
          this.loading = false;
          this.song = data;
        })
        .catch(res => console.log(res));
    }
  }
};
</script>

<style></style>
