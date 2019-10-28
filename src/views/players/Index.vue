<template>
  <Layout>
    <h2>All Players</h2>
    <router-link class="btn mb-3" to="/players/create">Add Player</router-link>
    <div>
      <ul v-if="players">
        <li
          v-for="player in players"
          :key="player._id"
          class="flex justify-start items-center"
        >
          <img
            class="h-50px w-50px rounded-full mr-3"
            :src="player.thumbnail"
            v-if="player.thumbnail"
            :alt="`${player.name} thumbnail`"
          />
          <router-link class="inline-block" :to="`/players/${player._id}`">
            {{ player.name }}
          </router-link>
        </li>
      </ul>
      <h3 v-else>No Players</h3>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["players"])
};
</script>

<style></style>
