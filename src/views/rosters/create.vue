<template>
  <Layout>
    <div class="shadow-xl p-3 mt-3">
      <h2 class="font-semibold text-2xl mb-3 border-b">Create</h2>
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
        <div class="flex flex-col mb-3">
          <BaseInput
            label="Roster Title"
            name="rosterTitle"
            placeholder="Roster Title"
            v-model="roster.rosterTitle"
            type="string"
            :required="true"
          />
        </div>
        <div class="flex flex-col mb-3">
          <BaseInput
            name="season"
            label="Season"
            type="text"
            placeholder="Season"
            v-model="roster.season"
          />
        </div>
        <div v-if="roster.squads.length">
          <h3 class="font-semibold text-xl mb-3 border-b">Squads</h3>
          <div
            class="mb-3"
            v-for="(squad, index) in roster.squads"
            :key="index"
          >
            <h3 class="text-xl inline-block">{{ squad.squadTitle }}</h3>
            -
            <button
              type="button"
              class="p-1 px-2 rounded bg-red-600 text-white"
              @click="removeSquad(index)"
            >
              Remove
            </button>
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
        <div class="mb-3">
          <button
            class="px-3 py-2 rounded bg-blue-600 text-white"
            type="submit"
          >
            Add Roster
          </button>
        </div>
      </form>

      <form @submit.prevent="addSquad">
        <div class="flex flex-col mb-3">
          <BaseInput
            name="squadTitle"
            type="text"
            label="Squad Title"
            placeholder="Squad Title"
            v-model="newSquad.squadTitle"
            :required="true"
          />
        </div>
        <div class="mb-3">
          <button
            class="px-3 py-2 rounded bg-green-600 text-white"
            type="submit"
          >
            Add Squad
          </button>
        </div>
      </form>

      <form v-if="roster.squads.length" @submit.prevent="addPlayer">
        <h3 class="font-smaller font-semibold mb-2">Add Player</h3>
        <div class="flex flex-col mb-3">
          <label class="font-dark font-lg mb-2" for="squad">Select Squad</label>
          <select
            class="p-6 bg-white border h-10"
            name="squad"
            id="squad"
            v-model="selectedSquad"
          >
            <option
              class="h-10"
              v-for="(squad, index) in roster.squads"
              :key="index"
              :value="index"
            >
              {{ squad.squadTitle }}
            </option>
          </select>
        </div>
        <div class="flex flex-col mb-3">
          <BaseInput
            type="text"
            label="Player ID"
            placeholder="Player ID"
            name="player_id"
            :required="true"
            v-model="newPlayer._id"
          />
        </div>
        <div class="flex flex-col mb-3">
          <BaseInput
            type="text"
            label="Player Name"
            name="player_hint"
            :required="true"
            placeholder="Player Name"
            v-model="newPlayer.hint"
          />
        </div>
        <div>
          <button class="px-3 py-2 bg-blue-600 text-white" type="submit">
            Add Player
          </button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script>
import BaseInput from "@/components/BaseInput";
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
  components: {
    BaseInput
  },
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
      this.selectedSquad = null;
      this.newPlayer = {
        _id: "",
        hint: ""
      };
    },
    removePlayer(index, id) {
      this.roster.squads[index].players = this.roster.squads[
        index
      ].players.filter(player => player._id !== id);
    }
  }
};
</script>

<style></style>
