const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');

const openUploadOverlay = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeUploadOverlay = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

uploadInputElement.addEventListener('change', openUploadOverlay);
uploadCancelElement.addEventListener('click', closeUploadOverlay);
