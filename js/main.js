const NAMES = [
  'name-placeholder-1',
  'name-placeholder-2',
  'name-placeholder-3',
  'name-placeholder-4',
  'name-placeholder-5',
  'name-placeholder-6',
  'name-placeholder-7',
  'name-placeholder-8',
  'name-placeholder-9',
  'name-placeholder-10',
  'name-placeholder-11',
  'name-placeholder-12',
  'name-placeholder-13',
  'name-placeholder-14',
  'name-placeholder-15',
];

const DESCRIPTIONS = [
  'desc-placeholder-1',
  'desc-placeholder-2',
  'desc-placeholder-3',
  'desc-placeholder-4',
  'desc-placeholder-5',
  'desc-placeholder-6',
  'desc-placeholder-7',
  'desc-placeholder-8',
  'desc-placeholder-9',
  'desc-placeholder-10',
  'desc-placeholder-11',
  'desc-placeholder-12',
  'desc-placeholder-13',
  'desc-placeholder-14',
  'desc-placeholder-15',
];

const COMMENT_PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUniqueIntegerFromRange = (min, max) => {
  const usedValues = [];

  return function () {
    if (usedValues.length >= max - min + 1) {
      return null;
    }

    let newValue = getRandomInteger(min, max);
    while (usedValues.includes(newValue)) {
      newValue = getRandomInteger(min, max);
    }

    usedValues.push(newValue);
    return newValue;
  };
};

const getUniqueInteger = () => {
  let integer = 0;

  return function () {
    integer++;
    return integer;
  };
};

const getUniquePhotoID = getUniqueIntegerFromRange(PHOTO_ID_MIN, PHOTO_ID_MAX);

const getUniquePhotoUrlInteger = getUniqueIntegerFromRange(PHOTO_URL_MIN, PHOTO_URL_MAX);

const getUniqueCommentID = getUniqueInteger();

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

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

const photos = Array.from({length: 25}, createPhoto);
