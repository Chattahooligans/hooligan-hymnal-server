<template>
  <Layout>
    <h2>All Songs</h2>
    <router-link :to="{ name: 'create-song' }">Add Song</router-link>
    <div v-if="!songs">
      <h3>No Songs Currently</h3>
    </div>
    <div>
      <ul>
        <li v-for="song in songs" :key="song._id">
          <router-link :to="`/songs/${song._id}`">{{ song.title }}</router-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  computed: mapState({
    songs: state => state.songs
  })
};
</script>

<style></style>
