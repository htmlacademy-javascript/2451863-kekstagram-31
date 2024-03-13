const miniatureTemplate = document.querySelector('#picture').content.querySelector('a');
const miniaturesFragment = document.createDocumentFragment();
const miniaturesSection = document.querySelector('.pictures');

const renderMiniatures = (miniatures, renderTarget) => {
  miniatures.forEach(({id, url, description, likes, comments}) => {
    const newMiniature = miniatureTemplate.cloneNode(true);

    newMiniature.querySelector('img').id = id;
    newMiniature.querySelector('img').src = url;
    newMiniature.querySelector('img').alt = description;
    newMiniature.querySelector('.picture__likes').textContent = likes;
    newMiniature.querySelector('.picture__comments').textContent = comments.length;

    miniaturesFragment.appendChild(newMiniature);
  });

  renderTarget.appendChild(miniaturesFragment);
};

export {renderMiniatures, miniaturesSection};
