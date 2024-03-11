import {getRandomInteger, getUniqueIntegerFromRange, getUniqueInteger, getRandomArrayItem} from './utils.js';
import {getData} from './data.js';

const LIKES_MIN = 15;
const LIKES_MAX = 200;

const PHOTO_ID_MIN = 1;
const PHOTO_ID_MAX = 25;

const PHOTO_URL_MIN = 1;
const PHOTO_URL_MAX = 25;

const COMMENTS_AMOUNT_MIN = 0;
const COMMENTS_AMOUNT_MAX = 30;

const AVATAR_URL_MIN = 1;
const AVATAR_URL_MAX = 6;

const COMMENTS_PHRASES_MIN = 1;
const COMMENTS_PHRASES_MAX = 2;

const PHOTOS_COUNT = 25;

const {DESCRIPTIONS, NAMES, COMMENT_PHRASES} = getData();

const getUniquePhotoID = getUniqueIntegerFromRange(PHOTO_ID_MIN, PHOTO_ID_MAX);

const getUniquePhotoUrlInteger = getUniqueIntegerFromRange(PHOTO_URL_MIN, PHOTO_URL_MAX);

const getUniqueCommentID = getUniqueInteger();

const getUniquePhotoUrl = () => `photos/${getUniquePhotoUrlInteger()}.jpg`;

const getRandomAvatar = () => `img/avatar-${getRandomInteger(AVATAR_URL_MIN, AVATAR_URL_MAX)}.svg`;

const getRandomMessage = (phraseAmount) => {
  let message = '';
  for (let i = 0; i < phraseAmount; i++) {
    message = message.concat(getRandomArrayItem(COMMENT_PHRASES), ' ');
  }
  message = message.trim();
  return message;
};

const createComment = () => ({
  id: getUniqueCommentID(),
  avatar: getRandomAvatar(),
  message: getRandomMessage(getRandomInteger(COMMENTS_PHRASES_MIN, COMMENTS_PHRASES_MAX)),
  name: getRandomArrayItem(NAMES)
});

const createPhoto = () => ({
  id: getUniquePhotoID(),
  url: getUniquePhotoUrl(),
  description: getRandomArrayItem(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomInteger(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX)}, createComment),
});

const generateMiniatures = () => Array.from({length: PHOTOS_COUNT}, createPhoto);

export {generateMiniatures};
