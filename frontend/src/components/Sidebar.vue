<template>
  <aside v-if="isLoggedIn">
    <nav style="display:flex; flex-direction:column">
      <router-link to="/songs">Songs</router-link>
      <router-link to="/song-books">Song Books</router-link>
      <router-link to="/players">Players</router-link>
      <router-link to="/rosters">Rosters</router-link>
      <router-link to="/goalkeeper-nickname">Goalkeeper Nickname</router-link>
      <router-link to="/foes">Foes</router-link>
      <router-link to="/users">Users</router-link>
    </nav>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {},
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

<style></style>
