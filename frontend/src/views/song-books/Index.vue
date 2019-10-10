<template>
  <Layout>
    <h2>All Song Books</h2>
    <router-link :to="{ name: 'create-song-book' }">Add Songbook</router-link>
    <div>
      <ul v-if="songbooks.length">
        <li v-for="book in songbooks" :key="book._id">
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
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["songbooks"]) }
};
</script>

<style></style>
