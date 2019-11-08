<template>
  <Layout>
    <h2 class="text-2xl font-bold mb-3">All Users</h2>
    <router-link class="text-green-700" to="/users/create"
      >Add User</router-link
    >
    <div class="mx-auto container">
      <table v-if="users.length > 0" class="table-auto border w-full my-3">
        <thead>
          <tr class="border-b">
            <th class="px-4 py-2 border-r">User</th>
            <th class="px-4 py-2 border-r">Display Name</th>
            <th class="px-4 py-2 border-r">Push Notifications</th>
            <th class="px-4 py-2 border-r">Roster Allowed</th>
            <th class="px-4 py-2 border-r">Songbook Allowed</th>
            <th class="px-4 py-2 border-r">Users Allowed</th>
            <th class="px-4 py-2 border-r">Last Login</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            class="bg-white border-b odd:bg-gray-200"
            :key="user._id"
          >
            <td class="px-4 py-2 border-r text-center">
              <router-link
                :to="{ name: 'view-user', params: { id: user._id } }"
                >{{ `${user.name} ${user.familyName}` }}</router-link
              >
            </td>
            <td class="px-4 py-2 border-r text-center">
              {{ user.displayName }}
            </td>
            <td class="px-4 py-2 border-r text-center">
              <input
                type="checkbox"
                v-model="user.pushNotificationsAllowed"
                disabled
              />
            </td>
            <td class="px-4 py-2 border-r text-center">
              <input type="checkbox" v-model="user.rosterAllowed" disabled />
            </td>
            <td class="px-4 py-2 border-r text-center">
              <input type="checkbox" v-model="user.songbookAllowed" disabled />
            </td>
            <td class="px-4 py-2 border-r text-center">
              <input type="checkbox" v-model="user.usersAllowed" disabled />
            </td>
            <td class="px-4 py-2 border-r text-center">
              {{ user.lastLogin ? user.lastLogin : "Hasn't logged in yet" }}
            </td>
          </tr>
        </tbody>
      </table>
      <h3 v-else>No Users</h3>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["users"])
    // fullName(user) {
    //   return `${user.name} ${user.familyName}`;
    // }
  }
};
</script>

<style></style>
