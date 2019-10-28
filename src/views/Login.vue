<template>
  <Layout>
    <div class="container mx-auto">
      <div class="w-2/3 shadow-2xl mx-auto mt-5 rounded overflow-hidden">
        <div class="bg-gray-300 p-3 border-b border-gray-500">
          <h1 class="text-2xl font-bold mb-3">Login</h1>
        </div>
        <div class="p-3">
          <form @submit.prevent="login">
            <div class="flex flex-col mb-3">
              <BaseInput
                type="email"
                name="email"
                label="Email"
                placeholder="email@email.com"
                aria-placeholder="Enter your email address"
                :autocomplete="true"
                :autofocus="true"
                :required="true"
                v-model="email"
              />
            </div>
            <div class="flex flex-col mb-3">
              <BaseInput
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Password"
                placeholder="******"
                aria-placeholder="Enter your email address"
                :required="true"
                v-model="password"
              />
            </div>
            <div class="mb-3">
              <label for="rememberMe"
                >Remember Me
                <input
                  class="ml-2"
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  v-model="rememberMe"
              /></label>
            </div>
            <!-- <div class="mb-3">
              <label for="showPassword">
                Show Password
                <input
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  class="ml-1"
                  v-model="showPassword"
                  @click="
                    {
                      showPassword = !!showPassword;
                    }
                  "
                />
              </label>
            </div> -->
            <div>
              <button
                class="bg-blue-700 text-white py-2 px-3 rounded"
                type="submit"
              >
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
    </div>
  </Layout>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import NProgress from "nprogress";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      rememberMe: false
    };
  },
  components: {
    BaseInput
  },
  beforeRouteEnter(toRoute, fromRoute, next) {
    NProgress.start();
    NProgress.done();
    next();
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.$swal({
            title: `${err.response.data.message}`
          }).then(() => {
            this.password = "";
            setTimeout(() => document.getElementById("password").focus(), 500);
          });
        });
    }
  }
};
</script>
