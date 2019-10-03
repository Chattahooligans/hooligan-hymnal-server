<template>
  <form action="POST" @submit.prevent="addSong">
    <div>
      <label for="title">Title</label>
      <input
        type="string"
        name="title"
        id="title"
        placeholder="Song Title"
        v-model="song.title"
      />
    </div>
    <div>
      <label for="lyrics">Lyrics</label>
      <textarea
        name="lyrics"
        id="lyrics"
        placeholder="Song Lyrics"
        v-model="song.lyrics"
      />
    </div>
    <div>
      <label for="instructions">Instructions</label>
      <input
        type="text"
        name="instructions"
        id="instructions"
        v-model="song.instructions"
        placeholder="Instructions"
      />
    </div>
    <div>
      <label for="category">Category</label>
      <input
        type="text"
        name="category"
        id="category"
        v-model="song.category"
        placeholder="Song Categorey"
      />
    </div>
    <div>
      <label for="reference_title">Reference Title</label>
      <input
        type="text"
        name="reference_title"
        id="reference_title"
        placeholder="Song Reference Title"
        v-model="song.reference_title"
      />
    </div>
    <div>
      <label for="reference_link">Reference Link</label>
      <input
        type="text"
        name="refrerence_link"
        id="refrerence_link"
        v-model="song.reference_link"
        placeholder="Song Reference Link"
      />
    </div>
    <div>
      <label for="sheetMusicLink">Sheet Music Link</label>
      <input
        type="text"
        name="sheetMusticLink"
        id="sheetMusicLink"
        v-model="song.sheetMusicLink"
        placeholder="Song Sheet Music Link"
      />
    </div>
    <div>
      <label for="player_id">Player ID</label>
      <input
        type="text"
        name="player_id"
        id="player_id"
        v-model="song.player_id"
        placeholder="Player ID"
      />
    </div>
    <div>
      <label for="legend">Legend</label>
      <input
        type="text"
        name="legend"
        id="legend"
        placeholder="Legends"
        v-model="song.legend"
      />
    </div>
    <div>
      <label for="capoSignal">Capo Signal</label>
      <input
        type="text"
        name="capoSignal"
        id="capoSignal"
        placeholder="Capo Signal"
        v-model="song.capoSignal"
      />
    </div>
    <div>
      <label for="delete_local">Delete Local</label>
      <input
        type="text"
        name="delete_local"
        id="delete_local"
        placeholder="Delete Local"
        v-model="song.delete_local"
      />
    </div>
    <div>
      <template v-if="!edit">
        <button type="submit">
          Add {{ song.title ? song.title : "Song" }}
        </button>
      </template>
      <template v-else>
        <button type="submit">Update {{ song.title }}</button>
      </template>
    </div>
    <div>
      <template v-if="!edit">
        <button @click.prevent="resetForm" type="reset">Reset</button>
      </template>
      <template v-else>
        <button
          @click="
            {
              this.$router.go(-1);
            }
          "
        >
          Cancel
        </button>
      </template>
    </div>
  </form>
</template>

<script>
export default {
  props: ["song", "addSong", "updateSong", "resetForm", "edit"]
};
</script>
