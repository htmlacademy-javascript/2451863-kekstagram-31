import {uploadForm} from './form.js';

const uploadScaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const uploadScaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const uploadScaleControlValueDisplay = uploadForm.querySelector('.scale__control--value');
const uploadFormImagePreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');

const SCALE_MAX_VALUE = 1;
const SCALE_DEFAULT_VALUE = SCALE_MAX_VALUE;
const SCALE_MIN_VALUE = 0.25;
const SCALE_CHANGE_STEP = 0.25;

let scaleValueCurrent = SCALE_DEFAULT_VALUE;

const updateScaleControlValueDisplay = () => {
  uploadScaleControlValueDisplay.textContent = `${scaleValueCurrent * 100}%`;
};

const scaleImageBigger = () => {
  console.log(scaleValueCurrent);
  if (scaleValueCurrent < SCALE_MAX_VALUE) {
    uploadScaleControlBigger.disabled = false;
    scaleValueCurrent += SCALE_CHANGE_STEP;
    uploadFormImagePreview.style.transform = `scale(${scaleValueCurrent})`;
  } else {
    uploadScaleControlBigger.disabled = true;
  }
};

const scaleImageSmaller = () => {
  console.log(scaleValueCurrent);
  if (scaleValueCurrent > SCALE_MIN_VALUE) {
    uploadScaleControlSmaller.disabled = false;
    scaleValueCurrent -= SCALE_CHANGE_STEP;
    uploadFormImagePreview.style.transform = `scale(${scaleValueCurrent})`;
  } else {
    uploadScaleControlSmaller.disabled = true;
  }
};

updateScaleControlValueDisplay();

uploadScaleControlBigger.addEventListener('click', () => {
  console.log('bigger');
  scaleImageBigger();
  updateScaleControlValueDisplay();
});

uploadScaleControlSmaller.addEventListener('click', () => {
  console.log('smaller');
  scaleImageSmaller();
  updateScaleControlValueDisplay();
});

