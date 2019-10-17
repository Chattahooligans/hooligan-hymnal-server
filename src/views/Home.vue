<template>
  <Layout>
    <div class="text-center container mx-auto py-3">
      <h1 class="font-bold text-3xl">Welcome to Hymnal Server</h1>
      <fragment v-if="loggedIn">
        <p>If you see nothing on the side please contact your admin.</p>
      </fragment>
    </div>
    <div>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar flex flex-wrap">
          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <font-awesome-icon icon="bold" />
            <!-- Bold -->
            <!-- <icon name="bold" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <!-- Italic -->
            <font-awesome-icon icon="italic" />
            <!-- <icon name="italic" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <!-- Strike -->
            <font-awesome-icon icon="strikethrough" />
            <!-- <icon name="strike" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <font-awesome-icon icon="underline" />
            <!-- Underline -->
            <!-- <icon name="underline" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <!-- Code -->
            <font-awesome-icon icon="code" />
            <!-- <icon name="code" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <font-awesome-icon icon="paragraph" />
            <!-- <icon name="paragraph" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <!-- H1 -->
            <font-awesome-icon icon="heading" />1
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <!-- H2 -->
            <font-awesome-icon icon="heading" />2
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <font-awesome-icon icon="heading" />3
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <!-- ul -->
            <font-awesome-icon icon="list-ul" />
            <!-- <icon name="ul" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <!-- ol -->
            <font-awesome-icon icon="list-ol" />
            <!-- <icon name="ol" /> -->
          </button>

          <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            ""
            <font-awesome-icon icon="quote-left" />
            <!-- <icon name="quote" /> -->
          </button>

          <!-- <button
            class="menubar__button block"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            Code Block
            <icon name="code" />
          </button>-->

          <button class="menubar__button block" @click="commands.horizontal_rule">
            <!-- <icon name="hr" /> -->
            <!-- hr -->
            <font-awesome-icon icon="ruler-horizontal" />
          </button>

          <button class="menubar__button block" @click="commands.undo">
            <!-- <icon name="undo" /> -->
            <!-- Undo -->
            <font-awesome-icon icon="undo" />
          </button>

          <button class="menubar__button block" @click="commands.redo">
            <!-- <icon name="redo" /> -->
            <!-- redo -->
            <font-awesome-icon icon="redo" />
          </button>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" v-model="html" />
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
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
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
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
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
    ...authComputed,
    updateHTML() {
      return this.editor.content;
    }
  }
};
</script>
