<template>
  <Layout>
    <div class="container mx-auto">
      <div class="shadow-2xl w-2/3 mx-auto mt-6 rounded overflow-hidden">
        <div class="bg-gray-300 p-3 border-b border-gray-500">
          <h1 class="text-2xl font-bold mb-3">Register</h1>
        </div>
        <div class="p-3">
          <form method="POST" @submit.prevent="register">
            <div class="flex flex-col mb-3">
              <BaseInput
                type="email"
                label="Email"
                name="email"
                placeholder="email@email.com"
                arplaceholder="Enter your email address"
                :required="true"
                :autofocus="true"
                :autocomplete="true"
                v-model="user.email"
              />
            </div>
            <!-- <div class="flex flex-col mb-3">
              <BaseInput
                type="email"
                name="email_confirm"
                label="Email Confirm"
                placeholder="email@email.com"
                aria-placeholder="Confirm your password"
                :required="true"
                v-model="user.email_confirm"
              />
            </div> -->
            <div class="flex flex-col mb-3">
              <BaseInput
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Password"
                placeholder="******"
                arplaceholder="Enter your password"
                :required="true"
                v-model="user.password"
              />
            </div>
            <div class="flex flex-col mb-3">
              <BaseInput
                :type="showPassword ? 'text' : 'password'"
                name="confirmPassword"
                label="Confirm
              Password"
                placeholder="Confirm ******"
                arplaceholder="Please
              confirm password"
                :required="true"
                v-model="user.passwordConfirm"
              />
            </div>
            <div class="mb-3">
              <label for="show-password">
                Show Password
                <input
                  class="ml-2"
                  type="checkbox"
                  name="show-password"
                  id="show-password"
                  v-model="showPassword"
                  @click="
                    {
                      showPassword = !!showPassword;
                    }
                  "
                />
              </label>
            </div>
            <div class="mb-3">
              <button
                class="px-3 py-2 bg-blue-600 text-white rounded"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <div class="text-center mb-3">
            <router-link to="/login"
              >Already have an account, please login</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        passwordConfirm: ""
      },
      showPassword: false
    };
  },
  components: {
    BaseInput
  },
  computed: {
    isMatch() {
      return this.user.password === this.user.passwordConfirm;
    }
  },
  methods: {
    register() {
      if (this.isMatch) {
        this.$store
          .dispatch("register", {
            email: this.user.email,
            password: this.user.password
          })
          .then(() => {
            this.$swal({
              title: "User Created.",
              text: "Please Login",
              type: "success"
            });
            this.$router.push("/login");
          });
      } else {
        // alert("The passwords did not match");
        this.$swal({
          title: "Your passwords did not match",
          type: "error",
          text: "Please try again"
        });
        this.user.password = "";
        this.user.passwordConfirm = "";
      }
    }
  }
};
</script>

<style></style>
