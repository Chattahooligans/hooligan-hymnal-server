import Vue from "vue";

new Vue({
  el: "#menuToggle",
  data() {
    return {
      toggled: false
    };
  },
  methods: {
    toggleMenu: function() {
      this.toggled = !this.toggled;
      let nav = this.$el.nextSibling;
      if (this.toggled) {
        nav.style.display = "block";
      } else {
        nav.style.display = "none";
      }
    }
  }
});
