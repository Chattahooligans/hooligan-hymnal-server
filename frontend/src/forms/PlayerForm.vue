<template>
  <form @submit.prevent="formMethod" class="mb-10">
    <div class="flex flex-col mb-3">
      <BaseInput
        type="text"
        label="Name"
        name="name"
        placeholder="Player Name"
        arplaceholder="Enter Player Name"
        :autofocus="true"
        :required="true"
        v-model="player.name"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput type="text" name="flag" label="Flag" placeholder="flag" v-model="player.flag" />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="number"
        name="squadNumber"
        label="Squad Number"
        placeholder="Squad Number"
        arPlaceholder="Enter Players Squad Number"
        v-model.number="player.squadNumber"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="text"
        name="position"
        label="Position"
        placeholder="position"
        arPlaceholder="Player position"
        v-model="player.position"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="text"
        name="team"
        label="Team"
        placeholder="Team"
        arPlaceholder="Enter Player Team"
        v-model="player.team"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="textarea"
        name="bio"
        label="Bio"
        placeholder="Player's Bio"
        arPlaceholder="Enter Players Bio"
        v-model="player.bio"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="url"
        name="thumbnail"
        label="Thumbnail"
        placeholder="Thumbnail URL"
        arPlaceholder="Enter Player Thumbnail URL"
        v-model="player.thumbnail"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="url"
        label="Image"
        name="image"
        placeholder="Image"
        arPlaceholder="Enter Player Image URL"
        v-model="player.image"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="url"
        label="Twitter"
        name="twitter"
        placeholder="Twitter"
        arPlaceholder="Enter Player Twitter Account"
        v-model="player.twitter"
      />
    </div>
    <div class="flex flex-col mb-3">
      <BaseInput
        type="url"
        label="Instagram"
        name="instagram"
        placeholder="Instagram"
        arPlaceholder="Enter Instagram URL"
      />
    </div>
    <div class="flex">
      <fragment v-if="!edit">
        <button
          class="px-3 py-2 text-white bg-blue-600 rounded mr-3"
          type="submit"
        >Add {{ player.name }}</button>
        <button
          class="px-3 py-2 text-white bg-red-700 rounded mr-3"
          type="reset"
          @click.prevent="cancel"
        >Reset Form</button>
      </fragment>
      <fragment v-else>
        <button
          class="px-3 py-2 text-white bg-blue-600 rounded mr-3"
          type="submit"
        >Update {{ player.name }}</button>
        <button class="px-3 py-2 text-white bg-red-700 rounded" @click.prevent="cancel">Cancel</button>
      </fragment>
    </div>
  </form>
</template>

<script>
import BaseInput from "@/components/BaseInput";
export default {
  components: {
    BaseInput
  },
  props: {
    formMethod: {
      type: Function,
      require: true
    },
    player: {
      type: Object,
      require: true
    },
    edit: {
      type: Boolean,
      require: false
    },
    cancel: {
      type: Function,
      require: true
    }
  }
};
</script>

<style></style>
