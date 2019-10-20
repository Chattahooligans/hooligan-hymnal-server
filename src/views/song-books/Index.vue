<template>
  <Layout>
    <h2>All Song Books</h2>
    <router-link
      class="btn bg-green-700 text-white mb-3"
      :to="{ name: 'create-song-book' }"
      >Add Songbook</router-link
    >
    <div>
      <ul
        v-if="songbooks.length"
        class="list-none p-0 m-0 flex flex-wrap justify-between"
      >
        <li
          v-for="book in songbooks"
          :key="book._id"
          class="m-0 p-0 border rounded shadow hover:shadow-lg"
        >
          <router-link
            class="block p-3"
            :to="{ name: 'view-song-book', params: { id: book._id } }"
            >{{ book.songbook_title }}</router-link
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
