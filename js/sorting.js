import {debounce, getUniqueIntegerFromRange} from './utils.js';
import {renderMiniatures, clearMiniatures} from './render-miniatures.js';

const RANDOM_PICTURE_COUNT = 10;

const Sort = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const sortingButtonsElement = document.querySelector('.img-filters');

const sortDiscussed = (miniatures) => miniatures.slice().sort((miniatureA, miniatureB) => miniatureB.comments.length - miniatureA.comments.length);

const sortRandom = (miniatures) => {
  const getMiniatureKey = getUniqueIntegerFromRange(0, miniatures.length - 1);
  const uniqueMiniatureKeys = Array.from({length: RANDOM_PICTURE_COUNT}, getMiniatureKey);

  const randomMiniatures = [];
  uniqueMiniatureKeys.forEach((key) => {
    randomMiniatures.push(miniatures[key]);
  });

  return randomMiniatures;
};

const sortMiniatures = (miniatures, sortingMode) => {
  switch(sortingMode) {
    case Sort.DEFAULT:
      return miniatures;
    case Sort.DISCUSSED:
      return sortDiscussed(miniatures);
    case Sort.RANDOM:
      return sortRandom(miniatures);
  }
};

const getSortingMode = () => sortingButtonsElement.querySelector('.img-filters__button--active').id;

const debounceMiniaturesRender = debounce((miniatures) => {
  clearMiniatures();
  renderMiniatures(miniatures);
});

const setMiniatureSorting = (miniatures) => {
  sortingButtonsElement.classList.remove('img-filters--inactive');

  sortingButtonsElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button')) {
      sortingButtonsElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');

      debounceMiniaturesRender(sortMiniatures(miniatures, getSortingMode()));
    }
  });
};

export {setMiniatureSorting};
