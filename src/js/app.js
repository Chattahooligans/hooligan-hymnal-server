import Alpine from "alpinejs";
// imporequire("dropzone");
import Dropzone from "dropzone";

var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
var myDropzone = new Dropzone(document.getElementById("upload-section"), {
  url: "/players/thumbnail",
  previewTemplate: previewTemplate,
  autoQueue: false,
  previewsContainer: "#previews",
})

document.querySelector("#actions .upload").onclick = function () {
  myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED))
}
myDropzone.on("success", (_, res) => {
  console.log(res);
  var target = document.querySelector("#target");
  var input = document.createElement("input");
  input.value = res.url;
  input.setAttribute("data-id", res.id);
  input.classList.add = "block";
  input.setAttribute("name", "images[]");
  target.appendChild(input);
  // console.log(res);
})
