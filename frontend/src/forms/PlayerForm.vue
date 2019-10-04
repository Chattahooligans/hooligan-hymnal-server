<template>
  <form @submit.prevent="formMethod">
    <div>
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" v-model="player.name" />
    </div>
    <div>
      <label for="flag">Flag</label>
      <input type="text" name="flag" id="flag" v-model="player.flag" />
    </div>
    <div>
      <label for="squadNumber">Squad Number</label>
      <input
        type="number"
        name="squadNumber"
        id="squadNumber"
        v-model="player.squadNumber"
      />
    </div>
    <div>
      <label for="position">Position</label>
      <input
        type="text"
        name="positition"
        id="position"
        v-model="player.position"
      />
    </div>
    <div>
      <label for="team">Team</label>
      <input type="text" name="team" id="team" v-model="player.team" />
    </div>
    <div>
      <label for="bio">Bio</label>
      <textarea v-model="player.bio" name="bio" id="bio" />
    </div>
    <div>
      <label for="thumbnail">Thumbnail</label>
      <input
        type="url"
        name="thumbnail"
        id="thumbnail"
        v-model="player.thumbnail"
      />
    </div>
    <div>
      <label for="image">Image</label>
      <input type="url" name="image" id="image" v-model="player.image" />
    </div>
    <div>
      <label for="twitter">Twitter</label>
      <input type="url" name="twitter" id="twitter" v-model="player.twitter" />
    </div>
    <div>
      <label for="instagram">Instagram</label>
      <input
        type="url"
        name="instagram"
        id="instagram"
        v-model="player.instagram"
      />
    </div>
    <div>
      <div v-if="!edit">
        <button type="submit">Add {{ player.name }}</button>
        <button type="reset" @click.prevent="cancel">Reset Form</button>
      </div>
      <div v-else>
        <button type="submit">Update {{ player.name }}</button>
        <button @click.prevent="cancel">Cancel</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
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
