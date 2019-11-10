<template>
  <Layout>
    <div class="container mx-auto">
      <header class="my-3">
        <h2>{{ single_user.email }}</h2>
        <router-link
          class="btn bg-green-700 text-white"
          :to="{ name: 'edit-user', params: { id: single_user._id } }"
          >Edit</router-link
        >
      </header>
      <section>
        <div class="border shadow rounded p-4 mb-3">
          <h3>Users Info</h3>
          <hr />
          <div class="flex flex-wrap">
            <article class="flex flex-1 items-center">
              <h4 class="m-0">Email Address:</h4>
              <span class="block">{{ single_user.email }}</span>
            </article>
            <article class="flex flex-1 items-center">
              <h4 class="m-0">Display Name:</h4>
              <span class="block">{{ single_user.displayName }}</span>
            </article>
            <article class="flex flex-1 items-center">
              <h4 class="m-0">First Name:</h4>
              <span class="block">{{ single_user.name }}</span>
            </article>
            <article class="flex flex-1 items-center">
              <h4 class="m-0">Last Name:</h4>
              <span class="block">{{ single_user.familyName }}</span>
            </article>
          </div>
        </div>
      </section>
      <section class="shadow border rounded p-3">
        <h3>Current Roles</h3>
        <ul class="list-none m-0">
          <li>
            <span class="font-semibold">Push Notifications Allowed:</span>
            {{ single_user.pushNotificationAllowed ? "TRUE" : "FALSE" }}
          </li>
          <li>
            <span class="font-semibold">Rosters Allowed:</span>
            {{ single_user.rosterAllowed ? "TRUE" : "FALSE" }}
          </li>
          <li>
            <span class="font-semibold">Songbook Allowed:</span>
            {{ single_user.songbookAllowed ? "TRUE" : "FALSE" }}
          </li>
          <li>
            <span class="font-semibold">Users Allowed:</span>
            {{ single_user.usersAllowed ? "TRUE" : "FALSE" }}
          </li>
        </ul>
      </section>
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
