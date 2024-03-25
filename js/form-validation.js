const uploadFormElement = document.querySelector('.img-upload__form');

const uploadHashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadDescriptionInputElement = uploadFormElement.querySelector('.text__description');

const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

const DESCRIPTION_SYMBOL_COUNT_MAX = 140;
const HASHTAGS_COUNT_MAX = 5;

const DESCRIPTION_VALIDATION_ERROR_MESSAGE = `Длина описания не может превышать ${DESCRIPTION_SYMBOL_COUNT_MAX}`;

const HASHTAG_VALIDATION_ERROR_MESSAGES = {
  HASHTAG_INVALID: 'Недопустимые символы в хэштэге',
  HASHTAG_NOT_UNIQUE: 'Хэштэг должен быть уникальным!',
  HASHTAG_COUNT_INVALID: `Превышено допустимое число хэштэгов. Их может быть только ${HASHTAGS_COUNT_MAX}!`,
};

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
}, false);

const checkIndividualHashtag = (hashtagsList) => hashtagsList.every((hashtag) => hashtagRegexp.test(hashtag));

const checkUniqueHashtag = (hashtagsList) => hashtagsList.every((value, index, array) => array.lastIndexOf(value) === index);

const checkHashtagCount = (hashtagsList) => hashtagsList.length <= HASHTAGS_COUNT_MAX;

const validateHashtags = () => {
  const hashtagsList = uploadHashtagsInputElement.value.trim().split(' ').map((hashtag) => hashtag.toLowerCase());

  return checkIndividualHashtag(hashtagsList) && checkUniqueHashtag(hashtagsList) && checkHashtagCount(hashtagsList);
};

const getHashtagValidationErrorMessage = () => {
  const hashtagsList = uploadHashtagsInputElement.value.trim().split(' ').map((hashtag) => hashtag.toLowerCase());

  if (!checkIndividualHashtag(hashtagsList)) {
    return HASHTAG_VALIDATION_ERROR_MESSAGES.HASHTAG_INVALID;
  }
  if (!checkUniqueHashtag(hashtagsList)) {
    return HASHTAG_VALIDATION_ERROR_MESSAGES.HASHTAG_NOT_UNIQUE;
  }
  if (!checkHashtagCount(hashtagsList)) {
    return HASHTAG_VALIDATION_ERROR_MESSAGES.HASHTAG_COUNT_INVALID;
  }
};

const validateDescriptionLength = () => uploadDescriptionInputElement.value.trim().length <= DESCRIPTION_SYMBOL_COUNT_MAX;

pristine.addValidator(uploadHashtagsInputElement, validateHashtags, getHashtagValidationErrorMessage);
pristine.addValidator(uploadDescriptionInputElement, validateDescriptionLength, DESCRIPTION_VALIDATION_ERROR_MESSAGE);

const validateForm = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export {validateForm};
