/* eslint-disable object-shorthand */
"use strict";

const URL_ADDRESS = {
  load: `https://21.javascript.pages.academy/keksobooking/data`,
  upload: `https://21.javascript.pages.academy/keksobooking/`
};
const CODE_STATUS_OK = 200;
const TIMEOUT_IN_MS = 10000;

const getXhr = function (onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === CODE_STATUS_OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ошибки: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения. Пожалуйста обновите страницу`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс. ` + ` Пожалуйста обновите страницу`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

const onUpload = function (onSuccess, onError, data) {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`POST`, URL_ADDRESS.upload);
  xhr.send(data);
};

const onLoad = function (onSuccess, onError) {
  let xhr = getXhr(onSuccess, onError);
  xhr.open(`GET`, URL_ADDRESS.load);
  xhr.send();
};

window.backend = {
  load: onLoad,
  upload: onUpload
};

