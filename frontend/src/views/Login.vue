<template>
  <Layout>
    <div class="container mx-auto">
      <div class="w-2/3 shadow mx-auto mt-5 p-3">
        <h2 class="border-bottom-1 text-2xl font-bold mb-3 border-bottom">
          Login
        </h2>
        <form @submit.prevent="login">
          <div class="flex flex-col mb-3">
            <label class="flex-1 font-semibold" for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="user.email"
              class="border flex-auto rounded p-2"
            />
          </div>
          <div class="flex flex-col mb-3">
            <label class="block font-semibold" for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="user.password"
              class="border flex-auto rounded p-2"
            />
          </div>
          <div>
            <button class="bg-blue-700 text-white p-3 rounded" type="submit">
              Login
            </button>
          </div>
        </form>
        <div class="text-center my-2">
          <router-link class="hover:underline" to="/register"
            >Don't have an account. Register for one here</router-link
          >
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
// import { mapActions } from "vuex";
import Layout from "@/layouts/Layout";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    Layout
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.$swal({
            title: `${err.response.data.message}`
          }).then(() => {
            this.user.password = "";
          });
        });
    }
  },
  computed: {}
};
</script>
