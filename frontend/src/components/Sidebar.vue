<template>
  <aside v-if="loggedIn">
    <nav style="display:flex; flex-direction:column">
      <template v-if="user.songbookAllowed">
        <router-link to="/songs">Songs</router-link>
        <router-link to="/song-books">Song Books</router-link>
      </template>
      <template v-if="user.rosterAllowed">
        <router-link to="/players">Players</router-link>
        <router-link to="/rosters">Rosters</router-link>
        <router-link to="/goalkeeper-nickname">Goalkeeper Nickname</router-link>
      </template>
      <template v-if="user.foesAllowed">
        <router-link to="/foes">Foes</router-link>
      </template>
      <template v-if="user.usersAllowed">
        <router-link to="/users">Users</router-link>
      </template>
    </nav>
  </aside>
</template>

<script>
import { authComputed, userInfo } from "../vuex/helpers";
export default {
  methods: {},
  computed: {
    ...authComputed,
    ...userInfo
  }
};
</script>

<style></style>
