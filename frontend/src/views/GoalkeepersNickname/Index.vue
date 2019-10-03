<template>
  <div>
    <h2>Goalkeepers Nickname</h2>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <ul>
        <li v-for="keeper in goalkeepers" :key="keeper._id">
          {{ JSON.stringify(keeper) }}
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
      goalkeepers: []
    };
  },
  methods: {
    getGoalKeepers() {
      this.loading = true;
      this.$axios
        .get("/api/goalkeeperNicknames")
        .then(({ data }) => {
          this.loading = false;
          this.goalkeepers = data;
        })
        .catch(res => console.log(res));
    }
  }
};
</script>

<style></style>
