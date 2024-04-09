import {isEscapeKey} from './utils.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorMessageButton = errorMessage.querySelector('.error__button');
const errorMessageInner = errorMessage.querySelector('.error__inner');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const successMessageButton = successMessage.querySelector('.success__button');
const successMessageInner = successMessage.querySelector('.success__inner');

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorDocumentClick = (evt) => {
  const withinErrorMessageBoundaries = evt.composedPath().includes(errorMessageInner);
  if (!withinErrorMessageBoundaries) {
    closeErrorMessage();
  }
};

const showImageUploadErrorMessage = () => {
  document.body.append(errorMessage);

  errorMessageButton.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onErrorDocumentClick);
};

function closeErrorMessage () {
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onErrorDocumentClick);
}

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessDocumentClick = (evt) => {
  const withinSuccessMessageBoundaries = evt.composedPath().includes(successMessageInner);
  if (!withinSuccessMessageBoundaries) {
    closeSuccessMessage();
  }
};

const showImageUploadSuccessMessage = () => {
  document.body.append(successMessage);

  successMessageButton.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessDocumentClick);
};

function closeSuccessMessage () {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onSuccessDocumentClick);
}

export {showImageUploadSuccessMessage, showImageUploadErrorMessage};
