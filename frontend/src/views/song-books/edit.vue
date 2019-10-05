<template>
  <Layout>
    <template v-if="loading">
      <h2>Loading...</h2>
    </template>
    <template v-else>
      <h2>Edit {{ book.songbook_title }}</h2>
      <SongBookForm
        :songbook="book"
        :chapter="new_chapter"
        :song="new_song"
        :addChapter="addChapter"
        :removeChapter="removeChapter"
        :addSong="addSong"
        :removeSong="removeSong"
        :formSubmit="submitSongBook"
        :edit="true"
        :cancel="cancel"
      />
    </template>
  </Layout>
</template>

<script>
import axios from "axios";
import SongBookForm from "@/forms/SongBookForm";
export default {
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
  components: {
    SongBookForm
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
  }
};
</script>

<style></style>
