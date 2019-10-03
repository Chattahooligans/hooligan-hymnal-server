<template>
  <Layout>
    <h2>Create New Song</h2>
    {{ song.title }}
    <SongForm :song="song" :addSong="addSong" :resetForm="resetForm" />
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import SongForm from "@/forms/SongForm";
export default {
  data() {
    return {
      song: {
        title: "",
        lyrics: "",
        instructions: "",
        category: "",
        delete_local: "",
        reference_title: "",
        reference_link: "",
        sheetMusicLink: "",
        player_id: "",
        legend: "",
        capoSignal: ""
      }
    };
  },
  components: {
    Layout,
    SongForm
  },
  methods: {
    addSong() {
      this.$axios
        .post("/api/song", this.song)
        .then(({ data }) => console.log(data))
        .catch(res => console.log(res));
    },
    resetForm() {
      this.song = {
        title: "",
        lyrics: "",
        instructions: "",
        category: "",
        delete_local: "",
        reference_title: "",
        reference_link: "",
        sheetMusicLink: "",
        player_id: "",
        legend: "",
        capoSignal: ""
      };
    }
  }
};
</script>

<style></style>
