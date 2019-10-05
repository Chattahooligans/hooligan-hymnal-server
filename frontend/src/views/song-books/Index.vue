<template>
  <Layout>
    <h2>All Song Books</h2>
    <router-link :to="{ name: 'create-song-book' }">Add Songbook</router-link>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul v-if="books.length">
        <li v-for="book in books" :key="book._id">
          <router-link
            :to="{ name: 'view-song-book', params: { id: book._id } }"
            >{{ book.songbook_title }}</router-link
          >
          -
          <router-link
            :to="{ name: 'edit-song-book', params: { id: book._id } }"
            >Edit</router-link
          >
        </li>
      </ul>
      <h3 v-else>No Song Books</h3>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      books: []
    };
  },
  components: {
    Layout
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      this.loading = true;
      axios
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
