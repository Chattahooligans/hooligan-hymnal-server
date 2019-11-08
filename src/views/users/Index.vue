<template>
  <Layout>
    <h2 class="text-2xl font-bold mb-3">All Users</h2>
    <router-link class="text-green-700" to="/users/create"
      >Add User</router-link
    >
    <div class="mx-auto container">
      <vue-ads-table-tree
        :columns="columns"
        :rows="users"
        :classes="classes"
        :filter="filterValue"
        @filter-change="filterChange"
      >
        <template slot="pushNotificationsAllowed" slot-scope="props">
          {{ props.row.pushNotificationsAllowed ? "true" : "false" }}
        </template>
        <template slot="rosterAllowed" slot-scope="props">
          {{ props.row.rosterAllowed ? "true" : "false" }}
        </template>
        <template slot="lastLogin" slot-scope="props">
          {{
            props.row.lastLogin ? props.row.lastLogin : "Hasn't logged in yet"
          }}
        </template>
      </vue-ads-table-tree>
      <!-- {{ users }} -->
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
  data() {
    return {
      filterValue: "",
      columns: [
        {
          property: "email",
          title: "Email",
          direction: false,
          filterable: true
        },
        {
          property: "name",
          title: "First Name",
          direction: false,
          filterable: true
        },
        {
          property: "familyName",
          title: "Last Name",
          filterable: true,
          collapseIcon: false
        },
        {
          property: "displayName",
          title: "Display Name",
          filterable: false,
          collapseIcon: false
        },
        {
          property: "pushNotificationsAllowed",
          title: "Push Notifications"
        },
        {
          property: "rosterAllowed",
          title: "Roster Allowed"
        },
        {
          property: "songbookAllowed",
          title: "Songbook Allowed"
        },
        {
          property: "usersAllowed",
          title: "Users Allowed"
        },
        {
          property: "lastLogin",
          title: "Last Login",
          direction: null
        }
      ],
      row: [
        {
          firstName: "Josephine",
          lastName: "Astrid"
        },
        {
          firstName: "Boudewijn",
          lastName: "Van Brabandt"
        }
      ],
      classes: {
        // eslint-disable-next-line prettier/prettier
        "table": {
          "table-auto": true,
          border: true,
          "w-full": true,
          "my-8": true
        },
        "0/all": {
          "border-b": true,
          "text-center": true,
          "px-4": true,
          "py-2": true
        },
        "all/_-1/": {
          "border-r": true
        },
        "1/_-1/all": {
          "border-b": true
        },
        "odd/": {
          "bg-gray-200": true
        },
        "all/4,5,6,7": {
          "text-center": true
        }
      }
    };
  },
  methods: {
    filterChange(filter) {
      this.filter = filter;
    }
  },
  computed: {
    ...mapGetters(["users"])
    // fullName(user) {
    //   return `${user.name} ${user.familyName}`;
    // }
  }
};
</script>

<style></style>
