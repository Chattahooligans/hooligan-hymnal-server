<template>
  <aside
    class="bg-gray-300 px-3 py-4 md:w-64 sm:w-100 md:block"
    v-if="loggedIn"
  >
    <nav class="flex flex-col -mx-3 md:block hidden">
      <template v-if="user.pushNotificationsAllowed">
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          :to="{ name: 'all-push-tokens' }"
          >Push Tokens</router-link
        >
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          :to="{ name: 'all-notifications' }"
          >Notifications</router-link
        >
      </template>
      <template v-if="user.songbookAllowed">
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          to="/songs"
          >Songs</router-link
        >
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          to="/song-books"
          >Song Books</router-link
        >
      </template>
      <template v-if="user.rosterAllowed">
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          to="/players"
          >Players</router-link
        >
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          to="/rosters"
          >Rosters</router-link
        >
        <!-- <router-link class="block p-3" to="/goalkeeper-nickname"
          >Goalkeeper Nickname</router-link
        > -->
      </template>
      <!-- <template v-if="user.foesAllowed">
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          to="/foes"
          >Foes</router-link
        >
      </template> -->
      <template v-if="user.usersAllowed">
        <router-link
          class="block p-3 hover:bg-gray-600 hover:text-white"
          :active-class="'bg-gray-600 text-white'"
          to="/users"
          >Users</router-link
        >
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
