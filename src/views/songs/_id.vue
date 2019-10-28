<template>
  <Layout>
    <h2>{{ song.title }}</h2>
    <router-link
      class="btn bg-green-700 text-white mb-3"
      :to="{ name: 'edit-song', params: { id: song._id } }"
      >Edit</router-link
    >
    <div class="border rounded shadow p-3">
      <section>
        <h3>Lyrics</h3>
        <div v-html="song.lyrics"></div>
      </section>
      <section>
        <h3>Instructions</h3>
        <div>
          {{ song.instructions ? song.instructions : "No Instructions" }}
        </div>
      </section>
      <section>
        <h3>Category:</h3>
        <div>{{ song.category ? song.category : "No Category" }}</div>
      </section>
      <section>
        <h3>Delete Local?</h3>
        <div>
          {{ song.delete_local ? song.delete_local : "None" }}
        </div>
      </section>
      <section>
        <h3>Reference Title</h3>
        <div>
          {{
            song.reference_title ? song.reference_title : "No Reference Title"
          }}
        </div>
      </section>
      <section>
        <h3>Reference Link</h3>
        <div>
          <a
            v-if="song.reference_link"
            :href="song.reference_link"
            target="_blank"
            rel="noreferrer"
            >{{ song.reference_link }}</a
          >
          <span v-else>No reference link</span>
        </div>
      </section>
      <section>
        <h3>Sheet Music Link</h3>
        <div>
          <a
            v-if="song.sheetMusicLink"
            :href="song.sheetMusicLink"
            target="_blank"
            rel="noreferrer"
            >{{ song.sheetMusicLink }}</a
          >
          <span v-else>No Sheet Music Link</span>
        </div>
      </section>
      <section>
        <h3>Player ID</h3>
        <div>
          {{ song.player_id ? song.player_id : "No Player ID" }}
        </div>
      </section>
      <section>
        <h3>Legend</h3>
        <div>
          {{ song.legend ? song.legend : "No Song Legend" }}
        </div>
      </section>
      <section class="border-0">
        <h3>Capo Signal</h3>
        <div>
          {{ song.capoSignal ? song.capoSignal : "No Capo Signal" }}
        </div>
      </section>
    </div>
    <br />
    <button
      class="bg-red-700 text-white px-3 py-2 rounded"
      type="button"
      @click="deleteSong"
    >
      Delete {{ song.title }}
    </button>
  </Layout>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import NProgress from "nprogress";
export default {
  methods: {
    deleteSong() {
      NProgress.start();
      axios
        .delete(`/api/song/${this.song._id}`)
        .then(() => {
          NProgress.done();
          this.$swal({
            title: `${this.song.title} was successfully deleted`,
            type: "success"
          }).then(() => {
            this.$router.push({ name: "all-songs" });
          });
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  computed: mapState({
    song: state => state.song
  })
};
</script>

<style>
section {
  @apply mb-3 border-b;
}
section h3 {
  @apply border-b pb-1 mb-1;
}
section h3 + div {
  @apply mb-3;
}
</style>
