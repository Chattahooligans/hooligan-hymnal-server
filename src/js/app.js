import dropzone from './modules/dropzone';
import SortList from './modules/sortable';

import 'alpinejs';

SortList();

window.dragAndSortHandler = function dragAndSortHandler(items) {
	return {
		items: items,
		usedKeyboard: false,
		placeholder: document.createElement('li'),
		theElementBeingDragged: null,
		theElementBeingDraggedOver: null,
		openedContextMenu: null,
		setupPlaceholder() {
			this.placeholder.style.setProperty('padding', '0.5rem 0')
			this.placeholder.style.setProperty('pointer-events', 'none')
		},
		dragstart(event) {
			if (this.openedContextMenu) {
				return this.closeContextMenu()
			}
			this.theElementBeingDragged = event.target
			event.dataTransfer.dropEffect = "move"
			const rect = event.target.getBoundingClientRect()
			this.placeholder.style.setProperty('width', rect.width + 'px')
			this.placeholder.style.setProperty('height', rect.height + 'px')

			this.$nextTick(() => {
				event.target.style.setProperty('display', 'none')
			})
		},
		insertPlaceHolderBelow(event) {
			if (!this.theElementBeingDragged) return
			this.theElementBeingDraggedOver = event.target
			if (event.target.previousElementSibling != this.placeholder) {
				this.$el.insertBefore(this.placeholder, event.target)
			}
		},
		setParentDraggable(event) {
			event.target.closest('li').setAttribute('draggable', true)
		},
		setParentNotDraggable(event) {
			event.target.closest('li').setAttribute('draggable', false)
		},
		resetState() {
			if (this.theElementBeingDragged) {
				this.theElementBeingDragged.style.setProperty('display', 'list-item')
			}
			this.theElementBeingDragged = null
			this.theElementBeingDraggedOver = null
			this.placeholder.remove()
		},
		insertListItem(event) {
			if (!this.theElementBeingDragged || !this.theElementBeingDraggedOver) {
				return this.resetState()
			}
			let from = this.theElementBeingDragged.__x_for_key
			let to = this.theElementBeingDraggedOver.__x_for_key

			if (from < to) {
				to = to -1
			}

  			this.move(from, to)
			this.resetState()
		},
		move(from, to) {
			const items = this.items
    		if (to >= items.length) {
        		const k = to - items.length + 1
				while (k--) {
					items.push(undefined)
				}
			}
			items.splice(to, 0, items.splice(from, 1)[0])
			this.items = items
		},
		openContextMenu(event) {
			this.openedContextMenu = event.target.closest('li').__x_for_key

		},
		closeAllContextMenus() {
			this.openedContextMenu = null
		},
		highlightFirstContextButton($event) {
			event.target.nextElementSibling.querySelector('button').focus()
		},
		highlightNextContextMenuItem(event) {
			event.target.closest('li').nextElementSibling.querySelector('button').focus()
		},
		highlightPreviousContextMenuItem(event) {
			event.target.closest('li').previousElementSibling.querySelector('button').focus()
		},
	}
}

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
  'frontCover',
);

// dropzone(
//   '/songbooks/back-cover',
//   'back_cover-template',
//   document.getElementById('back_cover-upload-section'),
//   '#back_cover-previews',
//   '#back_cover-target',
//   'back_cover',
//   1,
//   'back_cover',
// );
