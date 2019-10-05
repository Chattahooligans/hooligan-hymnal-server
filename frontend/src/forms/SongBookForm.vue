<template>
  <form @submit.prevent="formSubmit">
    <div>
      <label for="songbook_title">Song Book Title</label>
      <input
        type="text"
        name="songbook_title"
        id="songbook_title"
        v-model="songbook.songbook_title"
        placeholder="Songbook Title"
      />
    </div>
    <div>
      <label for="organization">Organization</label>
      <input
        type="text"
        name="organization"
        id="organization"
        v-model="songbook.organization"
        placeholder="Organization"
      />
    </div>
    <div>
      <label for="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        v-model="songbook.description"
        placeholder="Description"
      />
    </div>
    <div>
      <label for="front_cover">Front Cover</label>
      <input
        type="text"
        name="front_cover"
        id="front_cover"
        v-model="songbook.front_cover"
        placeholder="Front Cover"
      />
    </div>
    <div>
      <label for="back_cover">Back Cover</label>
      <input
        type="text"
        name="back_cover"
        id="back_cover"
        v-model="songbook.back_cover"
        placeholder="Back Cover"
      />
    </div>
    <div>
      <label for="song_publish_or_expiration_dates"
        >Some Publish or Experation Date?</label
      >
      <input
        type="text"
        name="song_publish_or_expiration_dates"
        id="song_publish_or_expiration_dates"
        v-model="songbook.song_publish_or_expiration_dates"
        placeholder="Some Publish or Experation Date?"
      />
    </div>
    <div>
      <span style="display:block">Chapters</span>
      <div v-if="songbook.chapters">
        <ul v-for="(chapter, index) in songbook.chapters" :key="index">
          {{
            chapter.chapter_title
          }}
          -
          <button type="button" @click="removeChapter(chapter)">Remove</button>
          <h6>Songs</h6>
          <ul>
            <li v-for="(song, i) in chapter.songs" :key="i">
              {{ song.hint }} -
              <button type="button" @click="removeSong(index, song)">
                Remove {{ song.hint }}
              </button>
            </li>
          </ul>
        </ul>
        <h4>Add Chapter</h4>
        <form @submit.prevent="addChapter">
          <div>
            <label for="new_chapter">Chapter Title</label>
            <input
              type="text"
              name="new_chapter"
              id="new_chapter"
              v-model="chapter.chapter_title"
              required
            />
          </div>
          <div>
            <button type="submit">Add Chapter</button>
          </div>
        </form>

        <div v-if="songbook.chapters.length">
          <h5>Add Song</h5>
          <form @submit.prevent="addSong">
            <div>
              <label for="chapter_select">Select Chapter</label>
              <div>
                <select>
                  <option
                    v-for="(chapter, index) in songbook.chapters"
                    :value="index"
                    :key="index"
                    >{{ chapter.chapter_title }}</option
                  >
                </select>
              </div>
            </div>
            <div>
              <label :for="`song-id`">Song Id</label>
              <input
                type="string"
                :name="`song-id`"
                :id="`song-id`"
                v-model="song._id"
              />
            </div>
            <div>
              <label :for="`song-featured`">
                Featured
                <input
                  type="checkbox"
                  :name="`song-featured`"
                  id="`song-featured`"
                  v-model="song.featured"
                />
              </label>
            </div>
            <div>
              <label :for="`song-hint`">Song Hint</label>
              <input
                type="text"
                :name="`song-hint`"
                :id="`song-hint`"
                v-model="song.hint"
              />
            </div>
            <div>
              <button type="submit">Add Song</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div>
      <button type="submit">Add Songbook</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    songbook: {
      type: Object,
      required: true
    },
    chapter: {
      type: Object,
      required: true
    },
    song: {
      type: Object,
      required: true
    },
    addChapter: {
      type: Function,
      required: true
    },
    removeChapter: {
      type: Function,
      required: true
    },
    addSong: {
      type: Function,
      required: true
    },
    removeSong: {
      type: Function
    },
    formSubmit: {
      type: Function
    }
  }
};
</script>

<style></style>
