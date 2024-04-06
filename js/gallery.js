import {renderMiniatures} from './render-miniatures.js';
import {onMiniatureClick} from './full-image.js';
import {getData, ErrorMessage} from './api.js';
import {showErrorMessage} from './utils.js';
import {setMiniatureSorting} from './sorting.js';

const miniaturesSection = document.querySelector('.pictures');

getData()
  .then((pictures) => {
    renderMiniatures(pictures);

    miniaturesSection.addEventListener('click', (evt) => {
      if (evt.target.closest('.picture')) {
        const miniature = pictures.find((elem) => elem.id === Number(evt.target.id));
        onMiniatureClick(miniature);
      }
    });

    setMiniatureSorting(() => renderMiniatures(pictures));
  })
  .catch(() => {
    showErrorMessage(ErrorMessage.GET_DATA);
  });
