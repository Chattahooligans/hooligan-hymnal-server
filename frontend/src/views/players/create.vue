<template>
  <Layout>
    <h2>Create {{ player.name ? player.name : "Player" }}</h2>
    <PlayerForm :formMethod="addPlayer" :cancel="clearForm" :player="player" />
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import PlayerForm from "@/forms/PlayerForm";
import axios from "axios";
export default {
  components: {
    Layout,
    PlayerForm
  },
  data() {
    return {
      player: {
        name: "",
        flag: "",
        squadNumber: "",
        position: "",
        team: "",
        bio: "",
        thumbnail: "",
        image: "",
        twitter: "",
        instagram: ""
      }
    };
  },
  methods: {
    addPlayer() {
      axios
        .post(`/api/players`, this.player)
        .then(({ data }) => {
          this.$router.push(`/players/${data._id}`);
        })
        .catch(err => console.log(err.response));
    },
    clearForm() {
      this.player = {
        name: "",
        flag: "",
        squadNumber: "",
        position: "",
        team: "",
        bio: "",
        thumbnail: "",
        image: "",
        twitter: "",
        instagram: ""
      };
    }
  }
};
</script>

<style></style>
