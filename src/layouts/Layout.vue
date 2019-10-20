<template>
  <fragment class="overflow-hidden">
    <header class="bg-gray-800 text-white py-3">
      <button
        @click.prevent="skip"
        type="button"
        class="btn absolute -top-16 -left-16 bg-black"
      >
        Skip To Content
      </button>
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
    <section class="mx-3 flex flex-col md:flex-row min-h-screen h-full">
      <Sidebar />
      <main id="main" :class="{ 'ml-6': loggedIn }" class="w-full">
        <slot />
      </main>
    </section>
    <footer class="text-center bg-gray-700 text-white py-3">
      &copy; Open Hymnal
    </footer>
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
    ...mapActions(["logout"]),
    skip() {
      const main = document.getElementById("main");
      main.setAttribute("tabindex", "-1");
      main.focus();
      main.removeAttribute("tabindex");
    }
  },
  computed: {
    ...authComputed,
    ...userInfo
  }
};
</script>

<style>
header > button:focus {
  @apply top-0 left-0;
}
</style>
