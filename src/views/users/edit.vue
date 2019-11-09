<template>
  <Layout>
    <div class="container mx-auto my-3">
      <nav>
        <a href="#" class="btn bg-green-700 text-white" @click.prevent="back"
          >Go Back</a
        >
      </nav>
      <h2>Edit {{ single_user.email }}</h2>
      <button class="btn bg-red-700 text-white" @click="deleteUser">
        Delete {{ single_user.email }}
      </button>
      <section class="shadow border rounded p-3 my-3">
        <h3>Update Name</h3>
        <form method="POST" @submit.prevent="updateUser">
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
          <h3>Permissions</h3>
          <hr class="mb-3" />
          <div class="mb-3 flex flex-col">
            <label for="pushNotificationsAllowed" class="font-semibold">
              Push Notifications Allowed
              <input
                class="ml-2"
                type="checkbox"
                name="pushNotificationsAllowed"
                id="pushNotificationsAllowed"
                v-model="single_user.pushNotificationsAllowed"
              />
            </label>
          </div>
          <div class="mb-3 flex flex-col">
            <label for="rosterAllowed" class="font-semibold"
              >Roster Allowed
              <input
                class="ml-3"
                type="checkbox"
                name="rosterAllowed"
                id="rosterAllowed"
                v-model="single_user.rosterAllowed"
            /></label>
          </div>
          <div class="mb-3 flex flex-col">
            <label for="songbookAllowed" class="font-semibold">
              Songbook Allowed
              <input
                class="ml-3"
                type="checkbox"
                name="songbookAllowed"
                id="songbookAllowed"
                v-model="single_user.songbookAllowed"
              />
            </label>
          </div>
          <div class="mb-3 flex flex-col">
            <label for="usersAllowed" class="font-semibold">
              Users Allowed
              <input
                class="ml-3"
                type="checkbox"
                name="usersAllowed"
                id="usersAllowed"
                v-model="single_user.usersAllowed"
              />
            </label>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn bg-blue-700 text-white">
              Update User
            </button>
          </div>
        </form>
      </section>
      <section class="shadow rounded border mb-3 p-3">
        <h3>Update Password</h3>
        <form ref="passwordForm" @submit.prevent="updatePassword">
          <div class="flex flex-col mb-3">
            <BaseInput
              type="password"
              name="newPassword"
              label="New Password"
              placeholder="new *******"
              v-model="newPassword"
              :autocomplete="`new-password`"
              :required="true"
            />
          </div>
          <div class="flex flex-col mb-3">
            <BaseInput
              type="password"
              name="confirmNewPassword"
              label="Confirm New Password"
              placeholder="Confirm New ******"
              v-model="confirmNewPassword"
              :autocomplete="`new-password`"
              :required="true"
            />
          </div>
          <div class="flex">
            <button class="btn bg-blue-700 text-white" type="submit">
              Update Password
            </button>
          </div>
        </form>
      </section>
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
        .put(`/api/users/${this.single_user._id}`, this.single_user)
        .then(() => {
          this.$swal({
            title: `${this.single_user.email} permissions updated successfully`,
            type: "success"
          }).then(() => {
            this.$router.push(`/users/${this.single_user._id}`);
          });
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    back() {
      this.$router.go(-1);
    },
    deleteUser() {
      const { _id } = this.single_user;
      this.$swal({
        title: `Are you sure you want to delete ${this.single_user.email}`,
        type: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          axios.delete(`/api/users/${_id}`).then(() => {
            this.$swal({
              title: "User succesfully deleted",
              type: "success"
            }).then(() => {
              this.$router.push("/users");
            });
          });
        }
      });
    },
    updatePassword() {
      const { _id } = this.single_user;
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
          password: this.single_user.password,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword
        })
        .then(() => {
          this.$swal({
            title: `${this.single_user.email} password was updated!`,
            type: "success"
          }).then(() => {
            this.$refs.passwordForm.reset();
          });
        })
        .catch(err => {
          this.$swal({
            title: `${err.response.message}`,
            type: "error"
          }).then(() => {
            this.$refs.passwordForm.reset();
          });
        });
    }
  },
  computed: {
    ...mapGetters(["single_user"])
  }
};
</script>

<style></style>
