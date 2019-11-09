<template>
  <Layout>
    <h2 class="text-2xl font-bold mb-3">All Users</h2>
    <router-link class="text-green-700" to="/users/create"
      >Add User</router-link
    >
    <div class="mx-auto container">
      <BaseInput
        type="search"
        label="Filter"
        name="filter"
        placeholder="Filter"
        v-model="filter"
      />
      <vue-ads-table-tree
        :columns="columns"
        :rows="users"
        :classes="classes"
        :filter="filter"
        @filter-change="filterChange"
      >
        <template slot="email" slot-scope="props">
          <router-link
            :to="{ name: 'view-user', params: { id: props.row._id } }"
            >{{ props.row.email }}</router-link
          >
        </template>
        <template slot="pushNotificationsAllowed" slot-scope="props">
          <input
            class="block mx-auto"
            type="checkbox"
            v-model="props.row.pushNotificationsAllowed"
            disabled
          />
        </template>
        <template slot="rosterAllowed" slot-scope="props">
          <input
            class="block mx-auto"
            type="checkbox"
            v-model="props.row.rosterAllowed"
            disabled
          />
        </template>
        <template slot="songbookAllowed" slot-scope="props">
          <input
            class="block mx-auto"
            type="checkbox"
            v-model="props.row.songbookAllowed"
            disabled
          />
        </template>
        <template slot="usersAllowed" slot-scope="props">
          <input
            class="block mx-auto"
            type="checkbox"
            v-model="props.row.usersAllowed"
            disabled
          />
        </template>
        <template slot="lastLogin" slot-scope="props">
          <span v-if="props.row.lastLogin">
            {{ props.row.lastLogin | moment("dd. MMM, Do YY") }}
          </span>
          <span v-else>Hasn't logged in yet</span>
        </template>
      </vue-ads-table-tree>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      filter: "",
      columns: [
        // {
        //   property: "_id",
        //   title: "ID"
        // },
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
          property: "displayName",
          title: "Display Name",
          filterable: true,
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
        "0/0/0": {
          "whitespace-no-wrap": true,
          // eslint-disable-next-line prettier/prettier
          "truncate": true
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
