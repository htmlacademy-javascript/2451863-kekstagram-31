import {isEscapeKey, openModal, closeModal} from './utils.js';
import {validateForm, createPristineValidator, destroyPristineValidator, uploadHashtagsInputElement, uploadDescriptionInputElement} from './form-validation.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');

const onEscKeydown = (evt) => {
  if (document.activeElement === uploadHashtagsInputElement || document.activeElement === uploadDescriptionInputElement) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function openUploadOverlay () {
  openModal(uploadOverlayElement);

  document.addEventListener('keydown', onEscKeydown);
  uploadCancelElement.addEventListener('click', closeUploadOverlay);

  createPristineValidator();
  uploadFormElement.addEventListener('submit', validateForm);
}

function closeUploadOverlay () {
  closeModal(uploadOverlayElement);

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancelElement.removeEventListener('click', closeUploadOverlay);

  uploadFormElement.removeEventListener('submit', validateForm);
  destroyPristineValidator();

  uploadFormElement.reset();
}

uploadInputElement.addEventListener('change', openUploadOverlay);
