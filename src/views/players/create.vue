<template>
  <Layout>
    <h2 class="text-xl font-semibold mb-3 mt-2">Create {{ player.name ? player.name : "Player" }}</h2>
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
        <BaseInput
          type="string"
          name="position"
          label="Position"
          placeholder="Position"
          arPlaceholder="Enter Player Position"
          v-mdoel="player.position"
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
        <BaseInput
          type="url"
          name="thumbnail"
          label="Thumbnail"
          placeholder="Thumbnail URL"
          arPlaceholder="Player Thumbnail URL"
          v-model="player.thumbnail"
        />
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
          class="px-3 py-2 bg-blue-700 text-white rounded mr-3"
        >Add {{ player.name ? player.name : "Player" }}</button>
        <button
          class="px-3 py-2 bg-red-700 text-white rounded"
          type="reset"
          @click.prevent="clearForm"
        >Reset Form</button>
      </div>
    </form>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import axios from "axios";

export default {
  components: {
    Layout
  },
  data() {
    return {
      player: {
        name: "",
        flag: "",
        squadNumber: "",
        position: "",
        team: "",
        bio: "",
        thumbnail: "",
        image: "",
        twitter: "",
        instagram: ""
      }
    };
  },
  methods: {
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
        bio: "",
        thumbnail: "",
        image: "",
        twitter: "",
        instagram: ""
      };
    }
  }
};
</script>

<style></style>
