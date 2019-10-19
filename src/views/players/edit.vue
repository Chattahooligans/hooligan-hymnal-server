<template>
  <Layout>
    <h2 class="text-xl font-semibold mb-3 mt-1">Edit {{ player.name }}</h2>
    <form method="POST" @submit.prevent="updatePlayer">
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
        <BaseInput
          type="string"
          name="position"
          label="Position"
          placeholder="Position"
          arPlaceholder="Enter Player Position"
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
        <base-rich-text label="Bio" v-model="player.bio" />
      </div>
      <div class="mb-3 flex flex-col">
        <label for="image" class="font-semibold mb-3">Thumbnail</label>
        <img
          class="h-50 w-50 rounded-full mr-auto mb-3"
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
            @click.prevent="updateThumbnail"
            class="btn"
          >
            Upload Thumbnail
          </button>
        </div>
        <!-- <BaseInput
          type="url"
          name="thumbnail"
          label="Thumbnail"
          placeholder="Thumbnail URL"
          arPlaceholder="Player Thumbnail URL"
          v-model="player.thumbnail"
        /> -->
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="url"
          name="image"
          label="Image"
          placeholder="Image URL"
          arPlaceholder="Player full image url"
          v-model="player.image"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="url"
          name="twitter"
          label="Twitter"
          placeholder="Twitter URL"
          arPlaceholder="Player Twitter URL"
          v-model="player.twitter"
        />
      </div>
      <div class="mb-3 flex flex-col">
        <BaseInput
          type="url"
          name="instagram"
          label="Instagram"
          placeholder="Instagram URL"
          arPlaceholder="Player Instagram URL"
          v-model="player.instagram"
        />
      </div>
      <div class="mb-3">
        <button
          type="submit"
          class="px-3 py-2 bg-blue-700 text-white rounded mr-3"
        >
          Update {{ player.name ? player.name : "Player" }}
        </button>
        <button
          class="px-3 py-2 bg-red-700 text-white rounded"
          type="reset"
          @click.prevent="cancel"
        >
          Cancel \ Go back
        </button>
      </div>
    </form>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import NProgress from "nprogress";

export default {
  data() {
    return {
      thumbnail: null,
      uploading: false
    };
  },
  methods: {
    updatePlayer() {
      axios
        .put(`/api/players/${this.player._id}`, this.player)
        .then(() => {
          this.$swal({
            title: `${this.player.name} was successfully updated!`,
            type: "success"
          }).then(() => {
            this.$router.push(`/players/${this.player._id}`);
          });
        })
        .catch(err => {
          this.$swal({
            text: `${err.response.message}`,
            type: "danger"
          });
          console.log(err.response);
        });
    },
    cancel() {
      this.$router.go(-1);
    },
    handleThumbnailChange() {
      this.thumbnail = this.$refs.playerThumbnail.files[0];
    },
    updateThumbnail() {
      let formData = new FormData();
      formData.append("playerThumbnail", this.thumbnail);
      formData.append("public_id", this.public_id);
      this.uploading = true;
      NProgress.start();
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
          this.public_id = data.public_id;
          this.thumbnail = null;
          this.$refs.playerThumbnail.value = null;
        });
    }
  },
  computed: {
    ...mapGetters(["player"]),
    public_id() {
      return this.player.thumbnail.split("/").reverse()[1];
    }
  }
};
</script>

<style></style>
