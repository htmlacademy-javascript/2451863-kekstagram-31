import {isEscapeKey, openModal, closeModal} from './utils.js';

const MIN_SHOWN_COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentLoadButtonElement = bigPictureElement.querySelector('.social__comments-loader');

const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureCaptionElement = bigPictureElement.querySelector('.social__caption');

const commentTemplateElement = document.querySelector('#comment').content.querySelector('li');
const commentSectionElement = bigPictureElement.querySelector('.social__comments');
const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');

commentSectionElement.innerHTML = '';

let comments;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const updateShownCommentsCount = () => bigPictureElement.querySelectorAll('.social__comment').length;

const removeDisplayedComments = () => {
  bigPictureElement.querySelectorAll('.social__comment').forEach((elem) => elem.remove());
};

const renderComment = (commentData) => {
  const comment = commentTemplateElement.cloneNode(true);

  comment.id = commentData.id;
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__picture').alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;

  commentSectionElement.appendChild(comment);
};

const renderBigPictureComments = () => {
  let commentsShownCount = updateShownCommentsCount();
  const commentsToRender = (comments.length - commentsShownCount >= MIN_SHOWN_COMMENTS_COUNT) ? MIN_SHOWN_COMMENTS_COUNT : comments.length - commentsShownCount;

  for(let i = commentsShownCount; i < commentsShownCount + commentsToRender; i++) {
    renderComment(comments[i]);
  }

  commentsShownCount = updateShownCommentsCount();
  commentsShownCountElement.textContent = commentsShownCount;

  if (commentsShownCount === comments.length) {
    commentLoadButtonElement.classList.add('hidden');
  }
};

const createBigPictureInformation = ({url, description, likes}) => {
  bigPictureImageElement.src = url;
  bigPictureImageElement.alt = description;
  bigPictureLikesElement.textContent = likes;
  bigPictureCaptionElement.textContent = description;

  commentsTotalCountElement.textContent = comments.length;
  commentLoadButtonElement.classList.remove('hidden');
  renderBigPictureComments();
};

const openBigPicture = () => {
  openModal(bigPictureElement);

  document.addEventListener('keydown', onEscKeydown);
  bigPictureCancelElement.addEventListener('click', closeBigPicture);

  commentLoadButtonElement.addEventListener('click', renderBigPictureComments);
};

const onMiniatureClick = (miniature) => {
  comments = miniature.comments;
  createBigPictureInformation(miniature);
  openBigPicture();
};

function closeBigPicture() {
  closeModal(bigPictureElement);

  document.removeEventListener('keydown', onEscKeydown);
  bigPictureCancelElement.removeEventListener('click', closeBigPicture);

  commentLoadButtonElement.removeEventListener('click', renderBigPictureComments);
  removeDisplayedComments();
}

export {onMiniatureClick};
