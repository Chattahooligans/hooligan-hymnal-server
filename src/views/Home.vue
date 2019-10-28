<template>
  <Layout>
    <div class="text-center container mx-auto py-3">
      <h1 class="font-bold text-3xl">Welcome to Hymnal Server</h1>
      <fragment v-if="loggedIn">
        <p>If you see nothing on the side please contact your admin.</p>
      </fragment>
    </div>
  </Layout>
</template>

<script>
import NProgress from "nprogress";
import { authComputed } from "@/vuex/helpers";
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
  name: "home",
  components: {
    EditorContent,
    EditorMenuBar
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start();
    NProgress.done();
    next();
  },
  data() {
    return {
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
        content: this.html,
        onUpdate: ({ getHTML }) => {
          // get new content on update
          this.html = getHTML();
        }
      }),
      html: null
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  computed: {
    ...authComputed
  }
};
</script>
