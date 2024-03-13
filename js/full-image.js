const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');

const onMiniatureClick = (miniature) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.querySelector('img').src = miniature.url;

  // Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
  // Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
  // Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
};

export {onMiniatureClick};
