<template>
  <Layout>
    <template v-if="loading">
      Loading...
    </template>
    <template v-else>
      <h2>Edit Player</h2>
      <PlayerForm
        :player="player"
        :formMethod="updateUser"
        :edit="true"
        :cancel="cancel"
      />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import axios from "axios";
import PlayerForm from "@/forms/PlayerForm";
export default {
  components: {
    Layout,
    PlayerForm
  },
  data() {
    return {
      loading: false,
      player: {}
    };
  },
  created() {
    this.getPlayer();
  },
  methods: {
    getPlayer() {
      this.loading = true;
      const { id } = this.$route.params;
      axios
        .get(`/api/players/${id}`)
        .then(({ data }) => {
          this.loading = false;
          this.player = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    updateUser() {
      axios
        .post(`/api/players/${this.player._id}`)
        .then(() => {
          this.router.push(`/players/${this.player._id}`);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
