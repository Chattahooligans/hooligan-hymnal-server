<template>
  <Layout>
    <h2>Create New Song</h2>
    {{ title }}
    <div v-html="lyrics"></div>
    <BaseRichText v-model="lyrics" />
    <!-- <SongForm :song="song" :addSong="addSong" :resetForm="resetForm" /> -->
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import SongForm from "@/forms/SongForm";
import BaseRichText from "@/components/BaseRichText";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  data() {
    return {
      // song: {
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
      capoSignal: "",
      // },
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new Heading({ levels: [2] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: this.lyrics,
        onUpdate: ({ getHTML }) => {
          // get new content on update
          this.lyrics = getHTML();
        }
      })
    };
  },
  components: {
    Layout,
    // SongForm,
    EditorContent,
    EditorMenuBar,
    BaseRichText
  },
  methods: {
    addSong() {
      this.$axios
        .post("/api/song", this.song)
        .then(({ data }) => console.log(data))
        .catch(res => console.log(res));
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
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style></style>
