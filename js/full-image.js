import { isEscapeKey } from './utils.js';

const MIN_SHOWN_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentLoadButton = bigPicture.querySelector('.social__comments-loader');

const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');

const commentTemplate = bigPicture.querySelector('#comment').content.querySelector('li');
const commentSection = bigPicture.querySelector('.social__comments');
const commentsTotalCountDisplay = bigPicture.querySelector('.social__comment-total-count');
const commentsShownCountDisplay = bigPicture.querySelector('.social__comment-shown-count');

let comments;

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

const renderComment = (commentData) => {
  const comment = commentTemplate.cloneNode(true);

  comment.id = commentData.id;
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__text').textContent = commentData.message;

  commentSection.appendChild(comment);
};

const renderBigPictureComments = () => {
  let commentsShownCount = updateShownCommentsCount();
  const commentsToRender = (comments.length - commentsShownCount >= MIN_SHOWN_COMMENTS_COUNT) ? MIN_SHOWN_COMMENTS_COUNT : comments.length - commentsShownCount;

  for(let i = commentsShownCount; i < commentsShownCount + commentsToRender; i++) {
    renderComment(comments[i]);
  }

  commentsShownCount = updateShownCommentsCount();
  commentsShownCountDisplay.textContent = commentsShownCount;

  if (commentsShownCount === comments.length) {
    commentLoadButton.classList.add('hidden');
  }
};

const createBigPictureInformation = ({url, description, likes}) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureCaption.textContent = description;

  commentsTotalCountDisplay.textContent = comments.length;
  commentLoadButton.classList.remove('hidden');
  renderBigPictureComments();
};

const onMiniatureClick = (miniature) => {
  comments = miniature.comments;
  createBigPictureInformation(miniature);
  openBigPicture();
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
  bigPictureCancel.removeEventListener('click', closeBigPicture);

  commentLoadButton.removeEventListener('click', renderBigPictureComments);
  removeDisplayedComments();
}

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  bigPictureCancel.addEventListener('click', closeBigPicture);

  commentLoadButton.addEventListener('click', renderBigPictureComments);
}

export {onMiniatureClick};
