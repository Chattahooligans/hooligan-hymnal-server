import dropzone from './modules/dropzone';
import SortList from './modules/sortable';

import 'alpinejs';
import { log } from 'util';
// require('alpinejs');
// require('./modules/sortable');

SortList();

dropzone(
  '/players/thumbnail',
  'thumbnail-template',
  document.getElementById('thumbnail-upload-section'),
  '#thumbnail-previews',
  '#thumbnail-target',
  'Thumbnail',
  1,
  'thumbnail',
);

dropzone(
  '/players/images',
  'images-template',
  document.getElementById('images-upload-section'),
  '#images-previews',
  '#images-target',
  'Player Images',
  10,
  'images',
);

dropzone(
  '/foes/logo',
  'logo-template',
  document.getElementById('logo-upload-section'),
  '#logo-previews',
  '#logo-target',
  'Logo',
  1,
  'logo',
);

// dropzone(
//   '/foes/logo',
//   'logo-template',
//   document.getElementById('logo-upload-section'),
//   '#logo-previews',
//   '#logo-target',
//   'Logo',
//   1,
//   'logo',
// );

// document.querySelector('.move-button').addEventListener('click', (e) => {
//   e.preventDefault();
//   const userSelected = document.getElementById('users-select-from');
//   const options = Array.from(
//     userSelected.querySelectorAll(':scope > option:checked'), (target) => target,
//   );
//   console.log(options);
// });
