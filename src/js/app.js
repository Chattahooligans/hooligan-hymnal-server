import Alpine from "alpinejs";

// function debounced(delay, fn) {
//   let timerId;
//   return function (...args) {
//     if (timerId) {
//       clearTimeout(timerId);
//     }
//     timerId = setTimeout(() => {
//       fn(...args);
//       timerId = null;
//     }, delay);
//   }
// }

// const playersSearch = document.getElementById('playersSearch')
// const playersList = (event) => {
//   if (!event) return;
//   const { value } = event.target;
//   fetch(`/players-partial?q=${value}`)
//     .then(res => res.text())
//     .then(res => {
//       const postsContainer = document.getElementById('playersList');
//       postsContainer.innerHTML = res;
//     });
// }
// const playerHandler = debounced(200, playersList);
// if (playersSearch) {
//   playersSearch.addEventListener("input", playerHandler);
// }
