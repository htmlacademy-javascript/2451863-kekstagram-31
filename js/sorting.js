import {debounce, getUniqueIntegerFromRange} from './utils.js';
import {renderMiniatures, clearMiniatures} from './render-miniatures.js';

const sortingButtonsContainer = document.querySelector('.img-filters');

const RANDOM_PICTURE_COUNT = 10;

const SORT = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const sortDiscussed = (miniatures) => miniatures.slice().sort((miniatureA, miniatureB) => miniatureB.comments.length - miniatureA.comments.length);

const sortRandom = (miniatures) => {
  const getMiniatureKey = getUniqueIntegerFromRange(0, miniatures.length - 1);
  const uniqueMiniatureKeys = Array.from({length: RANDOM_PICTURE_COUNT}, getMiniatureKey);

  const randomMiniatureList = [];
  uniqueMiniatureKeys.forEach((key) => {
    randomMiniatureList.push(miniatures[key]);
  });

  return randomMiniatureList;
};

const sortMiniatures = (miniatures, sortingMode) => {
  switch(sortingMode) {
    case SORT.DEFAULT:
      return miniatures;
    case SORT.DISCUSSED:
      return sortDiscussed(miniatures);
    case SORT.RANDOM:
      return sortRandom(miniatures);
  }
};

const getSortingMode = () => sortingButtonsContainer.querySelector('.img-filters__button--active').id;

const setMiniatureSorting = (miniatures) => {
  sortingButtonsContainer.classList.remove('img-filters--inactive');

  sortingButtonsContainer.addEventListener('click', debounce((evt) =>{
    if (evt.target.closest('.img-filters__button')) {
      sortingButtonsContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      clearMiniatures();
      renderMiniatures(sortMiniatures(miniatures, getSortingMode()));
    }
  }));
};

export {setMiniatureSorting};
