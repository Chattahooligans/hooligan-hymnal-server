<template>
  <Layout>
    <h2>Edit {{ songbook.songbook_title }}</h2>
    <form
      method="POST"
      @submit.prevent=""
      class="border rounded shadow p-3 mb-3"
    >
      <div class="mb-3 flex flex-col">
        <BaseInput
          label="Songbook Title"
          name="songbook-title"
          type="text"
          placeholder="Songbook Title"
          v-model="songbook.songbook_title"
          :required="true"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          label="Organization"
          name="orginization"
          type="text"
          placeholder="organization"
          v-model="songbook.organization"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          label="Description"
          name="description"
          type="text"
          placeholder="description"
          v-model="songbook.description"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          label="Front Cover"
          name="front-cover"
          type="text"
          placeholder="Front Cover"
          v-model="songbook.front_cover"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="text"
          label="Back Cover"
          name="back-cover"
          placeholder="Back Cover"
          v-model="songbook.back_cover"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <span class="block font-semibold">Chapters</span>
        <ul v-if="songbook.chapters.length">
          <li v-for="chapter in songbook.chapters" :key="chapter._id">
            {{ chapter.chapter_title }}
            <ul v-if="chapter.songs.length">
              <template>
                Songs
              </template>
              <li v-for="song in chapter.songs" :key="song._id">
                {{ song.hint }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn bg-blue-700 text-white">
          Update {{ songbook.songbook_title }}
        </button>
      </div>
    </form>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  // TODO: IMPLEMENT MULTISELECT FOR SONGS
  data() {
    return {
      book: null,
      loading: false,
      new_chapter: {
        chapter_title: "",
        songs: []
      },
      new_song: {
        _id: "",
        featured: false,
        hint: ""
      }
    };
  },
  created() {
    this.getBook();
  },
  methods: {
    getBook() {
      this.loading = true;
      const { id } = this.$route.params;
      axios
        .get(`/api/songbook/${id}`)
        .then(({ data }) => {
          this.book = data;
          this.loading = false;
        })
        .catch(err => console.log(err));
    },
    addChapter() {
      this.songbook.chapters = this.songbook.chapters.concat(this.new_chapter);
      this.new_chapter = {
        chapter_title: "",
        songs: []
      };
    },
    removeChapter(chapter) {
      this.songbook.chapters = this.songbook.chapters.filter(
        ch => ch.chapter_title !== chapter.chapter_title
      );
    },
    addSong() {
      const index = event.target.children[0].querySelector("select").value;
      this.songbook.chapters[index].songs = this.songbook.chapters[
        index
      ].songs.concat(this.new_song);
      this.new_song = {
        _id: "",
        featured: false,
        hint: ""
      };
    },
    removeSong(index, targetSong) {
      this.songbook.chapters[index].songs = this.songbook.chapters[
        index
      ].songs.filter(song => targetSong._id !== song._id);
    },
    submitSongBook() {
      axios
        .post("/api/songbook", this.songbook)
        .then(({ data }) => {
          console.log(data);
          // this.$swal("Songbook Created");
        })
        .catch(err => console.log(err.response));
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters(["songbook"])
  }
};
</script>

<style></style>
