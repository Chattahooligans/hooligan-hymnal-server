<template>
  <Layout>
    <div>
      <h2>
        {{ single_user.email }} -
        <router-link :to="`/users/${single_user._id}/edit`">Edit</router-link>
      </h2>
      <h3>
        Last login:
        {{
          single_user.lastLogin ? single_user.lastLogin : "Hasn't logged in yet"
        }}
      </h3>
      <h3>Users Permissions</h3>
      <ul>
        <li>
          Songs & Song Books:
          <input
            type="checkbox"
            :checked="single_user.songbookAllowed"
            disabled
          />
        </li>
        <li>
          Players & Rosters & Goalkeepers:
          <input
            type="checkbox"
            :checked="single_user.rosterAllowed"
            disabled
          />
        </li>
        <li>
          Foes:
          <input type="checkbox" :checked="single_user.foesAllowed" disabled />
        </li>
        <li>
          Users/Admin:
          <input type="checkbox" :checked="single_user.usersAllowed" disabled />
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["single_user"])
  }
};
</script>

<style></style>
