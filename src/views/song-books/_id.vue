<template>
  <Layout>
    <template v-if="loading">
      <h2>Loading...</h2>
    </template>
    <template v-else>
      <h2>{{ book.songbook_title }}</h2>
    </template>
  </Layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      book: null,
      loading: false
    };
  },
  created() {
    this.getBook();
  },
  methods: {
    getBook() {
      const { id } = this.$route.params;
      this.loading = true;
      axios
        .get(`/api/songbook/${id}`)
        .then(({ data }) => {
          this.book = data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style></style>
