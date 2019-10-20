<template>
  <Layout>
    <h2>All Songs</h2>
    <router-link
      class="btn bg-green-700 text-white mb-3"
      :to="{ name: 'create-song' }"
      >Add Song</router-link
    >
    <div v-if="!songs">
      <h3>No Songs Currently</h3>
    </div>
    <div>
      <ul class="list-none m-0 p-0 flex flex-wrap justify-around">
        <li
          class="m-0 shadow flex-auto rounded m-2 max-w-xl md:w-1/3 hover:shadow-xl hover:font-bold"
          v-for="song in songs"
          :key="song._id"
        >
          <router-link class="block p-3" :to="`/songs/${song._id}`">{{
            song.title
          }}</router-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["songs"])
  }
};
</script>

<style></style>
