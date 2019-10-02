<template>
  <aside>
    <nav>
      <router-link to="/songs">All Songs</router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.token !== "";
    }
  }
};
</script>

<style></style>
