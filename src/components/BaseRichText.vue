<template>
  <div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar flex flex-wrap">
        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <!-- Strike -->
          <font-awesome-icon icon="strikethrough" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <!-- Underline -->
          <font-awesome-icon icon="underline" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <!-- Code -->
          <font-awesome-icon icon="code" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <font-awesome-icon icon="paragraph" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <!-- H2 -->
          <font-awesome-icon icon="heading" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <!-- ul -->
          <font-awesome-icon icon="list-ul" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <!-- ol -->
          <font-awesome-icon icon="list-ol" />
        </button>

        <button
          class="menubar__button block"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          ""
          <font-awesome-icon icon="quote-left" />
        </button>

        <button class="menubar__button block" @click="commands.horizontal_rule">
          <!-- hr -->
          <font-awesome-icon icon="ruler-horizontal" />
        </button>

        <button class="menubar__button block" @click="commands.undo">
          <!-- Undo -->
          <font-awesome-icon icon="undo" />
        </button>

        <button class="menubar__button block" @click="commands.redo">
          <!-- redo -->
          <font-awesome-icon icon="redo" />
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
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
  props: {
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  },
  components: {
    EditorContent,
    EditorMenuBar
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
        content: this.value,
        onUpdate: ({ getHTML }) => {
          this.$emit("input", getHTML());
        }
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style></style>
