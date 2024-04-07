const ERROR_MESSAGE_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUniqueIntegerFromRange = (min, max) => {
  const usedValues = [];

  return function () {
    if (usedValues.length >= max - min + 1) {
      return null;
    }

    let newValue = getRandomInteger(min, max);
    while (usedValues.includes(newValue)) {
      newValue = getRandomInteger(min, max);
    }

    usedValues.push(newValue);
    return newValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const openModal = (modal) => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = (modal) => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showErrorMessage = (errorMessageText) => {
  const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageTitle = errorMessage.querySelector('.data-error__title');
  errorMessageTitle.textContent = errorMessageText;
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ERROR_MESSAGE_SHOW_TIME);
};

const showSuccessMessage = (successMessageText) => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  const successMessageTitle = successMessage.querySelector('.success__title');
  const successMessageButton = successMessage.querySelector('.success__button');

  successMessageTitle.textContent = successMessageText;
  document.body.append(successMessage);

  successMessageButton.addEventListener('click', () => {
    successMessage.remove();
  });
};

const debounce = (callback, timeoutDelay = 250) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const setElementDisabledAttribute = (element, value) => {
  element.disabled = value;
};

export {debounce, closeModal, openModal, isEscapeKey, getUniqueIntegerFromRange, showErrorMessage, showSuccessMessage, setElementDisabledAttribute};
