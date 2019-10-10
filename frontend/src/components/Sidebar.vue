<template>
  <aside class="bg-gray-300 -mx-3 px-3 py-4 md:w-1/3 sm:w-100 md:block sm:hidden" v-if="loggedIn">
    <nav style="display:flex; flex-direction:column">
      <template v-if="user.songbookAllowed">
        <router-link class="block p-2" to="/songs">Songs</router-link>
        <router-link class="block p-2" to="/song-books">Song Books</router-link>
      </template>
      <template v-if="user.rosterAllowed">
        <router-link class="block p-2" to="/players">Players</router-link>
        <router-link class="block p-2" to="/rosters">Rosters</router-link>
        <router-link class="block p-2" to="/goalkeeper-nickname">Goalkeeper Nickname</router-link>
      </template>
      <template v-if="user.foesAllowed">
        <router-link class="block p-2" to="/foes">Foes</router-link>
      </template>
      <template v-if="user.usersAllowed">
        <router-link class="block p-2" to="/users">Users</router-link>
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
