<template>
  <Layout>
    <img
      :src="player.image"
      :alt="`${player} full image`"
      v-if="player.image"
      class="mb-3 max-w-md mx-auto mt-3 rounded shadow-md"
    />
    <img
      v-else-if="!player.image && player.thumbnaul"
      :src="player.thumbnail"
      class="h-50px w-50px rounded-full shadow-md"
      :alt="`${player.name} thumbnail`"
    />
    <h2>
      {{ player.name }} -
      <router-link :to="`/players/${player._id}/edit`">Edit</router-link>
    </h2>
    <div>
      <h3>Flag: {{ player.flag }}</h3>
    </div>
    <div>
      <h3>Bio</h3>
      <fragment v-if="input_languages.length > 1">
        <ul class="m-0 p-0 list-none flex">
          <li
            class="p-0 flex flex-1"
            v-for="(lang, i) in input_languages"
            :key="i"
          >
            <button type="button" @click="selectLang(lang)">
              {{ lang }}
            </button>
          </li>
        </ul>
      </fragment>
      <div>
        {{
          player.bio[selectedLang]
            ? player.bio[selectedLang]
            : "No bio in selected lang"
        }}
      </div>
      <!-- <div
        v-html="
          player.bio[selectedLang].length
            ? player.bio[selectedLang]
            : 'No bio in selected lang'
        "
      /> -->
    </div>
    <div class="mt-3 mb-3">
      <button class="btn bg-red-700 text-white" @click="deletePlayer">
        Delete {{ player.name }}
      </button>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      selectedLang: "en"
    };
  },
  methods: {
    selectLang(lang) {
      this.selectedLang = lang;
    },
    deletePlayer() {
      const { id } = this.$route.params;
      this.$swal({
        title: `Are you sure you want to delete?`,
        text: `${this.player.name}`,
        type: "warning"
      }).then(willDelete => {
        if (willDelete) {
          axios.delete(`/api/players/${id}`).then(res => {
            this.$router.push({ name: "all-players" });
            // console.log(res);
            // // this.$swal({
            // //   title: `${this.player.name} was deleted succesfully`
            // // });
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["player", "input_languages"])
  }
};
</script>

<style></style>
