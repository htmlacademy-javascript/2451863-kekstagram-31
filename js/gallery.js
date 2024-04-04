import {renderMiniatures, miniaturesSection} from './render-miniatures.js';
import {onMiniatureClick} from './full-image.js';
import {getData, ERROR_MESSAGE} from './api.js';
import {showErrorMessage} from './utils.js';

getData()
  .then((pictures) => {
    renderMiniatures(pictures);

    miniaturesSection.addEventListener('click', (evt) => {
      if (evt.target.closest('.picture')) {
        const miniature = pictures.find((elem) => elem.id === Number(evt.target.id));
        onMiniatureClick(miniature);
      }
    });
  })
  .catch(() => {
    showErrorMessage(ERROR_MESSAGE.GET_DATA);
  });
