<template>
  <fragment>
    <header>
      <div class="container-fluid d-flex justify-content-between">
        <router-link to="/">Home</router-link>
        <nav>
          <template v-if="loggedIn">
            <router-link :to="{ name: 'my-profile' }">{{
              user.email
            }}</router-link>
            |
            <a href="#" @click.prevent="logout">Logout</a>
          </template>
          <template v-else>
            <router-link to="/login">Login</router-link>
          </template>
        </nav>
      </div>
    </header>
    <section class="container-fluid">
      <div class="row">
        <Sidebar />
        <main :class="{ 'col-md-9': loggedIn, 'col-md-12': !loggedIn }">
          <slot />
        </main>
      </div>
    </section>
  </fragment>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import { mapActions } from "vuex";
import { authComputed, userInfo } from "../vuex/helpers";
export default {
  components: {
    Sidebar
  },
  mounted() {},
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...authComputed,
    ...userInfo
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
