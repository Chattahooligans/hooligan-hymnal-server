<template>
  <Layout>
    <h2>{{ song.title }}</h2>
    <router-link :to="{ name: 'edit-song', params: { id: song._id } }"
      >Edit</router-link
    >
    <br />
    <button
      class="bg-red-700 text-white px-3 py-2 rounded"
      type="button"
      @click="deleteSong"
    >
      Delete {{ song.title }}
    </button>
  </Layout>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import NProgress from "nprogress";
export default {
  methods: {
    deleteSong() {
      NProgress.start();
      axios
        .delete(`/api/song/${this.song._id}`)
        .then(() => {
          NProgress.done();
          this.$swal({
            title: `${this.song.title} was successfully deleted`,
            type: "success"
          }).then(() => {
            this.$router.push({ name: "all-songs" });
          });
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  computed: mapState({
    song: state => state.song
  })
};
</script>

<style></style>
