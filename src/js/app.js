import Alpine from "alpinejs";
// imporequire("dropzone");
import Dropzone from "dropzone";
import axios from "axios";
import slugify from "slugify"
/**
 *
 * @param {String} url
 * @param {String} templateId
 * @param {Element} uploadSection
 * @param {String} previewsContainer
 * @param {String} target
 * @param {String} text
 * @param {Number} maxFiles
 * @param {String} inputName
 * @param {String} initUrl
 */
function dropzone(url, templateId, uploadSection, previewsContainer, target, text, maxFiles = false, inputName, initUrl) {
  var previewNode = document.getElementById(templateId);
  if (!previewNode || !templateId) return;
  previewNode.id = "";
  var previewTemplate = previewNode.parentNode.innerHTML;
  let playerId;
  var myDropzone = new Dropzone(uploadSection, {
    url: url,
    maxFiles: maxFiles,
    uploadMultiple: false,
    previewTemplate: previewTemplate,
    autoQueue: false,
    previewsContainer: previewsContainer,
    withCredentials: true,
    init: function() {
        previewNode.remove();
        const thisDropzone = this;
        playerId = document.getElementById("player-id");
        if (playerId) {
          axios.get(`/players/${playerId.innerText}/thumbnail`)
            .then(({ data }) => {
              if (Array.isArray(data)) {
              } else {
                // console.log(data);
                var mockFile = {
                  name: `${data.name} thumbnail`,
                }
                thisDropzone.defaultOptions.addedfile.call(thisDropzone, mockFile);
                thisDropzone.defaultOptions.thumbnail.call(thisDropzone, mockFile, data.thumbnail);
                var tEl = document.querySelector(target);
                var input = document.createElement("input");
                input.value = data.thumbnail;
                input.setAttribute("data-id", `${slugify(data.name).toLowerCase()}-thumbnail`);
                input.classList.add = "hidden";
                input.setAttribute("name", inputName);
                tEl.appendChild(input);
              }
            }).catch(err => {
              console.log(err);
            });
        }
    }
  });

  let submitButton;

  myDropzone.on("addedfile", function (file, res){
    console.log(file, res);
    const form = document.querySelector("main form");
    submitButton = form.querySelector("button[type='submit']");
    submitButton.setAttribute("disabled", "disabled");
    submitButton.classList.add("cursor-disabled");
    submitButton.classList.add("opacity-75");
    const smallAlert = document.createElement("small");
    smallAlert.innerText = `Please upload ${text} to submit form`;
    smallAlert.id = text.toLowerCase();
    smallAlert.classList.add("block");
    smallAlert.classList.add("text-red-700");
    submitButton.parentNode.appendChild(smallAlert);
  });

  myDropzone.on("success", (_, res) => {
    var tEl = document.querySelector(target);
    var input = document.createElement("input");
    input.value = res.url;
    input.setAttribute("data-id", res.id);
    input.classList.add = "hidden";
    input.setAttribute("name", inputName);
    tEl.appendChild(input);

    const form = document.querySelector("main form");
    submitButton = form.querySelector("button[type='submit']");
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("cursor-disabled");
    submitButton.classList.remove("opacity-75");
    document.querySelector(`small[id="${slugify(text).toLowerCase()}"]`).remove();
  });

  myDropzone.on("removedfile", ({ previewElement }) => {
    const img = previewElement.querySelector("img");
    if (playerId) {
      axios.post(`/players/${playerId.innerText}/thumbnail/delete`)
        .then(({ data }) => {
          let innerHTML = document.querySelector(`${target}`).childNodes;
          innerHTML[0].value = "";
        }).catch(err => {
          console.log(err);
        })
    }
    const form = document.querySelector("main form");
    submitButton = form.querySelector("button[type='submit']");
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("cursor-disabled");
    submitButton.classList.remove("opacity-75");
    const small = document.querySelector(`small[id="${text.toLowerCase()}"]`);
    if (small) {
      small.remove();
    }
  });

  myDropzone.on("maxfilesexceeded", function () {
    alert(`Max files exceeded: ${maxFiles}`)
  });

  document.querySelector("#thumbnail #actions .upload").onclick = function() {
    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
  };

  document.querySelector("#thumbnail #actions .cancel").onclick = function() {
    myDropzone.removeAllFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
  };
}

dropzone(
  "/players/thumbnail",
  "thumbnail-template",
  document.getElementById("thumbnail-upload-section"),
  "#thumbnail-previews",
  "#thumbnail-target",
  "Thumbnail",
  1,
  "thumbnail"
)
