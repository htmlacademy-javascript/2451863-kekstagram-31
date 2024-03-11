import {generateMiniatures} from './generate-miniatures.js';

const miniatureTemplate = document.querySelector('#picture').content.querySelector('a');
const miniaturesFragment = document.createDocumentFragment();
const miniaturesSection = document.querySelector('.pictures');

const miniatures = generateMiniatures();

miniatures.forEach((miniature) => {
  const newMiniature = miniatureTemplate.cloneNode(true);

  newMiniature.querySelector('img').src = miniature.url;
  newMiniature.querySelector('img').alt = miniature.description;
  newMiniature.querySelector('.picture__likes').textContent = miniature.likes;
  newMiniature.querySelector('.picture__comments').textContent = miniature.comments.length;

  miniaturesFragment.appendChild(newMiniature);
});

const drawMiniatures = () => miniaturesSection.appendChild(miniaturesFragment);

export {drawMiniatures};
