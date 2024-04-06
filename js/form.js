import {isEscapeKey, openModal, closeModal, showErrorMessage, showSuccessMessage} from './utils.js';
import {validateForm, createPristineValidator, destroyPristineValidator, uploadHashtagsInput, uploadDescriptionInput} from './form-validation.js';
import {createScaling, removeScaling} from './image-scaling.js';
import {createFilterSlider, removeFilterSlider} from './filter-control.js';
import {sendData, ErrorMessage, SuccessMessage} from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');

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
  uploadForm.addEventListener('submit', onFormSubmit);

  createScaling();
  createFilterSlider();
}

function closeUploadOverlay () {
  closeModal(uploadOverlay);

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancel.removeEventListener('click', closeUploadOverlay);

  uploadForm.removeEventListener('submit', onFormSubmit);
  destroyPristineValidator();

  uploadForm.reset();

  removeScaling();
  removeFilterSlider();
}

const blockSubmit = () => {
  uploadSubmit.disabled = true;
};

const unblockSubmit = () => {
  uploadSubmit.disabled = false;
};

function onFormSubmit (evt) {
  evt.preventDefault();

  if (validateForm()){
    blockSubmit();
    sendData(new FormData(evt.target))
      .then(submitForm)
      .catch(() => {
        showErrorMessage(ErrorMessage.SEND_DATA);
      })
      .finally(unblockSubmit());
  }
}

function submitForm () {
  closeUploadOverlay();
  showSuccessMessage(SuccessMessage);
}

uploadInput.addEventListener('change', openUploadOverlay);
