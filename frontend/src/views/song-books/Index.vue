<template>
  <div>
    <h2>All Song Books</h2>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul>
        <li v-for="book in books" :key="book._id">{{ book }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      books: []
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      this.loading = true;
      this.$axios
        .get("/api/songbook")
        .then(({ data }) => {
          this.loading = false;
          this.books = data;
        })
        .catch(res => console.log(res));
    }
  }
};
</script>

<style></style>
