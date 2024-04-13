const SCALE_MAX_VALUE = 1;
const SCALE_DEFAULT_VALUE = SCALE_MAX_VALUE;
const SCALE_MIN_VALUE = 0.25;
const SCALE_CHANGE_STEP = 0.25;

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadScaleControlSmallerElement = uploadOverlayElement.querySelector('.scale__control--smaller');
const uploadScaleControlBiggerElement = uploadOverlayElement.querySelector('.scale__control--bigger');
const uploadScaleControlValueElement = uploadOverlayElement.querySelector('.scale__control--value');
const uploadFormImagePreviewElement = uploadOverlayElement.querySelector('.img-upload__preview').querySelector('img');

let scaleValueCurrent = SCALE_DEFAULT_VALUE;

const updateScaleControlValueDisplay = () => {
  uploadScaleControlValueElement.setAttribute('value', `${scaleValueCurrent * 100}%`);
};

const updateImageScaleToCurrentValue = () => {
  uploadFormImagePreviewElement.style.transform = `scale(${scaleValueCurrent})`;
};

const updateImage = () => {
  updateImageScaleToCurrentValue();
  updateScaleControlValueDisplay();
};

const onScaleControlBiggerClick = () => {
  if (scaleValueCurrent < SCALE_MAX_VALUE) {
    scaleValueCurrent += SCALE_CHANGE_STEP;
    updateImage();
  }
};

const onScaleControlSmallerClick = () => {
  if (scaleValueCurrent > SCALE_MIN_VALUE) {
    scaleValueCurrent -= SCALE_CHANGE_STEP;
    updateImage();
  }
};

const createScaling = () => {
  uploadScaleControlBiggerElement.addEventListener('click', onScaleControlBiggerClick);
  uploadScaleControlSmallerElement.addEventListener('click', onScaleControlSmallerClick);
};

const removeScaling = () => {
  uploadScaleControlBiggerElement.removeEventListener('click', onScaleControlBiggerClick);
  uploadScaleControlSmallerElement.removeEventListener('click', onScaleControlSmallerClick);

  scaleValueCurrent = SCALE_DEFAULT_VALUE;
  updateImage();
};

export {createScaling, removeScaling};
