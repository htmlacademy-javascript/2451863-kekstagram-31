import {isEscapeKey, openModal, closeModal} from './utils.js';
import {validateForm} from './form-validation.js';

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
  openModal(uploadOverlayElement);

  document.addEventListener('keydown', onEscKeydown);
  uploadCancelElement.addEventListener('click', closeUploadOverlay);

  uploadFormElement.addEventListener('submit', validateForm);
}

function closeUploadOverlay () {
  closeModal(uploadOverlayElement);

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancelElement.removeEventListener('click', closeUploadOverlay);

  uploadFormElement.removeEventListener('submit', validateForm);

  uploadFormElement.reset();
}

uploadInputElement.addEventListener('change', openUploadOverlay);
