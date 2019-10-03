<template>
  <div>
    <h2>Rosters</h2>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul>
        <li v-for="roster in rosters" :key="roster._id">
          {{ roster }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      rosters: []
    };
  },
  methods: {
    getRosters() {
      this.loading = true;
      this.$axios.get("/api/rosters").then(({ data }) => {
        this.loading = false;
        this.rosters = data;
      });
    }
  }
};
</script>

<style></style>
