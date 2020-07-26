'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var MAXIMUM_EXPECTATION = 10000;

  var addServerListener = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.timeout = MAXIMUM_EXPECTATION;
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      addServerListener(xhr, onSuccess, onError);
      xhr.open('GET', LOAD_URL);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      addServerListener(xhr, onSuccess, onError);
      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    }
  };
})();
