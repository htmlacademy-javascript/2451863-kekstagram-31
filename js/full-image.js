const bigPicture = document.querySelector('.big-picture');

const onMiniatureClick = ({id, url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');

  // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  // Количество лайков likes подставьте как текстовое содержание элемента .likes-count
  bigPicture.querySelector('.likes-count').textContent = likes;
  // Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
  bigPicture.querySelector('.social__comment-shown-count').textContent = 3;
  // Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;


};

export {onMiniatureClick};
