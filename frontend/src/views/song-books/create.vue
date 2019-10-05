<template>
  <Layout>
    <h2>Add Song Book</h2>
    <SongBookForm
      :songbook="songbook"
      :chapter="new_chapter"
      :song="new_song"
      :addChapter="addChapter"
      :removeChapter="removeChapter"
      :addSong="addSong"
      :removeSong="removeSong"
      :formSubmit="submitSongBook"
    />
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import SongBookForm from "@/forms/SongBookForm";
import axios from "axios";
export default {
  components: {
    Layout,
    SongBookForm
  },
  data() {
    return {
      songbook: {
        songbook_title: "",
        organization: "",
        description: "",
        front_cover: "",
        back_cover: "",
        song_publish_or_expiration_dates: "",
        chapters: []
      },
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
  methods: {
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
    }
  }
};
</script>

<style></style>
