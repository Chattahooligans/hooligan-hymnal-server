import dropzone from "./modules/dropzone";
import SortList from "./modules/sortable";
import "alpinejs";

SortList();

function dragAndSortHandler(items) {
	return {
		// Keeps track of when we leave the dropzone
		// Otherwise child events will trigger @dragloave
		dropcheck: 0,
		usedKeyboard: false,
		originalIndexBeingDragged: null,
		indexBeingDragged: null,
		indexBeingDraggedOver: null,
		openedContextMenu: null,
		items: items,
		preDragOrder: items,
    addItem(item) {
      this.items.push(item)
    },
    removeItem(index) {
      const items = this.items
      items.splice(index, 1)
      this.items = items
    },
		dragstart(event) {
			if (this.openedContextMenu) {
				// Without this the drag will show the context menu
				return this.closeContextMenu();
			}
			// Store a copy for when we drag out of range
			this.preDragOrder = [...this.items];
			// The index is continuously updated to reorder live and also keep a placeholder
			this.indexBeingDragged = event.target.getAttribute("x-ref");
			// The original is needed for then the drag leaves the container
			this.originalIndexBeingDragged = event.target.getAttribute("x-ref");
			// Not entirely sure this is needed but moz recommended it (?)
			event.dataTransfer.dropEffect = "copy";
		},
		updateListOrder(event) {
			// This fires every time you drag over another list item
			// It reorders the items array but maintains the placeholder
			if (this.indexBeingDragged) {
				this.indexBeingDraggedOver = event.target.getAttribute("x-ref");
				let from = this.indexBeingDragged;
				let to = this.indexBeingDraggedOver;

				if (this.indexBeingDragged == to) return;
				if (from == to) return;

				this.move(from, to);
				this.indexBeingDragged = to;
			}
		},
		// These are needed for the handle effect
		setParentDraggable(event) {
			event.target.closest("li").setAttribute("draggable", true);
		},
		setParentNotDraggable(event) {
			event.target.closest("li").setAttribute("draggable", false);
		},
		resetState() {
			this.dropcheck = 0;
			this.indexBeingDragged = null;
			this.preDragOrder = [...this.items];
			this.indexBeingDraggedOver = null;
			this.originalIndexBeingDragged = null;
		},
		// This acts as a cancelled event, when the item is dropped outside the container
		revertState() {
			this.items = this.preDragOrder.length ? this.preDragOrder : this.items;
			this.resetState();
		},
		// Just repositions the placeholder when we move out of range of the container
		rePositionPlaceholder() {
			this.items = [...this.preDragOrder];
			this.indexBeingDragged = this.originalIndexBeingDragged;
		},
		move(from, to) {
			let items = this.items;
			// console.log("start items", JSON.parse(JSON.stringify(items)));
			if (to >= items.length) {
				let k = to - items.length + 1;
				while (k--) {
					items.push(undefined);
				}
			}
			items.splice(to, 0, items.splice(from, 1)[0]);
			// console.log("end items", JSON.parse(JSON.stringify(items)));
			this.items = items;
		},
		// THe rest are just for adding better UX to the context menu
		openContextMenu(event) {
			this.openedContextMenu = event.target.closest("li").__x_for_key;
		},
		closeAllContextMenus() {
			this.openedContextMenu = null;
		},
		highlightFirstContextButton($event) {
			event.target.nextElementSibling.querySelector("button").focus();
		},
		highlightNextContextMenuItem(event) {
			event.target
				.closest("li")
				.nextElementSibling.querySelector("button")
				.focus();
		},
		highlightPreviousContextMenuItem(event) {
			event.target
				.closest("li")
				.previousElementSibling.querySelector("button")
				.focus();
		},
	};
}

window.dragAndSortHandler = dragAndSortHandler

dropzone(
	"/players/thumbnail",
	"thumbnail-template",
	document.getElementById("thumbnail-upload-section"),
	"#thumbnail-previews",
	"#thumbnail-target",
	"Thumbnail",
	1,
	"thumbnail"
);

dropzone(
	"/players/images",
	"images-template",
	document.getElementById("images-upload-section"),
	"#images-previews",
	"#images-target",
	"Player Images",
	10,
	"images"
);

dropzone(
	"/foes/logo",
	"logo-template",
	document.getElementById("logo-upload-section"),
	"#logo-previews",
	"#logo-target",
	"Logo",
	1,
	"logo"
);

dropzone(
	"/channels/avatar",
	"avatar-template",
	document.getElementById("avatar-upload-section"),
	"#avatar-previews",
	"#avatar-target",
	"Avatar",
	1,
	"avatarUrl"
);

dropzone(
	"/songbooks/front-cover",
	"front_cover-template",
	document.getElementById("front_cover-upload-section"),
	"#front_cover-previews",
	"#front_cover-target",
	"front_cover",
	1,
	"frontCover"
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
