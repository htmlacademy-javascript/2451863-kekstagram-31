const FilterType = {
  EFFECT_NONE: 'effect-none',
  EFFECT_CHROME: 'effect-chrome',
  EFFECT_SEPIA: 'effect-sepia',
  EFFECT_MARVIN: 'effect-marvin',
  EFFECT_PHOBOS: 'effect-phobos',
  EFFECT_HEAT: 'effect-heat',
};

const FilterOptions = {
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

const FilterEffects = {
  'effect-none': setFilterNone,
  'effect-chrome': setFilterChrome,
  'effect-sepia': setFilterSepia,
  'effect-marvin': setFilterMarvin,
  'effect-phobos': setFilterPhobos,
  'effect-heat': setFilterHeat,
};

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFiltersElement = uploadOverlayElement.querySelector('.img-upload__effects');
const uploadFilterValueElement = uploadOverlayElement.querySelector('.effect-level__value');
const uploadFilterSliderContainerElement = uploadOverlayElement.querySelector('.img-upload__effect-level');
const uploadFilterSliderElement = uploadOverlayElement.querySelector('.effect-level__slider');
const uploadFormImagePreviewElement = uploadOverlayElement.querySelector('.img-upload__preview').querySelector('img');

let selectedFilterType = FilterType.EFFECT_NONE;

function setFilterNone () {
  uploadFormImagePreviewElement.style.filter = null;
}

function setFilterChrome () {
  uploadFormImagePreviewElement.style.filter = `grayscale(${uploadFilterValueElement.value})`;
}

function setFilterSepia () {
  uploadFormImagePreviewElement.style.filter = `sepia(${uploadFilterValueElement.value})`;
}

function setFilterMarvin () {
  uploadFormImagePreviewElement.style.filter = `invert(${uploadFilterValueElement.value}%)`;
}

function setFilterPhobos () {
  uploadFormImagePreviewElement.style.filter = `blur(${uploadFilterValueElement.value}px)`;
}

function setFilterHeat () {
  uploadFormImagePreviewElement.style.filter = `brightness(${uploadFilterValueElement.value})`;
}

const applyFilterEffect = () => {
  FilterEffects[selectedFilterType]();
};

const updateSliderOptions = (selectedFilterOptions) => {
  uploadFilterSliderElement.noUiSlider.updateOptions({
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
  uploadFilterSliderContainerElement.classList.add('hidden');
};

const showSlider = () => {
  uploadFilterSliderContainerElement.classList.remove('hidden');
};

const onFilterChange = (evt) => {
  evt.preventDefault();
  selectedFilterType = evt.target.closest('.effects__item').querySelector('input').id;

  if (selectedFilterType === FilterType.EFFECT_NONE) {
    hideSlider();
    applyFilterEffect();
  } else {
    showSlider();
    updateSliderOptions(FilterOptions[selectedFilterType]);
  }
};

const createFilterSlider = () => {
  noUiSlider.create(uploadFilterSliderElement, {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    start: 1,
    connect: 'lower',
  });

  hideSlider();

  uploadFilterSliderElement.noUiSlider.on('update', () => {
    uploadFilterValueElement.setAttribute('value', uploadFilterSliderElement.noUiSlider.get());
    applyFilterEffect();
  });

  uploadFiltersElement.addEventListener('change', onFilterChange);
};

const removeFilterSlider = () => {
  uploadFilterSliderElement.noUiSlider.destroy();
};

export {createFilterSlider, removeFilterSlider};
