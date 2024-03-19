import { isEscapeKey } from './utils.js';

const MIN_SHOWN_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentLoadButton = bigPicture.querySelector('.social__comments-loader');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const updateShownCommentsCount = () => bigPicture.querySelectorAll('.social__comment').length;

const removeDisplayedComments = () => {
  bigPicture.querySelectorAll('.social__comment').forEach((elem) => elem.remove());
};

const renderComment = (commentData, commentTemplate, renderTarget) => {
  const comment = commentTemplate.cloneNode(true);

  comment.id = commentData.id;
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__text').textContent = commentData.message;

  renderTarget.appendChild(comment);
};

const renderBigPictureComments = (maxComments, comments, commentTemplate, renderTarget) => function () {
  let commentsShownCount = updateShownCommentsCount();
  const commentsShownCountDisplay = bigPicture.querySelector('.social__comment-shown-count');
  const commentsToRender = (maxComments - commentsShownCount >= MIN_SHOWN_COMMENTS_COUNT) ? MIN_SHOWN_COMMENTS_COUNT : maxComments - commentsShownCount;

  for(let i = commentsShownCount; i < commentsShownCount + commentsToRender; i++) {
    renderComment(comments[i], commentTemplate, renderTarget);
  }

  commentsShownCount = updateShownCommentsCount();
  commentsShownCountDisplay.textContent = commentsShownCount;

  if (commentsShownCount === maxComments) {
    commentLoadButton.classList.add('hidden');
  }
};

const createBigPictureComments = (comments) => {
  const commentTemplate = bigPicture.querySelector('#comment').content.querySelector('li');
  const commentSection = bigPicture.querySelector('.social__comments');

  const commentsTotalCountDisplay = bigPicture.querySelector('.social__comment-total-count');

  const commentsTotalCount = comments.length;
  commentsTotalCountDisplay.textContent = commentsTotalCount;

  const commentsRender = renderBigPictureComments(commentsTotalCount, comments, commentTemplate, commentSection);
  commentsRender();

  commentLoadButton.addEventListener('click', commentsRender);
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

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  bigPictureCancel.removeEventListener('click', closeBigPicture);
  removeDisplayedComments();
}

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  bigPictureCancel.addEventListener('click', closeBigPicture);
}

export {onMiniatureClick};
