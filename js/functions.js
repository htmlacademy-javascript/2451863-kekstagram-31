// ФУНКЦИЯ ПРОВЕРКИ ДЛИНЫ СТРОКИ

const checkStringLength = (string, length) => string.length <= length;

const str = 'soup is good food'; // str.length === 17

checkStringLength(str, 20); // true
checkStringLength(str, 17); // true
checkStringLength(str, 10); // false

// ФУНКЦИЯ ПРОВЕРКИ НА ПАЛИНДРОМ
const isPalyndrome = (string) => {
  const stringNormalized = string.toLowerCase().replaceAll(' ', '');
  const stringLength = stringNormalized.length;

  for (let i = 0; i <= stringLength / 2; i++) {
    if (stringNormalized[i] !== stringNormalized[stringLength - 1 - i]) {
      return false;
    }
  }
  return true;
};

isPalyndrome('abcba'); // true
isPalyndrome('aBcbA'); // true
isPalyndrome('aBcCbA'); // true
isPalyndrome('Ab  c ba'); // true
isPalyndrome('AbCde'); //false

// ФУНКЦИЯ ВЫБОРА ВСЕХ ЧИСЕЛ ИЗ СТРОКИ

const getDigits = (string) => parseInt(string.toString().replaceAll(/[^0-9]/g, ''), 10);

getDigits('For breakfast I\'ll have 6 eggs'); // 6
getDigits('For breakfast I\'ll have 6 eggs and 1.5 liters of milk'); // 615
getDigits('For breakfast I\'ll have 6 eggs, a #251&%#2# and 1.5 liters of milk'); // 6251215
getDigits('For breakfast I\'ll have eggs, and milk'); // NaN
getDigits(215); // 215
getDigits(4712.22); // 471222
getDigits(0); // 0
getDigits(-22); // 22
