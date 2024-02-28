// comments
// function to generate array of objects (Array.from()) with random length
    //function to get random number from range (0-30)
// function to generate comment object (to pass to Array.from())
    // id
        // function to generate random unique number
    // avatar
        // function to get random number from range (1-6)
        // function to form required string (`img/avatar-${i}.svg`)
    // message
        // array with sentences
        // function to get random number from range (1-2) (to get sentences quantity)
        // function to get random unique number from range (1-6) (to get unique sentences for evety comment)
    // name
        // array with names
        // function to get random number from range


// TO DO LIST

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

const COMMENT_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const LIKES_MIN = 15;
const LIKES_MAX = 200;

// function to get random number from range
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// function to get random unique number from range
const getUniqueInteger = (min, max) => {
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

const getUniquePhotoID = getUniqueInteger(1, 25);
const getUniquePhotoUrlInteger = getUniqueInteger(1, 25);

const getUniquePhotoUrl = () => `photos/${getUniquePhotoUrlInteger()}.jpg`;

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

// function to form required url strings
// function to form required avatar strings

// function to create comment object
// function to create comment objects array

// function to create photo object
const createPhoto = () => ({
  id: getUniquePhotoID(),
  url: getUniquePhotoUrl(),
  description: getRandomArrayItem(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
});

// function to create photo object array

const photos = Array.from({length: 25}, createPhoto);

console.log(photos);
