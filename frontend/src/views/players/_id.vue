<template>
  <Layout>
    <h2>
      {{ player.name }} -
      <router-link :to="`/players/${player._id}/edit`">Edit</router-link>
    </h2>
    <div>
      <h3>Bio</h3>
      <div v-html="linebreaks" />
    </div>
    <div>
      <button @click="deletePlayer">Delete {{ player.name }}</button>
    </div>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  methods: {
    deletePlayer() {
      const { id } = this.$route.params;
      this.$swal({
        title: `Are you sure you want to delete?`,
        text: `${this.player.name}`,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios.delete(`/api/players/${id}`).then(res => {
            console.log(res);
            // this.$swal({
            //   title: `${this.player.name} was deleted succesfully`
            // });
          });
        } else {
          console.log("cancel");
        }
      });
    }
  },
  computed: {
    ...mapGetters(["player"]),
    linebreaks() {
      return this.player.bio.replace("\n", "<br />");
    }
  }
};
</script>

<style></style>
