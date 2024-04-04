const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ERROR_MESSAGE = {
  GET_DATA: 'Не удалось загрузить данные',
};

const getData = () => fetch(
  `${BASE_URL}${ROUTE.GET_DATA}`)
  .then((response) => {
    if(response.ok) {
      return response.json();
    }

    throw new Error();
  })
  .catch(() => {
    throw new Error(ERROR_MESSAGE.GET_DATA);
  });

export {getData, ERROR_MESSAGE};
