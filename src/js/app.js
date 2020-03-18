import dropzone from './modules/dropzone';
import SortList from './modules/sortable';

import 'alpinejs';

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

dropzone(
  '/channels/avatar',
  'avatar-template',
  document.getElementById('avatar-upload-section'),
  '#avatar-previews',
  '#avatar-target',
  'Avatar',
  1,
  'avatarUrl',
);

dropzone(
  '/songbooks/front-cover',
  'front_cover-template',
  document.getElementById('front_cover-upload-section'),
  '#front_cover-previews',
  '#front_cover-target',
  'front_cover',
  1,
  'front_cover',
);

dropzone(
  '/songbooks/back-cover',
  'back_cover-template',
  document.getElementById('back_cover-upload-section'),
  '#back_cover-previews',
  '#back_cover-target',
  'back_cover',
  1,
  'back_cover',
);
