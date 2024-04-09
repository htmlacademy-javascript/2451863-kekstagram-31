const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFilters = uploadOverlay.querySelector('.img-upload__effects');
const uploadFilterValue = uploadOverlay.querySelector('.effect-level__value');
const uploadFilterSlider = uploadOverlay.querySelector('.effect-level__slider');
const uploadFilterSliderContainer = uploadOverlay.querySelector('.img-upload__effect-level');
const uploadFormImagePreview = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');

const filterType = {
  EFFECT_NONE: 'effect-none',
  EFFECT_CHROME: 'effect-chrome',
  EFFECT_SEPIA: 'effect-sepia',
  EFFECT_MARVIN: 'effect-marvin',
  EFFECT_PHOBOS: 'effect-phobos',
  EFFECT_HEAT: 'effect-heat',
};

const filterOptions = {
  'effect-chrome': {
    min: 0,
    max: 1,
    step: 0.1
  },
  'effect-sepia': {
    min: 0,
    max: 1,
    step: 0.1,
  },
  'effect-marvin': {
    min: 0,
    max: 100,
    step: 1,
  },
  'effect-phobos': {
    min: 0,
    max: 3,
    step: 0.1,
  },
  'effect-heat': {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

let selectedFilterType = filterType.EFFECT_NONE;

const setFilterNone = () => {
  uploadFormImagePreview.style.filter = null;
};

const setFilterChrome = () => {
  uploadFormImagePreview.style.filter = `grayscale(${uploadFilterValue.value})`;
};

const setFilterSepia = () => {
  uploadFormImagePreview.style.filter = `sepia(${uploadFilterValue.value})`;
};

const setFilterMarvin = () => {
  uploadFormImagePreview.style.filter = `invert(${uploadFilterValue.value}%)`;
};

const setFilterPhobos = () => {
  uploadFormImagePreview.style.filter = `blur(${uploadFilterValue.value}px)`;
};

const setFilterHeat = () => {
  uploadFormImagePreview.style.filter = `brightness(${uploadFilterValue.value})`;
};

const filterEffects = {
  'effect-none': setFilterNone,
  'effect-chrome': setFilterChrome,
  'effect-sepia': setFilterSepia,
  'effect-marvin': setFilterMarvin,
  'effect-phobos': setFilterPhobos,
  'effect-heat': setFilterHeat,
};

const applyFilterEffect = () => {
  filterEffects[selectedFilterType]();
};

const updateSliderOptions = (selectedFilterOptions) => {
  uploadFilterSlider.noUiSlider.updateOptions({
    range: {
      min: selectedFilterOptions.min,
      max: selectedFilterOptions.max
    },
    step: selectedFilterOptions.step,
    start: selectedFilterOptions.max,
    format: {
      to: function(value) {
        return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
      },
      from: function (value) {
        return value;
      }
    },
  });
};

const hideSlider = () => {
  uploadFilterSliderContainer.classList.add('hidden');
};

const showSlider = () => {
  uploadFilterSliderContainer.classList.remove('hidden');
};

const onFilterChange = (evt) => {
  evt.preventDefault();
  selectedFilterType = evt.target.closest('.effects__item').querySelector('input').id;

  if (selectedFilterType === filterType.EFFECT_NONE) {
    hideSlider();
    applyFilterEffect();
  } else {
    showSlider();
    updateSliderOptions(filterOptions[selectedFilterType]);
  }
};

const createFilterSlider = () => {
  noUiSlider.create(uploadFilterSlider, {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    start: 1,
    connect: 'lower',
  });

  hideSlider();

  uploadFilterSlider.noUiSlider.on('update', () => {
    uploadFilterValue.value = uploadFilterSlider.noUiSlider.get();
    applyFilterEffect();
  });

  uploadFilters.addEventListener('change', onFilterChange);
};

const removeFilterSlider = () => {
  uploadFilterSlider.noUiSlider.destroy();
};

export {createFilterSlider, removeFilterSlider};
