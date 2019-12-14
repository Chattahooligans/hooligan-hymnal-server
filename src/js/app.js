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
        this.$el.innerText = "Close Menu";
      } else {
        nav.style.display = "none";
        this.$el.innerText = "Open Menu";
      }
    }
  }
});
