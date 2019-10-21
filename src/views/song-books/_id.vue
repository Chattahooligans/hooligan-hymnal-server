<template>
  <Layout>
    <h2>{{ songbook.songbook_title }}</h2>
    <router-link
      class="btn bg-green-700 text-white mb-3"
      :to="{ name: 'edit-song-book', params: { id: songbook._id } }"
      >Edit {{ songbook.songbook_title }}</router-link
    >
    <div class="border shadow rounded p-3">
      <section>
        <h3>Organization</h3>
        <div>
          {{ songbook.organization }}
        </div>
      </section>
      <section>
        <h3>Description</h3>
        <div>
          {{ songbook.description }}
        </div>
      </section>
      <section>
        <h3>Front Cover</h3>
        <div>
          I think this should be an image?? Upload?
          <br />
          {{ songbook.front_cover }}
        </div>
      </section>
      <section>
        <h3>Back Cover</h3>
        <div>
          I think this should be an image?? Upload?
          <br />
          {{ songbook.back_cover }}
        </div>
      </section>
      <section class="border-none">
        <h3>Chapters</h3>
        <div>
          <ul v-if="songbook.chapters.length">
            <li v-for="(chapter, i) in songbook.chapters" :key="i">
              {{ chapter.chapter_title }}
              <ul v-if="chapter.songs.length">
                <li v-for="(song, i) in chapter.songs" :key="i">
                  {{ song.hint }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["songbook"])
  }
};
</script>

<style>
section {
  @apply border-b;
}
section h3 {
  @apply mb-1 pb-1 border-b;
}
section h3 + div {
  @apply mb-3;
}
</style>
