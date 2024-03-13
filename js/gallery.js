import {generateMiniatures} from './generate-miniatures.js';
import {renderMiniatures, miniaturesSection} from './render-miniatures.js';
import {onMiniatureClick} from './full-image.js';

const miniaturesList = generateMiniatures();
renderMiniatures(miniaturesList, miniaturesSection);
console.log(miniaturesList);

miniaturesSection.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const miniature = miniaturesList.find((elem) => elem.id === Number(evt.target.id));
    onMiniatureClick(miniature);
  }
});
