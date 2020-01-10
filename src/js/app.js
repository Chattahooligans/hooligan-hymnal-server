import Alpine from "alpinejs";
// imporequire("dropzone");
import Dropzone from "dropzone";

function dropzone(url, templateId, uploadSection, previewsContainer, target, text, maxFiles = false) {
  var previewNode = document.getElementById(templateId);
  if (!previewNode || !templateId) return;
  previewNode.id = "";
  var previewTemplate = previewNode.parentNode.innerHTML;
  var myDropzone = new Dropzone(uploadSection, {
    url: url,
    maxFiles: maxFiles,
    uploadMultiple: false,
    previewTemplate: previewTemplate,
    autoQueue: false,
    previewsContainer: previewsContainer
  });

  let submitButton

  myDropzone.on("addedfile", function (res){
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
    // smallAlert.insertAdjacentElement(submitButton, smallAlert);
  });

  myDropzone.on("success", (_, res) => {
    console.log(res);
    var target = document.querySelector(target);
    var input = document.createElement("input");
    input.value = res.url;
    input.setAttribute("data-id", res.id);
    input.classList.add = "hidden";
    input.setAttribute("name", "images[]");
    target.appendChild(input);
  });

  // myDropzone.on("maxfilesreached", function() {
  //   alert("Max number of files reached");
  // });

  myDropzone.on("maxfilesexceeded", function () {
    alert(`Max files exceeded: ${maxFiles}`)
  });
}

dropzone(
  "/players/thumbnail",
  "thumbnail-template",
  document.getElementById("thumbnail-upload-section"),
  "#thumbnail-previews",
  "#thumbnail-target",
  "Thumbnail",
  1
)

// var previewNode = document.querySelector("#template");
// previewNode.id = "";
// var previewTemplate = previewNode.parentNode.innerHTML;
// var myDropzone = new Dropzone(document.getElementById("upload-section"), {
//   url: "/players/thumbnail",
//   previewTemplate: previewTemplate,
//   autoQueue: false,
//   previewsContainer: "#previews",
// })

// document.querySelector("#actions .upload").onclick = function () {
//   myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED))
// }
// myDropzone.on("success", (_, res) => {
//   console.log(res);
//   var target = document.querySelector("#target");
//   var input = document.createElement("input");
//   input.value = res.url;
//   input.setAttribute("data-id", res.id);
//   input.classList.add = "block";
//   input.setAttribute("name", "images[]");
//   target.appendChild(input);
//   // console.log(res);
// })
