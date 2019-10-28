<template>
  <!-- border-2 border-gray-400 -->
  <div>
    <label class="flex-1 font-semibold" for="edit-area">{{ label }}</label>
    <div class="rounded border shadow px-3 pb-3">
      <editor-menu-bar class="border-b -mx-3" :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar flex justify-between flex-wrap">
          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.bold() }"
            @click="commands.bold"
          >
            <font-awesome-icon icon="bold" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.italic() }"
            @click="commands.italic"
          >
            <font-awesome-icon icon="italic" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.strike() }"
            @click="commands.strike"
          >
            <font-awesome-icon icon="strikethrough" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.underline() }"
            @click="commands.underline"
          >
            <font-awesome-icon icon="underline" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.code() }"
            @click="commands.code"
          >
            <font-awesome-icon icon="code" />
          </button>

          <!-- <button type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <font-awesome-icon icon="paragraph" />
          </button>-->

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <font-awesome-icon icon="heading" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <font-awesome-icon icon="list-ul" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <font-awesome-icon icon="list-ol" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            :class="{ 'bg-gray-400': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <font-awesome-icon icon="quote-left" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex px-3"
            @click="commands.horizontal_rule"
          >
            <font-awesome-icon icon="ruler-horizontal" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            @click="commands.undo"
          >
            <font-awesome-icon icon="undo" />
          </button>

          <button
            type="button"
            class="menubar__button hover:bg-gray-200 block flex-1 px-3"
            @click="commands.redo"
          >
            <font-awesome-icon icon="redo" />
          </button>
        </div>
      </editor-menu-bar>

      <editor-content
        class="border mt-3 -ml-3 -mr-3 -mb-3 focus:outline-none outline-none border-none h-auto px-3 pb-3 min-h-full h-48"
        name="edit-area"
        id="edit-area"
        :editor="editor"
      />
    </div>
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
    value: [String, Number],
    label: {
      type: String
    }
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
