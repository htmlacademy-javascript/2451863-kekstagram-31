import { isEscapeKey } from "./utils.js";

const SHOWN_COMMENTS_COUNT = 3;

const bigPicture = document.querySelector('.big-picture');

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
}

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
}

const renderPictureComments = (comments) => {
  const commentTemplate = bigPicture.querySelector('.social__comment');
  const commentSection = bigPicture.querySelector('.social__comments');
  const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
  const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');

  bigPicture.querySelectorAll('.social__comment').forEach((elem) => elem.remove());

  commentsShownCount.textContent = (comments.length >= SHOWN_COMMENTS_COUNT) ? SHOWN_COMMENTS_COUNT : comments.length;
  commentsTotalCount.textContent = comments.length;

  for (let i = 0; i < Number(commentsShownCount.textContent); i++) {
    const comment = commentTemplate.cloneNode(true);
    //comment.id = comments[i].id;
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__text').textContent = comments[i].message;
    commentSection.appendChild(comment);
  }
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

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);

export {onMiniatureClick};
