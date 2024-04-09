import {isEscapeKey, openModal, closeModal, setElementDisabledAttribute} from './utils.js';
import {validateForm, createPristineValidator, destroyPristineValidator, uploadHashtagsInput, uploadDescriptionInput} from './form-validation.js';
import {createScaling, removeScaling} from './image-scaling.js';
import {createFilterSlider, removeFilterSlider} from './filter-control.js';
import {sendData} from './api.js';
import {showImageUploadSuccessMessage, showImageUploadErrorMessage} from './upload-message.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadEffectsPreview = uploadForm.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';

const onEscKeydown = (evt) => {
  if (!document.querySelector('.error')) {
    if (document.activeElement === uploadHashtagsInput || document.activeElement === uploadDescriptionInput) {
      evt.stopPropagation();
    } else if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUploadOverlay();
    }
  }
};

function openUploadOverlay () {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const typeCheck = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (typeCheck) {
    const currentUploadImageSrc = URL.createObjectURL(file);

    uploadPreview.src = currentUploadImageSrc;

    uploadEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${currentUploadImageSrc})`;
    });

    openModal(uploadOverlay);

    document.addEventListener('keydown', onEscKeydown);
    uploadCancel.addEventListener('click', closeUploadOverlay);

    createPristineValidator();
    uploadForm.addEventListener('submit', onFormSubmit);

    createScaling();
    createFilterSlider();
  }
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

  uploadPreview.src = DEFAULT_PREVIEW_SRC;
}

function onFormSubmit (evt) {
  evt.preventDefault();

  if (validateForm()){
    setElementDisabledAttribute(uploadSubmit, true);
    sendData(new FormData(evt.target))
      .then(submitForm)
      .catch(() => {
        showImageUploadErrorMessage();
      })
      .finally(setElementDisabledAttribute(uploadSubmit, false));
  }
}

function submitForm () {
  closeUploadOverlay();
  showImageUploadSuccessMessage();
}

const createUpload = () => {
  uploadInput.addEventListener('change', openUploadOverlay);
};

export {createUpload};
