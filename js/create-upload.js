import {isEscapeKey, openModal, closeModal, setElementDisabledAttribute} from './utils.js';
import {validateForm, createPristineValidator, destroyPristineValidator} from './form-validation.js';
import {createScaling, removeScaling} from './image-scaling.js';
import {createFilterSlider, removeFilterSlider} from './filter-control.js';
import {sendData} from './api.js';
import {showImageUploadSuccessMessage, showImageUploadErrorMessage} from './upload-message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadSubmitElement = uploadFormElement.querySelector('.img-upload__submit');
const uploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const uploadEffectsPreviewElements = uploadFormElement.querySelectorAll('.effects__preview');
const uploadHashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadDescriptionInputElement = uploadFormElement.querySelector('.text__description');

const onEscKeydown = (evt) => {
  if (!document.querySelector('.error')) {
    if (document.activeElement === uploadHashtagsInputElement || document.activeElement === uploadDescriptionInputElement) {
      evt.stopPropagation();
    } else if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUploadOverlay();
    }
  }
};

const submitForm = () => {
  closeUploadOverlay();
  showImageUploadSuccessMessage();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (validateForm()) {
    setElementDisabledAttribute(uploadSubmitElement, true);

    sendData(new FormData(evt.target))
      .then(submitForm)
      .catch(() => {
        showImageUploadErrorMessage();
      })
      .finally(() => {
        setElementDisabledAttribute(uploadSubmitElement, false);
      });
  }
};

const openUploadOverlay = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const typeCheck = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (typeCheck) {
    const currentUploadImageSrc = URL.createObjectURL(file);

    uploadPreviewElement.src = currentUploadImageSrc;

    uploadEffectsPreviewElements.forEach((item) => {
      item.style.backgroundImage = `url(${currentUploadImageSrc})`;
    });

    openModal(uploadOverlayElement);

    document.addEventListener('keydown', onEscKeydown);
    uploadCancelElement.addEventListener('click', closeUploadOverlay);

    createPristineValidator();
    uploadFormElement.addEventListener('submit', onFormSubmit);

    createScaling();
    createFilterSlider();
  }
};

function closeUploadOverlay () {
  closeModal(uploadOverlayElement);

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancelElement.removeEventListener('click', closeUploadOverlay);

  uploadFormElement.removeEventListener('submit', onFormSubmit);
  destroyPristineValidator();

  uploadFormElement.reset();

  removeScaling();
  removeFilterSlider();

  uploadPreviewElement.src = DEFAULT_PREVIEW_SRC;
}

const createUpload = () => {
  uploadInputElement.addEventListener('change', openUploadOverlay);
};

export {createUpload};
