import {getUniqueIntegerFromRange} from './utils.js';

const miniatureSorting = document.querySelector('.img-filters');

const RANDOM_PICTURE_COUNT = 10;

const Sort = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const setMiniatureSorting = (cb) => {
  miniatureSorting.classList.remove('img-filters--inactive');

  miniatureSorting.addEventListener('click', (evt) =>{
    if (evt.target.closest('.img-filters__button')) {
      miniatureSorting.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }
    cb();
  });
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
    case Sort.DEFAULT:
      return miniatures;
    case Sort.DISCUSSED:
      return sortDiscussed(miniatures);
    case Sort.RANDOM:
      return sortRandom(miniatures);
  }
};

const getSortingMode = () => miniatureSorting.querySelector('.img-filters__button--active').id;

export {setMiniatureSorting, getSortingMode, sortMiniatures};
