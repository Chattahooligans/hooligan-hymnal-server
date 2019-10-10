<template>
  <Layout>
    <div>
      <h2>Edit {{ song.title }}</h2>
      <SongForm :edit="true" :song="song" :updateSong="updateSong" />
    </div>
  </Layout>
</template>

<script>
import { mapState } from "vuex";
import SongForm from "@/forms/SongForm";
export default {
  components: {
    SongForm
  },
  methods: {
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
  },
  computed: mapState({
    song: state => state.song
  })
};
</script>

<style></style>
