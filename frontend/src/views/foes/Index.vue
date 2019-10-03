<template>
  <Layout>
    <h2>Foes</h2>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul>
        <li v-for="foe in foes" :key="foe._id">
          {{ JSON.stringify(foe) }}
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
export default {
  data() {
    return {
      loading: false,
      foes: []
    };
  },
  components: {
    Layout
  },
  mounted() {
    this.getFoes();
  },
  methods: {
    getFoes() {
      this.loading = true;
      this.$axios
        .get("/api/foes")
        .then(({ data }) => {
          this.loading = false;
          this.foes = data;
        })
        .catch(res => console.log(res));
    }
  }
};
</script>

<style></style>
