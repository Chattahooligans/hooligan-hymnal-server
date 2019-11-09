<template>
  <Layout>
    <div class="mx-auto container">
      <header class="mb-3">
        <h2 class="text-2xl font-bold mb-3">All Users</h2>
        <router-link class="btn bg-green-700 text-white" to="/users/create"
          >Add User</router-link
        >
      </header>
      <div class="flex justify-between">
        <div class="flex-grow-0 flex flex-col">
          <BaseInput
            type="search"
            label="Search Users"
            name="search"
            placeholder="Search"
            v-model="filter"
          />
        </div>
        <div class="flex-group-0 flex flex-col">
          <label for="filter">Filter by Role</label>
          <select
            @change.prevent="filterUsers"
            class="bg-white h-12 py-2 border rounded"
          >
            <option value=""></option>
            <option
              v-for="(filter, i) in filterOptions"
              :key="i"
              :value="filter"
            >
              {{ filter }}
            </option>
          </select>
        </div>
      </div>
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
import { mapGetters, mapActions } from "vuex";
import NProgress from "nprogress";
export default {
  data() {
    return {
      filter: "",
      filterOptions: [
        "pushNotificationsAllowed",
        "rosterAllowed",
        "songbookAllowed",
        "usersAllowed"
      ],
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
          property: "displayName",
          title: "Display Name",
          filterable: true,
          collapseIcon: false
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
    },
    filterUsers(event) {
      NProgress.start();
      this.fetchFilterUsers(event).then(() => {
        NProgress.done();
      });
    },
    ...mapActions(["fetchFilterUsers"])
  },
  computed: {
    ...mapGetters(["users"])
  }
};
</script>

<style></style>
