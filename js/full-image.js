import { isEscapeKey } from './utils.js';

const MIN_SHOWN_COMMENTS_COUNT = 3;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};



const tempCommentsCountAndLoadDisable = () => {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  bigPictureCancel.removeEventListener('click', closeBigPicture);
}

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  bigPictureCancel.addEventListener('click', closeBigPicture);
}

const renderPictureComments = (comments) => {
  const commentTemplate = bigPicture.querySelector('.social__comment');
  const commentSection = bigPicture.querySelector('.social__comments');
  const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
  const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');

  bigPicture.querySelectorAll('.social__comment').forEach((elem) => elem.remove());

  commentsShownCount.textContent = (comments.length >= MIN_SHOWN_COMMENTS_COUNT) ? MIN_SHOWN_COMMENTS_COUNT : comments.length;
  commentsTotalCount.textContent = comments.length;

  for (let i = 0; i < Number(commentsShownCount.textContent); i++) {
    const comment = commentTemplate.cloneNode(true);
    //comment.id = comments[i].id;
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__text').textContent = comments[i].message;
    commentSection.appendChild(comment);
  }

  tempCommentsCountAndLoadDisable();
};

const renderPictureInformation = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  renderPictureComments(comments);
};

const onMiniatureClick = (miniature) => {
  renderPictureInformation(miniature);
  openBigPicture();
};

export {onMiniatureClick};
