<template>
  <div>
    <header style="display:flex;justify-content:space-between">
      <router-link to="/">Home</router-link>
      <nav>
        <template v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </template>
        <template v-else>
          <a href="#" @click.prevent="logoutUser">Logout</a>
        </template>
      </nav>
    </header>
    <section class="container">
      <Sidebar />
      <main>
        <slot />
      </main>
    </section>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Sidebar
  },
  mounted() {},
  methods: {
    logoutUser() {
      this.logout();
      this.$router.push("/login");
    },
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
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
