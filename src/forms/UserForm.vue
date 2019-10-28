<template>
  <form @submit.prevent="formMethod">
    <div>
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" v-model="user.email" />
    </div>
    <ul>
      <li>
        <label for="songbookAllowed"
          >Songs & Song Books:
          <input
            type="checkbox"
            id="songbookAllowed"
            name="songbookAllowed"
            v-model="user.songbookAllowed"
          />
        </label>
      </li>
      <li>
        <label for="rosterAllowed">
          Players & Rosters & Goalkeepers:
          <input
            type="checkbox"
            id="rosterAllowed"
            name="rosterAllowed"
            v-model="user.rosterAllowed"
          />
        </label>
      </li>
      <li>
        <label for="foesAllowed">
          Foes:
          <input
            type="checkbox"
            id="foesAllowed"
            name="foesAllowed"
            v-model="user.foesAllowed"
          />
        </label>
      </li>
      <li>
        <label for="usersAllowed">
          Users/Admin:
          <input
            type="checkbox"
            id="usersAllowed"
            name="usersAllowed"
            v-model="user.usersAllowed"
          />
        </label>
      </li>
    </ul>
    <div>
      <template v-if="edit">
        <button type="submit">Update {{ user.email }}</button>
        <button type="button" @click="cancel">Cancel</button>
      </template>
      <template v-else>
        <button type="submit">Add {{ user.email }}</button>
        <button type="reset" @reset="cancel"></button>
      </template>
    </div>
  </form>
</template>

<script>
export default {
  props: ["user", "formMethod", "edit", "cancel"]
};
</script>

<style></style>
