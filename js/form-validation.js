const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const DESCRIPTION_SYMBOL_COUNT_MAX = 140;
const HASHTAGS_COUNT_MAX = 5;

const DESCRIPTION_VALIDATION_ERROR_MESSAGE = `Длина описания не может превышать ${DESCRIPTION_SYMBOL_COUNT_MAX}`;

const HashtagValidationErrorMessage = {
  HASHTAG_INVALID: 'Недопустимые символы в хэштэге',
  HASHTAG_NOT_UNIQUE: 'Хэштэг должен быть уникальным!',
  HASHTAG_COUNT_INVALID: `Превышено допустимое число хэштэгов. Их может быть только ${HASHTAGS_COUNT_MAX}!`,
};

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadHashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadDescriptionInputElement = uploadFormElement.querySelector('.text__description');

let pristine;

const checkIndividualHashtag = (hashtags) => hashtags.every((hashtag) => HASHTAG_REGEXP.test(hashtag));

const checkUniqueHashtag = (hashtags) => hashtags.every((value, index, array) => array.lastIndexOf(value) === index);

const checkHashtagCount = (hashtags) => hashtags.length <= HASHTAGS_COUNT_MAX;

const validateHashtags = () => {
  const hashtags = uploadHashtagsInputElement
    .value
    .trim()
    .split(' ')
    .map((hashtag) => hashtag.toLowerCase())
    .filter((hashtag) => hashtag);

  return hashtags.length === 0 || checkIndividualHashtag(hashtags) && checkUniqueHashtag(hashtags) && checkHashtagCount(hashtags);
};

const getHashtagValidationErrorMessage = () => {
  const hashtags = uploadHashtagsInputElement.value.trim().split(' ').map((hashtag) => hashtag.toLowerCase());

  if (!checkIndividualHashtag(hashtags)) {
    return HashtagValidationErrorMessage.HASHTAG_INVALID;
  }
  if (!checkUniqueHashtag(hashtags)) {
    return HashtagValidationErrorMessage.HASHTAG_NOT_UNIQUE;
  }
  if (!checkHashtagCount(hashtags)) {
    return HashtagValidationErrorMessage.HASHTAG_COUNT_INVALID;
  }
};

const validateDescriptionLength = () => uploadDescriptionInputElement.value.trim().length <= DESCRIPTION_SYMBOL_COUNT_MAX;

const createPristineValidator = () => {
  pristine = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
  });

  pristine.addValidator(uploadHashtagsInputElement, validateHashtags, getHashtagValidationErrorMessage);
  pristine.addValidator(uploadDescriptionInputElement, validateDescriptionLength, DESCRIPTION_VALIDATION_ERROR_MESSAGE);
};

const destroyPristineValidator = () => {
  pristine.destroy();
};

const validateForm = () => pristine.validate();

export {validateForm, createPristineValidator, destroyPristineValidator};
