<template>
  <Layout>
    <h2>{{ song.title }}</h2>
    <router-link :to="{ name: 'edit-song', params: { id: song._id } }"
      >Edit</router-link
    >
  </Layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    song: state => state.song
  })
};
</script>

<style></style>
