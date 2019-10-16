<template>
  <Layout>
    <h2>Goalkeepers Nickname</h2>
    <router-link :to="{ name: 'goalkeeper-nickname-create' }">Add Nickname</router-link>
    <ul v-if="goalkeepers.length">
      <li v-for="keeper in goalkeepers" :key="keeper._id">
        <router-link :to="{ name: 'get-nickname', params: { id: keeper._id } }">{{ keeper }}</router-link>
      </li>
    </ul>
    <h3 v-else>No Goalkeepers</h3>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["goalkeepers"])
  }
};
</script>

<style></style>
