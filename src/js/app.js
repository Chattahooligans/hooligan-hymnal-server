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
