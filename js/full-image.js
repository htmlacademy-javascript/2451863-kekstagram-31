const SHOWN_COMMENTS_COUNT = 3;

const bigPicture = document.querySelector('.big-picture');

const onMiniatureClick = ({id, url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');

  // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  // Количество лайков likes подставьте как текстовое содержание элемента .likes-count
  bigPicture.querySelector('.likes-count').textContent = likes;
  // Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
  bigPicture.querySelector('.social__comment-shown-count').textContent = SHOWN_COMMENTS_COUNT;
  // Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;

  const commentTemplate = bigPicture.querySelector('.social__comment');
  bigPicture.querySelectorAll('.social__comment').forEach((elem) => elem.remove());
  const commentSection = bigPicture.querySelector('.social__comments');

  for (let i = 1; i <= SHOWN_COMMENTS_COUNT; i++) {
    const comment = commentTemplate.cloneNode(true);
    comment.id = comments[i].id;
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__text').textContent = comments[i].message;
    commentSection.appendChild(comment);
    console.log('Comment Added');
  }
};

export {onMiniatureClick};
