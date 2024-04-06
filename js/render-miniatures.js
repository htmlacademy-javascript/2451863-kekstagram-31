import {getSortingMode, sortMiniatures} from './sorting.js';

const miniatureTemplate = document.querySelector('#picture').content.querySelector('a');
const miniaturesFragment = document.createDocumentFragment();
const miniaturesSection = document.querySelector('.pictures');

const clearMiniatures = () => {
  miniaturesSection.querySelectorAll('.picture').forEach((elem) => {
    elem.remove();
  });
};

const renderMiniatures = (miniatures) => {
  clearMiniatures();

  const sortingMode = getSortingMode();

  const miniaturesToRender = sortMiniatures(miniatures, sortingMode);

  miniaturesToRender.forEach(({id, url, description, likes, comments}) => {
    const newMiniature = miniatureTemplate.cloneNode(true);

    newMiniature.querySelector('img').id = id;
    newMiniature.querySelector('img').src = url;
    newMiniature.querySelector('img').alt = description;
    newMiniature.querySelector('.picture__likes').textContent = likes;
    newMiniature.querySelector('.picture__comments').textContent = comments.length;

    miniaturesFragment.appendChild(newMiniature);
  });

  miniaturesSection.appendChild(miniaturesFragment);
};

export {renderMiniatures};
