<template>
  <Layout>
    <h2>All Song Books</h2>
    <router-link :to="{ name: 'create-song-book' }">Add Songbook</router-link>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul v-if="books.length">
        <li v-for="book in books" :key="book._id">{{ book }}</li>
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
    },
    addSong() {
      this.new_chapter.songs = this.new_chapter.songs.concat(this.new_song);
      this.new_song = {
        _id: null,
        featured: null,
        hint: null
      };
    },
    removeSong(song) {
      this.new_chapter.songs.filter(s => s._id !== song._id);
      // this.new_chapter.songs = this.new_chapter.songs.filter(
      //   s => s._id !== song._id
      // );
    }
  }
};
</script>

<style></style>
