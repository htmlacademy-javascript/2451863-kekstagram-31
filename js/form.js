import { isEscapeKey } from './utils.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function openUploadOverlay () {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  uploadCancelElement.addEventListener('click', closeUploadOverlay);
}

function closeUploadOverlay () {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancelElement.removeEventListener('click', closeUploadOverlay);
}

uploadInputElement.addEventListener('change', openUploadOverlay);
