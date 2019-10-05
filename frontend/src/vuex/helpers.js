import { mapGetters } from "vuex";

export const authComputed = {
  ...mapGetters(["loggedIn"])
};

export const userInfo = {
  ...mapGetters(["user"])
};

export const globalMessage = {
  ...mapGetters(["getMessage"])
};
