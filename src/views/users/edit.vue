<template>
  <Layout>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="message">
      {{ message }}
    </div>
    <div v-else>
      <h2>Edit {{ user.email }}</h2>
      <button @click="deleteUser">Delete {{ user.email }}</button>
      <h3>Update Name</h3>
      <form method="POST" @submit.prevent="">
        <div class="mb-3 flex flex-col">
          <BaseInput
            type="text"
            name="first-name"
            label="First Name"
            placeholder="First Name"
            arPlaceholder="Users first name"
            :required="true"
            v-model="user.firstName"
          />
        </div>
        <div class="mb-3 flex flex-col">
          <BaseInput
            type="text"
            name="last-name"
            label="Last Name"
            placeholder="Last Name"
            arPlaceholder="Users last name"
            :required="true"
            v-model="user.lastName"
          />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn bg-blue-700 text-white">
            Update Name
          </button>
        </div>
      </form>
      <h3>Update Password</h3>
      <form @submit.prevent="updatePassword">
        <div>
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div>
          <label for="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            v-model="newPassword"
          />
        </div>
        <div>
          <label for="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            v-model="confirmNewPassword"
          />
        </div>
        <div>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import UserForm from "@/forms/UserForm";
import axios from "axios";
export default {
  components: {
    Layout,
    UserForm
  },
  data() {
    return {
      loading: false,
      message: "",
      user: {},
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const { id } = this.$route.params;
      axios
        .get(`/api/users/${id}`)
        .then(({ data }) => {
          this.user = data;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    updateUser() {
      axios
        .put(`/api/users/${this.user._id}`, this.user)
        .then(() => {
          this.$swal({
            title: `${this.user.email} permissions updated successfully`,
            icon: "success"
          }).then(() => {
            this.$router.push(`/users/${this.user._id}`);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.go(-1);
    },
    deleteUser() {
      const { _id } = this.user;
      this.$swal({
        title: `Are you sure you want to delete ${this.user.email}`,
        type: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          axios.delete(`/api/users/${_id}`).then(() => {
            this.$swal({
              title: "User succesfully deleted"
            }).then(() => {
              this.$router.push("/users");
            });
          });
        }
      });
    },
    updatePassword() {
      const { _id } = this.user;
      if (this.newPassword !== this.confirmNewPassword) {
        this.$swal({
          title: "The passwords did not match"
        }).then(() => {
          this.newPassword = "";
          this.confirmNewPassword = "";
        });
      }
      axios
        .put(`/api/users/${_id}/reset-password`, {
          password: this.password,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
  }
};
</script>

<style></style>
