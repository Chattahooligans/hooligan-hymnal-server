<template>
  <Layout>
    <div>
      <h2>Edit {{ single_user.email }}</h2>
      <button @click="deleteUser">Delete {{ single_user.email }}</button>
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
            v-model="single_user.name"
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
            v-model="single_user.familyName"
          />
        </div>
        <div class="mb-3 flex flex-col">
          <BaseInput
            type="text"
            label="Display Name"
            name="displayName"
            placeholder="Display Name"
            :required="true"
            v-model="single_user.displayName"
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
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  methods: {
    updateUser() {
      axios
        .put(`/api/users/${this.single_user._id}`, this.user)
        .then(() => {
          this.$swal({
            title: `${this.single_user.email} permissions updated successfully`,
            icon: "success"
          }).then(() => {
            this.$router.push(`/users/${this.single_user._id}`);
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
        title: `Are you sure you want to delete ${this.single_user.email}`,
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
  },
  computed: {
    ...mapGetters(["single_user"])
  }
};
</script>

<style></style>
