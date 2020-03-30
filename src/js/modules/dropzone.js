/* eslint-disable */
import Dropzone from "dropzone";
import axios from "axios";
import slugify from "slugify"
/* eslint-enable */

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
function dropzone(url, templateId, uploadSection, previewsContainer, target, text, maxFiles = null, inputName, initUrl) {
  const previewNode = document.getElementById(templateId);
  if (!previewNode || !templateId) return;
  previewNode.id = '';
  const previewTemplate = previewNode.parentNode.innerHTML;
  let playerId;
  let foeId;
  let channelId;
  let songbookId;
  const myDropzone = new Dropzone(uploadSection, {
    url,
    maxFiles,
    previewTemplate,
    autoQueue: false,
    previewsContainer,
    withCredentials: true,
    init() {
      previewNode.remove();
      const thisDropzone = this;
      playerId = document.getElementById('player-id');
      foeId = document.getElementById('foe-id');
      channelId = document.getElementById('channel-id');
      songbookId = document.getElementById('songbook-id');
      if (playerId) {
        axios.get(`/players/images?playerId=${playerId.innerText}&type=${inputName.toLowerCase()}`, {
          withCredentials: true,
        })
          .then(({ data }) => {
            if (data.images) {
              for (const d of data.images) {
                var mockFile = {
                  name: `${data.name} image`,
                };
                thisDropzone.defaultOptions.addedfile.call(thisDropzone, mockFile);
                thisDropzone.defaultOptions.thumbnail.call(thisDropzone, mockFile, d);
                var tEl = document.querySelector(target);
                var input = document.createElement('input');
                input.value = d;
                input.setAttribute('data-id', `${slugify(data.name).toLowerCase()}-image`);
                input.classList.add = 'hidden';
                input.setAttribute('name', inputName);
                tEl.appendChild(input);
              }
            } else if (data.thumbnail.length) {
              var mockFile = {
                name: `${data.name} thumbnail`,
              };
              thisDropzone.defaultOptions.addedfile.call(thisDropzone, mockFile);
              thisDropzone.defaultOptions.thumbnail.call(thisDropzone, mockFile, data.thumbnail);
              var tEl = document.querySelector(target);
              var input = document.createElement('input');
              input.value = data.thumbnail;
              input.setAttribute('data-id', `${slugify(data.name).toLowerCase()}-thumbnail`);
              input.classList.add = 'hidden';
              input.setAttribute('name', inputName);
              tEl.appendChild(input);
            }
          }).catch((err) => {
            console.log(err);
          });
      } else if (foeId) {
        axios.get(`/foes/logos?foeId=${foeId.innerText}&type=${inputName.toLocaleLowerCase()}`, {
          withCredentials: true,
        })
          .then(({ data }) => {
            if (data.logo.length) {
              const mockFile = {
                name: `${data.name} logo`,
              };
              thisDropzone.defaultOptions.addedfile.call(thisDropzone, mockFile);
              thisDropzone.defaultOptions.thumbnail.call(thisDropzone, mockFile, data.logo);
              // debugger;
              const tEl = document.querySelector(target);
              const input = document.createElement('input');
              input.value = data.logo;
              input.setAttribute('data-id', `${slugify(data.name).toLowerCase()}-logo`);
              input.classList.add = 'hidden';
              input.setAttribute('name', inputName);
              tEl.appendChild(input);
            }
          }).catch((err) => {
            console.error(err);
          });
      } else if (channelId) {
        console.log(channelId);
        axios.get(`/channels/avatars?channelId=${channelId.innerText}&type=${inputName}`, {
          withCredentials: true,
        })
          .then(({ data }) => {
            console.log(data)
            if (data.avatarUrl.length) {
              const mockFile = {
                name: `${data.name} logo`,
              };
              thisDropzone.defaultOptions.addedfile.call(thisDropzone, mockFile);
              thisDropzone.defaultOptions.thumbnail.call(thisDropzone, mockFile, data.avatarUrl);
              // debugger;
              const tEl = document.querySelector(target);
              const input = document.createElement('input');
              input.value = data.logo;
              input.setAttribute('data-id', `${slugify(data.name).toLowerCase()}-avatar`);
              input.classList.add = 'hidden';
              input.setAttribute('name', inputName);
              tEl.appendChild(input);
            }
          }).catch((err) => {
            console.error(err);
          });
      } else if (songbookId) {
        axios.get(`/songbooks/covers?songbookId=${songbookId.innerText}&type=${inputName}`, {
          withCredentials: true
        })
          .then(({ data }) => {
            if (data.front_cover && data.front_cover.length) {
              const mockFile = {
                name: `${data.name}`,
              };
              thisDropzone.defaultOptions.addedfile.call(thisDropzone, mockFile);
              thisDropzone.defaultOptions.thumbnail.call(thisDropzone, mockFile, data.front_cover);
              const tEl = document.querySelector(target);
              const input = document.createElement('input');
              input.value = data.front_cover;
              input.setAttribute('data-id', `${slugify(data.name).toLowerCase()}-avatar`);
              input.classList.add = 'hidden';
              input.setAttribute('name', inputName);
              tEl.appendChild(input);
            } else if (data.back_cover && data.back_cover.length) {
              const mockFile = {
                name: `${data.name}`,
              };
              thisDropzone.defaultOptions.addedfile.call(thisDropzone, mockFile);
              thisDropzone.defaultOptions.thumbnail.call(thisDropzone, mockFile, data.back_cover);
              const tEl = document.querySelector(target);
              const input = document.createElement('input');
              input.value = data.back_cover;
              input.setAttribute('data-id', `${slugify(data.name).toLowerCase()}-avatar`);
              input.classList.add = 'hidden';
              input.setAttribute('name', inputName);
              tEl.appendChild(input);
						}
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  });

  let submitButton;

  myDropzone.on('addedfile', (file, res) => {
    const form = document.querySelector('main form');
    submitButton = form.querySelector("button[type='submit']");
    submitButton.setAttribute('disabled', 'disabled');
    submitButton.classList.add('cursor-disabled');
    submitButton.classList.add('opacity-75');
    if (!document.getElementById(`small-${slugify(text.toLowerCase())}`)) {
      const smallAlert = document.createElement('small');
      smallAlert.innerText = `Please upload ${text} to submit form`;
      smallAlert.id = `small-${slugify(text.toLowerCase())}`;
      smallAlert.classList.add('block');
      smallAlert.classList.add('text-red-700');
      submitButton.parentNode.appendChild(smallAlert);
    }
  });

  myDropzone.on('success', (_, res) => {
    const tEl = document.querySelector(target);
    const input = document.createElement('input');
    input.value = res.url;
    input.setAttribute('data-id', res.id);
    input.classList.add = 'hidden';
    input.setAttribute('name', inputName);
    tEl.appendChild(input);

    const form = document.querySelector('main form');
    submitButton = form.querySelector("button[type='submit']");
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('cursor-disabled');
    submitButton.classList.remove('opacity-75');
    if (document.querySelector(`#small-${slugify(text).toLowerCase()}`)) {
      document.querySelector(`#small-${slugify(text).toLowerCase()}`).remove();
    }
  });

  myDropzone.on('removedfile', ({ previewElement }) => {
    const img = previewElement.querySelector('img');
    if (playerId) {
      axios.post(`/players/remove-images?playerId=${playerId.innerText}&type=${slugify(inputName.toLowerCase())}`, {
        withCredentials: true,
        img: img.src,
      })
        .then(() => {
          const inputs = document.querySelectorAll(`input[name="${inputName.toLowerCase()}"]`);
          inputs.forEach((input) => {
            if (input.value == img.src) {
              input.remove();
            }
          });
        }).catch((err) => {
          console.error(err);
        });
    } else if (foeId) {
      axios.post(`/foes/remove-logo?foeId=${foeId.innerText}&type=${slugify(inputName.toLowerCase())}`, {
        withCredentials: true,
        img: img.src,
      })
        .then(() => {
          const _inputName = inputName.toLowerCase();
          const inputs = document.querySelectorAll(`input[name="${_inputName}"]`);
          inputs.forEach((input) => {
            if (input.value == img.src) {
              input.remove();
            }
          });
        }).catch((err) => {
          console.error(err);
        });
    } else if (channelId) {
      axios.post(`/channels/remove-avatar?channelId=${channelId.innerText}&type=${slugify(inputName.toLowerCase())}`, {
        withCredentials: true,
        img: img.src,
      })
        .then(() => {
          const inputs = document.querySelectorAll(`input[name="${inputName.toLowerCase()}]`);
          inputs.forEach((input) => {
            input.remove();
          });
        }).catch((err) => {
          console.error(err);
        });
    } else if (songbookId) {
      axios.post(`/songbooks/remove-cover?songbookId=${songbookId.innerText}&type=${slugify(inputName.toLowerCase())}`, {
        withCredentials: true,
        img: img.src
      })
        .then(() => {
          const inputs = document.querySelectorAll(`input[name="${inputName.toLowerCase()}"]`);
          inputs.forEach((input) => {
            input.remove();
          });
        }).catch((err) => {
          console.err(err)
        })
    }
    const form = document.querySelector('main form');
    submitButton = form.querySelector("button[type='submit']");
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('cursor-disabled');
    submitButton.classList.remove('opacity-75');
    const small = document.querySelector(`#small-${text.toLowerCase()}`);
    if (small) {
      small.remove();
    }
  });

  myDropzone.on('maxfilesexceeded', () => {
    alert(`Max files exceeded: ${maxFiles}`);
  });

  const progressBar = document.querySelector(`#${slugify(inputName.toLowerCase())} .progress-bar`);
  myDropzone.on('totaluploadprogress', (progress) => {
    progressBar.style.width = `${progress}%`;
  });

  const uploadButton = document.querySelector(`#${slugify(inputName.toLowerCase())} .actions .upload`);
  if (uploadButton) {
    uploadButton.onclick = function () {
      myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    };
  }

  const cancelButton = document.querySelector(`#${slugify(inputName.toLowerCase())} .actions .cancel`);
  if (cancelButton) {
    cancelButton.onclick = function () {
      myDropzone.removeAllFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    };
  }
}

export default dropzone;
