<template>
  <Layout>
    <h2>Edit {{ roster.title }}</h2>
  </Layout>
</template>

<script>
// TODO add active and default
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["roster"])
  }
};
</script>

<style></style>
