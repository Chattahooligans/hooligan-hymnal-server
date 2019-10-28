<template>
  <Layout>
    <h2>{{ roster.rosterTitle }}</h2>
    <div>
      <router-link :to="{ name: 'edit-roster', params: { id: roster._id } }" class="btn bg-green-700 text-white mr-3">Edit {{ roster.rosterTitle }}</router-link>
      <button type="button" @click="deleteRoster" class="btn bg-red-700 text-white">Delete {{ roster.rosterTitle }}</button>
    </div>
    <h3>Season: {{ roster.season }}</h3>
    <div>
      <h3>Players</h3>
      <ul>
        <li v-for="player in roster.players" :key="player._id">
          <router-link :to="{ name: 'get-player', params: { id: player._id } }">{{ player.name }}</router-link>
        </li>
      </ul>
    </div>
    <div>
      <h3>Active Roster: {{ roster.active ? "Active" : "Not Active" }}</h3>
    </div>
    <div>
      <h3>Default Roster: {{ roster.default ? "Default" : "Not Default" }}</h3>
    </div>
    <!-- {{ roster }} -->
  </Layout>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"
export default {
  methods: {
    deleteRoster() {
      axios.delete(`/api/roster/${this.roster._id}`).then(({ data }) => {
        console.log(data)
        this.$swal({
          title: `${this.roster.rosterTitle} was successfully deleted`,
          type: 'success'
        }).then(() => {
          this.$router.push({ name: 'all-rosters' });
        })
      }).catch((err) => {
        this.$swal({
          title: "There was an issue please try again",
          type: "error"
        })
      })
    }
  },
  computed: {
    ...mapGetters(["roster"])
  }
};
</script>

<style></style>
