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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const setElementDisabledAttribute = (element, value) => {
  element.disabled = value;
};

export {debounce, closeModal, openModal, isEscapeKey, getUniqueIntegerFromRange, setElementDisabledAttribute};
