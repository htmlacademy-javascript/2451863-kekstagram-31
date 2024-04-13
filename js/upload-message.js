import {isEscapeKey} from './utils.js';

const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplateElement.cloneNode(true);
const errorMessageButtonElement = errorMessageElement.querySelector('.error__button');
const errorMessageInnerElement = errorMessageElement.querySelector('.error__inner');

const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplateElement.cloneNode(true);
const successMessageButtonElement = successMessageElement.querySelector('.success__button');
const successMessageInnerElement = successMessageElement.querySelector('.success__inner');

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorDocumentClick = (evt) => {
  const withinErrorMessageBoundaries = evt.composedPath().includes(errorMessageInnerElement);
  if (!withinErrorMessageBoundaries) {
    closeErrorMessage();
  }
};

const showImageUploadErrorMessage = () => {
  document.body.append(errorMessageElement);

  errorMessageButtonElement.addEventListener('click', () => {
    errorMessageElement.remove();
  });

  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onErrorDocumentClick);
};

function closeErrorMessage () {
  errorMessageElement.remove();
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
  const withinSuccessMessageBoundaries = evt.composedPath().includes(successMessageInnerElement);
  if (!withinSuccessMessageBoundaries) {
    closeSuccessMessage();
  }
};

const showImageUploadSuccessMessage = () => {
  document.body.append(successMessageElement);

  successMessageButtonElement.addEventListener('click', () => {
    successMessageElement.remove();
  });

  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessDocumentClick);
};

function closeSuccessMessage () {
  successMessageElement.remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onSuccessDocumentClick);
}

export {showImageUploadSuccessMessage, showImageUploadErrorMessage};
