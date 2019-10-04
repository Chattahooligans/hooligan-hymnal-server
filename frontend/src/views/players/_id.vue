<template>
  <Layout>
    <div v-if="loading">
      <h2>Loading...</h2>
    </div>
    <div v-else>
      <h2>
        {{ player.name }} -
        <router-link :to="`/players/${player._id}/edit`">Edit</router-link>
      </h2>
      <div>
        <h3>Bio</h3>
        <div v-html="linebreaks" />
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import axios from "axios";

export default {
  components: {
    Layout
  },
  data() {
    return {
      loading: false,
      player: null
    };
  },
  created() {
    this.getPlayer();
  },
  methods: {
    getPlayer() {
      const { id } = this.$route.params;
      this.loading = true;
      axios
        .get(`/api/players/${id}`)
        .then(({ data }) => {
          this.loading = false;
          this.player = data;
        })
        .catch(() => {
          this.loading = false;
          this.$router.push("/404");
        });
    }
  },
  computed: {
    linebreaks() {
      return this.player.bio.replace("\n", "<br />");
    }
  }
};
</script>

<style></style>
