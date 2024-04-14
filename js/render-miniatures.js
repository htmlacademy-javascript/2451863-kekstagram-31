const miniatureTemplateElement = document.querySelector('#picture').content.querySelector('a');
const miniaturesFragmentElement = document.createDocumentFragment();
const miniaturesSectionElement = document.querySelector('.pictures');

const clearMiniatures = () => {
  miniaturesSectionElement.querySelectorAll('.picture').forEach((elem) => {
    elem.remove();
  });
};

const renderMiniatures = (miniatures) => {
  miniatures.forEach(({id, url, description, likes, comments}) => {
    const newMiniature = miniatureTemplateElement.cloneNode(true);

    newMiniature.querySelector('img').id = id;
    newMiniature.querySelector('img').src = url;
    newMiniature.querySelector('img').alt = description;
    newMiniature.querySelector('.picture__likes').textContent = likes;
    newMiniature.querySelector('.picture__comments').textContent = comments.length;

    miniaturesFragmentElement.appendChild(newMiniature);
  });

  miniaturesSectionElement.appendChild(miniaturesFragmentElement);
};

export {renderMiniatures, clearMiniatures};
