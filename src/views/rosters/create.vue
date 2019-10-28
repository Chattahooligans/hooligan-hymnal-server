<template>
  <Layout>
    <div class="shadow-xl p-3 mt-3">
      <h2 class="font-semibold text-2xl mb-3 border-b">Create</h2>
      <form method="POST" @submit.prevent="addRoster">
        <div class="flex flex-col mb-3">
          <BaseInput
            type="text"
            label="Roster Title"
            name="rosterTitle"
            placeholder="Roster Title"
            :required="true"
            v-model="roster.rosterTitle" />
        </div>
        <div class="mb-3 flex flex-col">
          <BaseInput
            type="text"
            name="season"
            label="Season"
            placeholder="Season"
            arPlaceholder="Roster Season"
            v-model="roster.season" />
        </div>
        <div class="mb-3 flex flex-col">
          <multiselect
                v-if="roster.players"
                v-model="roster.players"
                :options="players"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Select Players"
                label="name"
                track-by="name"
                :preselect-first="false"
              >
                <template
                  slot="selection"
                  slot-scope="{ players, search, isOpen }"
                >
                  <span v-if="roster.players.length && !isOpen"
                    >{{ roster.players.length }} selected</span
                  >
                </template>
              </multiselect>
          <!-- TODO ADD Vue mutiselect -->
          <!-- <multi-select></multi-select> -->
        </div>
        <div class="mb-3 flex flex-col">
          <label class="font-semibold flex-1" for="active">Active</label>
          <input type="checkbox" name="active" id="active" v-model="roster.active" />
        </div>
        <div class="mb-3 flex flex-col">
          <label class="font-semibold flex-1" for="default">Default</label>
          <input type="checkbox" name="default" id="default" v-model="roster.default" />
        </div>
        <div class="mb-3">
          <button class="btn bg-blue-700 text-white" type="submit">Add Roster</button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      roster: {
        rosterTitle: "",
        season: "",
        players: [],
        active: false,
        default: false
      },
    };
  },
  components: {
    BaseInput
  },
  methods: {
    addRoster() {
      axios
        .post(`/api/roster`, this.roster)
        .then(({data}) => {
          this.$swal({
            title: `${data.rosterTitle} succesfully created`,
            type: 'success'
          }).then(() => {
            this.$router.push({ name: 'view-roster', params: { id: data._id } })
          })
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    addSquad() {
      this.$swal({
        title: "Needs to be implemented"
      });
    },
  },
  computed: {
    ...mapGetters(["players"])
  }
};
</script>

<style></style>
