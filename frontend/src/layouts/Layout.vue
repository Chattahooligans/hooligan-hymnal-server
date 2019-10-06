<template>
  <fragment>
    <header style="display:flex;justify-content:space-between">
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
    </header>
    <section class="container">
      <Sidebar />
      <main>
        <slot />
      </main>
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
