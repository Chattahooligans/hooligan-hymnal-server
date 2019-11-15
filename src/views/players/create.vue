<template>
  <Layout>
    <h2 class="text-xl font-semibold mb-3 mt-2">
      Create {{ player.name ? player.name : "Player" }}
    </h2>
    <form method="POST" @submit.prevent="addPlayer">
      <div class="flex flex-col mb-3">
        <BaseInput
          type="text"
          label="Name"
          name="name"
          placeholder="Name"
          arPlaceholder="Enter Player Name"
          v-model="player.name"
          :required="true"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="text"
          label="Flag"
          name="flag"
          placeholder="Flag"
          arPlaceholder="Enter Player Country Flag"
          v-model="player.flag"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="number"
          label="Squad Number"
          placeholder="Squad Number"
          arPlaceholder="Enter Player Squad Number"
          name="squadNumber"
          v-model="player.squadNumber"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseSelect
          :value="player.position"
          label="Position"
          :options="[
            'Forward',
            'Defender',
            'Midfielder',
            'Goalkeeper',
            'Head Coach',
            'Associate Head Coach',
            'Goalkeeper Coach'
          ]"
          v-model="player.position"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="string"
          name="team"
          label="Team"
          placeholder="Team"
          arPlaceholder="Player team"
          v-model="player.team"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <ul class="m-0 p-0 list-none flex">
          <li
            class="p-0 block flex-1 flex"
            v-for="(lang, i) in input_languages"
            :key="i"
          >
            <button
              class="block flex-1"
              type="button"
              @click="selectLang(lang)"
            >
              {{ lang }}
            </button>
          </li>
        </ul>
        <BaseInput
          type="textarea"
          :label="`Bio ${selectedLang.toUpperCase()}`"
          name="bio"
          v-model="player.bio[selectedLang]"
        />
        <!-- <base-rich-text label="Bio" v-model="player.bio" /> -->
      </div>
      <div class="mb-3 flex flex-col">
        <img
          class="rounded-full h-50 w-50 mr-auto"
          :src="player.thumbnail"
          :alt="`${player.name} thumbnail`"
          v-if="player.thumbnail"
        />
        <input
          class="rounded outline-none bg-transparent border-none mb-3"
          type="file"
          id="file"
          accept="image/*"
          ref="playerThumbnail"
          v-on:change="handleThumbnailChange()"
        />
        <div :class="thumbnail ? 'mb-3' : ''">
          <button
            :disabled="uploading"
            v-if="thumbnail"
            type="button"
            @click.prevent="uploadThumbnail"
            class="btn"
          >
            Upload Thumbnail
          </button>
        </div>
      </div>
      <div class="mb-3 flex flex-col">
        <label for="playerImage">Image</label>
        <img
          :src="player.image"
          :alt="`${player.name} full image`"
          v-if="player.image"
          class="max-w-md mr-auto"
        />
        <input
          type="file"
          accept="images/*"
          name="playerImage"
          id="playerImage"
          ref="playerImage"
          v-on:change="handleImageChange()"
        />
        <div v-show="image" class="mb-3">
          <button
            type="button"
            @click.prevent="uploadImage"
            :disabled="uploading"
            :class="{ 'opacity-50': uploading }"
            class="btn"
          >
            Upload Image
          </button>
        </div>
        <!-- <BaseInput
          type="text"
          name="image"
          label="Image"
          placeholder="Image URL"
          arPlaceholder="Player full image url"
          v-model="player.image"
        /> -->
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="text"
          name="twitter"
          label="Twitter"
          placeholder="Twitter URL"
          arPlaceholder="Player Twitter URL"
          v-model="player.twitter"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="text"
          name="instagram"
          label="Instagram"
          placeholder="Instagram URL"
          arPlaceholder="Player Instagram URL"
          v-model="player.instagram"
        />
      </div>
      <!-- <div class="mb-3 flex flex-col"> -->
      <!-- <label for="Bios">Bios</label> -->
      <!-- <template v-if="bios">
          <ul>
            <li v-for="(lang, index) in input_languages" :key="index">
              <button type="button" @click="selectLang(lang)">
                {{ lang }}
              </button>
            </li>
          </ul>
          <div>
            <textarea
              v-if="selectedLang"
              v-model="bios[selectedLang]"
            ></textarea>
          </div>
        </template> -->
      <!-- <textarea></textarea> -->
      <!-- </div>
      <div class="mb-3 flex flex-col">
        <div>
          <button
            @click="addLanguage"
            class="btn bg-orange-700 text-white"
            type="button"
          >
            Add Language
          </button>
        </div>
        <div v-show="toggleLang">
          <input type="text" placeholder="Lang" v-model="lang" />
          <button type="button" @click="updateLang">Update Lang</button>
        </div>
      </div> -->
      <div class="mb-3">
        <button class="px-3 py-2 bg-blue-700 text-white rounded mr-3">
          Add {{ player.name ? player.name : "Player" }}
        </button>
        <button
          class="px-3 py-2 bg-red-700 text-white rounded"
          type="reset"
          @click.prevent="clearForm"
        >
          Reset Form
        </button>
      </div>
    </form>
  </Layout>
</template>

<script>
import axios from "axios";
import NProgress from "nprogress";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      player: {
        name: "",
        flag: "",
        squadNumber: "",
        position: "",
        team: "",
        bio: {},
        thumbnail: null,
        image: "",
        twitter: "",
        instagram: ""
      },
      toggleLang: false,
      lang: "",
      // bios: {},
      selectedLang: "",
      uploading: false,
      thumbnail_public_id: null,
      thumbnail: null,
      image: null,
      image_public_id: null
    };
  },
  mounted() {
    this.selectedLang = this.input_languages[0];
  },
  methods: {
    addLanguage() {
      this.toggleLang = !this.toggleLang;
    },
    updateLang() {
      this.bios[this.lang] = "";
      this.toggleLang = false;
      this.lang = "";
    },
    selectLang(lang) {
      this.selectedLang = lang;
    },
    addPlayer() {
      axios
        .post(`/api/players`, this.player)
        .then(({ data }) => {
          this.$router.push(`/players/${data._id}`);
        })
        .catch(err => console.log(err.response));
    },
    clearForm() {
      this.player = {
        name: "",
        flag: "",
        squadNumber: "",
        position: "",
        team: "",
        bio: {},
        thumbnail: "",
        image: "",
        twitter: "",
        instagram: ""
      };
    },
    handleThumbnailChange() {
      this.thumbnail = this.$refs.playerThumbnail.files[0];
    },
    handleImageChange() {
      this.image = this.$refs.playerImage.files[0];
    },
    uploadThumbnail() {
      NProgress.start();
      this.uploading = true;
      let formData = new FormData();
      formData.append("playerThumbnail", this.thumbnail);
      formData.append("public_id", this.thumbnail_public_id);
      axios
        .post("/api/players/thumbnail-upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          NProgress.done();
          this.uploading = false;
          this.player.thumbnail = data.url;
          this.thumbnail_public_id = data.public_id;
          this.thumbnail = null;
          this.$refs.playerThumbnail.value = null;
        })
        .catch(err => {
          NProgress.done();
          this.uploading = false;
          console.log(err.response);
        });
    },
    async uploadImage() {
      NProgress.start();
      this.uploading = true;
      let formData = new FormData();
      formData.append("playerImage", this.image);
      formData.append("public_id", this.image_public_id);
      await axios
        .post("/api/players/full-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          NProgress.done();
          this.uploading = false;
          this.player.image = data.url;
          this.image_public_id = data.public_id;
          this.image = null;
          this.$refs.playerImage.value = null;
        })
        .catch(err => {
          NProgress.done();
          this.uploading = false;
          console.log(err.response);
        });
    }
  },
  computed: {
    ...mapGetters(["input_languages"])
  },
  watch: {
    bios: function() {
      return this.bios.length;
    }
  }
};
</script>

<style></style>
