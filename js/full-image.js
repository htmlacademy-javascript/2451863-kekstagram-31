import { isEscapeKey } from './utils.js';

const MIN_SHOWN_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
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

const renderBigPictureComment = (commentInfo, commentTemplate, targetSection) => {
  const comment = commentTemplate.cloneNode(true);
  comment.id = commentInfo.id;
  comment.querySelector('.social__picture').src = commentInfo.avatar;
  comment.querySelector('.social__text').textContent = commentInfo.message;
  targetSection.appendChild(comment);
};

const createBigPictureComments = (comments) => {
  const commentTemplate = bigPicture.querySelector('#comment').content.querySelector('li');
  const commentSection = bigPicture.querySelector('.social__comments');

  const commentsShownCountDisplay = bigPicture.querySelector('.social__comment-shown-count');
  const commentsTotalCountDisplay = bigPicture.querySelector('.social__comment-total-count');

  bigPicture.querySelectorAll('.social__comment').forEach((elem) => elem.remove());

  const commentsTotalCount = comments.length;
  commentsTotalCountDisplay.textContent = commentsTotalCount;

  let commentsShownCount = (commentsTotalCount >= MIN_SHOWN_COMMENTS_COUNT) ? MIN_SHOWN_COMMENTS_COUNT : commentsTotalCount;
  commentsShownCountDisplay.textContent = commentsShownCount;

  for (let i = 0; i < commentsShownCount; i++) {
    renderBigPictureComment(comments[i], commentTemplate, commentSection);
  }
};

const createBigPictureInformation = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const onMiniatureClick = (miniature) => {
  createBigPictureInformation(miniature);
  createBigPictureComments(miniature.comments);
  openBigPicture();
};

export {onMiniatureClick};
