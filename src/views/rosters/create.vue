<template>
  <Layout>
    <h2>Create</h2>
    <!-- <RosterForm
      :newSquad="newSquad"
      :newPlayer="newPlayer"
      :roster="roster"
      :addRoster="addRoster"
      :addSquad="addSquad"
      :removeSquad="removeSquad"
      :addPlayer="addPlayer"
      :removePlayer="removePlayer"
      :selectedSquad="selectedSquad"
    /> -->
    <form @submit.prevent="addRoster" method="POST">
      <div>
        <label for="rosterTitle">Roster Title</label>
        <input
          type="text"
          name="rosterTitle"
          id="rosterTitle"
          v-model="roster.rosterTitle"
          placeholder="rosterTitle"
        />
      </div>
      <div>
        <label for="season">Season</label>
        <input
          type="text"
          name="season"
          id="season"
          v-model="roster.season"
          placeholder="Season"
        />
      </div>
      <div v-if="roster.squads.length">
        <h3>Squads</h3>
        <div v-for="(squad, index) in roster.squads" :key="index">
          {{ squad.squadTitle }} -
          <button type="button" @click="removeSquad(index)">Remove</button>
          <ul v-if="squad.players">
            <li v-for="(player, i) in squad.players" :key="i">
              {{ player.hint }} -
              <button
                type="button"
                @click.prevent="removePlayer(index, player._id)"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button type="submit">Add Roster</button>
      </div>
    </form>

    <form @submit.prevent="addSquad">
      <div>
        <label for="squadTitle">Squad Title</label>
        <input
          type="text"
          name="squadTitle"
          id="squadTitle"
          v-model="newSquad.squadTitle"
        />
      </div>
      <div>
        <button type="submit">Add Squad</button>
      </div>
    </form>

    <form v-if="roster.squads.length" @submit.prevent="addPlayer">
      <div>
        <label for="squad">Select Squad</label>
        <select name="squad" id="squad" v-model="selectedSquad">
          <option
            v-for="(squad, index) in roster.squads"
            :key="index"
            :value="index"
          >
            {{ squad.squadTitle }}
          </option>
        </select>
      </div>
      <div>
        <label for="player_Id">Player ID</label>
        <input
          type="text"
          name="player_id"
          id="player_id"
          v-model="newPlayer._id"
        />
      </div>
      <div>
        <label for="player_hint">Hint</label>
        <input
          type="text"
          name="player_hint"
          id="player_hint"
          v-model="newPlayer.hint"
        />
      </div>
      <div>
        <button type="submit">Add Player</button>
      </div>
    </form>
  </Layout>
</template>

<script>
import axios from "axios";
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
  components: {},
  methods: {
    addRoster() {
      axios
        .post(`/api/roster`, {
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
      this.roster.squads[this.selectedSquad].players = this.roster.squads[
        this.selectedSquad
      ].players.concat(this.newPlayer);
      // this.roster.squads[this.selectedSquad].players = this.roster.squads[
      //   this.selectedSquad
      // ].players.concat(this.newPlayer);
      this.selectedSquad = null;
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
