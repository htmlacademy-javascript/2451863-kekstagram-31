const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadScaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const uploadScaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
const uploadScaleControlValueDisplay = uploadOverlay.querySelector('.scale__control--value');
const uploadFormImagePreview = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');

const SCALE_MAX_VALUE = 1;
const SCALE_DEFAULT_VALUE = SCALE_MAX_VALUE;
const SCALE_MIN_VALUE = 0.25;
const SCALE_CHANGE_STEP = 0.25;

let scaleValueCurrent = SCALE_DEFAULT_VALUE;

const updateScaleControlValueDisplay = () => {
  uploadScaleControlValueDisplay.setAttribute('value', `${scaleValueCurrent * 100}%`);
};

const updateImageScaleToCurrentValue = () => {
  uploadFormImagePreview.style.transform = `scale(${scaleValueCurrent})`;
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
  uploadScaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  uploadScaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
};

const removeScaling = () => {
  uploadScaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  uploadScaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);

  scaleValueCurrent = SCALE_DEFAULT_VALUE;
  updateImage();
};

export {createScaling, removeScaling};
