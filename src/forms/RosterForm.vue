<template>
  <fragment>
    <form>
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
  </fragment>
</template>

<script>
export default {
  props: {
    roster: {
      type: Object
    },
    newSquad: {
      type: Object,
      required: true
    },
    newPlayer: {
      type: Object,
      required: true
    },
    addRoster: {
      type: Function,
      required: true
    },
    addSquad: {
      type: Function,
      required: true
    },
    removeSquad: {
      type: Function,
      required: true
    },
    addPlayer: {
      type: Function,
      required: true
    },
    removePlayer: {
      type: Function,
      required: true
    },
    selectedSquad: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
