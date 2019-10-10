<template>
  <Layout>
    <h2>Goalkeepers Nickname</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul v-if="goalkeepers.length">
        <li v-for="keeper in goalkeepers" :key="keeper._id">{{ JSON.stringify(keeper) }}</li>
      </ul>
      <h3 v-else>No Goalkeepers</h3>
    </div>
  </Layout>
</template>

<script>
import NProgress from "nprogress";
import store from "@/store";
export default {
  data() {
    return {
      loading: false,
      goalkeepers: []
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   NProgress.start();
  //   store.dispatch("fetchGoalkeepersNicknames").then(() => {
  //     NProgress.done();
  //     next();
  //   });
  // },
  components: {},
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
