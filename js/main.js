import {renderMiniatures} from './render-miniatures.js';
import {onMiniatureClick} from './full-image.js';
import {getData, ERROR_MESSAGE} from './api.js';
import {showErrorMessage} from './utils.js';
import {setMiniatureSorting} from './sorting.js';
import {createUpload} from'./create-upload.js';

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

    setMiniatureSorting(pictures);
    createUpload();
  })
  .catch(() => {
    showErrorMessage(ERROR_MESSAGE.GET_DATA);
  });
