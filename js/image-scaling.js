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
  uploadScaleControlValueDisplay.value = `${scaleValueCurrent * 100}%`;
};

const scaleImageBigger = () => {
  if (scaleValueCurrent < SCALE_MAX_VALUE) {
    scaleValueCurrent += SCALE_CHANGE_STEP;
    uploadFormImagePreview.style.transform = `scale(${scaleValueCurrent})`;
    updateScaleControlValueDisplay();
  }
};

const scaleImageSmaller = () => {
  if (scaleValueCurrent > SCALE_MIN_VALUE) {
    scaleValueCurrent -= SCALE_CHANGE_STEP;
    uploadFormImagePreview.style.transform = `scale(${scaleValueCurrent})`;
    updateScaleControlValueDisplay();
  }
};

updateScaleControlValueDisplay();

const createScaling = () => {
  uploadScaleControlBigger.addEventListener('click', scaleImageBigger);
  uploadScaleControlSmaller.addEventListener('click', scaleImageSmaller);
};

const removeScaling = () => {
  uploadScaleControlBigger.removeEventListener('click', scaleImageBigger);
  uploadScaleControlSmaller.removeEventListener('click', scaleImageSmaller);

  scaleValueCurrent = SCALE_DEFAULT_VALUE;

};

export {createScaling, removeScaling};
