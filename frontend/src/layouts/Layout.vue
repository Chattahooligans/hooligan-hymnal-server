<template>
  <fragment class="overflow-hidden">
    <header class="bg-gray-800 text-white py-3">
      <div class="mx-3 flex flex-row justify-between">
        <router-link to="/">Hymnal Server</router-link>
        <nav>
          <template v-if="loggedIn">
            <router-link :to="{ name: 'my-profile' }">
              {{ user.email }} </router-link
            >|
            <a href="#" @click.prevent="logout">Logout</a>
          </template>
          <template v-else>
            <router-link to="/login">Login</router-link>
          </template>
        </nav>
      </div>
    </header>
    <section class="mx-3 flex min-h-screen h-full">
      <Sidebar />
      <main :class="{ 'w-2/3 ml-6': loggedIn, 'w-full': !loggedIn }">
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
