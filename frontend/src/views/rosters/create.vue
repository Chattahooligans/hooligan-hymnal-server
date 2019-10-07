<template>
  <Layout>
    <h2>Create</h2>
    <RosterForm
      :newSquad="newSquad"
      :newPlayer="newPlayer"
      :roster="roster"
      :addRoster="addRoster"
      :addSquad="addSquad"
      :removeSquad="removeSquad"
      :addPlayer="addPlayer"
      :removePlayer="removePlayer"
      :selectedSquad="selectedSquad"
    />
  </Layout>
</template>

<script>
import axios from "axios";
import RosterForm from "@/forms/RosterForm";
export default {
  data() {
    return {
      roster: {
        rosterTitle: "",
        season: "",
        squads: []
      },
      newSquad: {
        squadTitle: "",
        players: []
      },
      newPlayer: {
        _id: "",
        hint: ""
      },
      selectedSquad: ""
    };
  },
  components: {
    RosterForm
  },
  methods: {
    addRoster() {
      axios
        .post(`/api/rosters`, {
          rosterTitle: this.rosterTitle,
          season: this.season,
          squads: this.squads
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    addSquad() {
      this.roster.squads = this.roster.squads.concat(this.newSquad);
      this.newSquad = {
        squadTitle: "",
        players: []
      };
    },
    removeSquad(index) {
      this.roster.squads = this.roster.squads.filter((squad, i) => i !== index);
    },
    addPlayer() {
      this.squads[this.selectedSquad].players = this.squads[
        this.selectedSquad
      ].players.concat(this.newPlayer);
      this.selectedSquad = "";
      this.newPlayer = {
        _id: "",
        hint: ""
      };
    },
    removePlayer(index, id) {
      this.squads[index].players = this.squads[index].players.filter(
        player => player._id !== id
      );
    }
  }
};
</script>

<style></style>
