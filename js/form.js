import {isEscapeKey, openModal, closeModal} from './utils.js';
import {validateForm, createPristineValidator, destroyPristineValidator, uploadHashtagsInput, uploadDescriptionInput} from './form-validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');

const onEscKeydown = (evt) => {
  if (document.activeElement === uploadHashtagsInput || document.activeElement === uploadDescriptionInput) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function openUploadOverlay () {
  openModal(uploadOverlay);

  document.addEventListener('keydown', onEscKeydown);
  uploadCancel.addEventListener('click', closeUploadOverlay);

  createPristineValidator();
  uploadForm.addEventListener('submit', validateForm);
}

function closeUploadOverlay () {
  closeModal(uploadOverlay);

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancel.removeEventListener('click', closeUploadOverlay);

  uploadForm.removeEventListener('submit', validateForm);
  destroyPristineValidator();

  uploadForm.reset();
}

uploadInput.addEventListener('change', openUploadOverlay);
