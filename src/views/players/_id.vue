<template>
  <Layout>
    <img
      :src="player.image"
      :alt="`${player} full image`"
      v-if="player.image"
      class="mb-3 max-w-md mx-auto mt-3 rounded shadow-md"
    />
    <img
      v-else-if="!player.image && player.thumbnaul"
      :src="player.thumbnail"
      class="h-50px w-50px rounded-full shadow-md"
      :alt="`${player.name} thumbnail`"
    />
    <h2>
      {{ player.name }} -
      <router-link :to="`/players/${player._id}/edit`">Edit</router-link>
    </h2>
    <div>
      <h3>Flag: {{ player.flag }}</h3>
    </div>
    <div>
      <h3>Bio</h3>
      <div v-html="player.bio" />
    </div>
    <div>
      <button @click="deletePlayer">Delete {{ player.name }}</button>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  methods: {
    deletePlayer() {
      const { id } = this.$route.params;
      this.$swal({
        title: `Are you sure you want to delete?`,
        text: `${this.player.name}`,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios.delete(`/api/players/${id}`).then(res => {
            this.$router.push({ name: "all-players" });
            // console.log(res);
            // // this.$swal({
            // //   title: `${this.player.name} was deleted succesfully`
            // // });
          });
        } else {
          console.log("cancel");
        }
      });
    }
  },
  computed: {
    ...mapGetters(["player"])
  }
};
</script>

<style></style>
