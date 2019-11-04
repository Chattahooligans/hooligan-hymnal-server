<template>
  <Layout>
    <h2 class="mb-3 font-semibold text-xl mt-2">
      Create {{ song.title ? song.title : "New Song" }}
    </h2>
    <form method="POST" @submit.prevent="addSong">
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Song Title"
          name="song-title"
          placeholder="Song title"
          arPlaceholder="Enter song title"
          :required="true"
          v-model="song.title"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="textarea"
          name="lyrics"
          label="Lyrics"
          v-model="song.lyrics"
        />
      </div>
      <!-- <base-rich-text label="Lyrics" v-model="song.lyrics" /> -->
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Instructions"
          name="instructions"
          placeholder="Instructions"
          arPlaceholder="Song Instructions"
          v-model="song.instructions"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Category"
          name="category"
          placeholder="Category"
          arPlaceholder="Category of song"
          v-model="song.category"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="date"
          label="Delete Local"
          name="delete_local"
          v-model="song.delete_local"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Reference Title"
          name="reference_title"
          placeholder="Reference Title"
          arPlaceholder="Song Reference Title"
          v-model="song.reference_title"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="url"
          label="Reference Link"
          name="reference_link"
          arPlaceholder="Song Reference Link"
          placeholder="Song Link"
          v-model="song.reference_link"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="url"
          label="Sheet Music Link"
          name="sheetMusicLink"
          arPlaceholder="Song Sheet Music Link"
          placeholder="Song Link"
          v-model="song.sheetMusicLink"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Player ID"
          name="player_id"
          arPlaceholder="Song Player ID"
          placeholder="Player ID"
          v-model="song.player_id"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Legend"
          name="legend"
          arPlaceholder="Song Legend"
          placeholder="Legend"
          v-model="song.legend"
        />
      </div>
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Capo Signal"
          name="capoSignal"
          arPlaceholder="Song Capo Signal"
          placeholder="Capo Signal"
          v-model="song.capoSignal"
        />
      </div>
      <div class="mb-3">
        <button
          class="px-3 py-2 rounded bg-blue-700 text-white mr-3"
          type="submit"
        >
          Add {{ song.title ? song.title : "New Song" }}
        </button>
        <button
          class="px-3 py-2 rounded bg-red-700 text-white"
          type="reset"
          @click.prevent="resetForm"
        >
          Reset
        </button>
      </div>
    </form>
  </Layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      song: {
        title: "",
        lyrics: "",
        instructions: "",
        category: "",
        delete_local: "",
        reference_title: "",
        reference_link: "",
        sheetMusicLink: "",
        player_id: "",
        legend: "",
        capoSignal: ""
      }
    };
  },
  methods: {
    addSong() {
      axios
        .post("/api/song", this.song)
        .then(() => {
          this.$swal({
            title: `${this.song.title} was created`,
            type: "success"
          }).then(() => {
            this.$router.push({ name: "all-songs" });
          });
        })
        .catch(({ response }) => {
          this.$swal({
            title: `${response}`
          });
        });
    },
    resetForm() {
      this.song = {
        title: "",
        lyrics: "",
        instructions: "",
        category: "",
        delete_local: "",
        reference_title: "",
        reference_link: "",
        sheetMusicLink: "",
        player_id: "",
        legend: "",
        capoSignal: ""
      };
    }
  }
};
</script>

<style></style>
