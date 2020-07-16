'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomInt = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var map = document.querySelector('.map');
  var mapRect = map.getBoundingClientRect();

  var createAd = function (n) {
    var location = {
      x: getRandomInt(mapRect.left - (PIN_WIDTH / 2), mapRect.width - (PIN_WIDTH / 2)),
      y: getRandomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
    };
    return {
      author: {avatar: 'img/avatars/user0' + n + '.png'},
      offer: {
        title: 'Квартира',
        address: 'Адрес ' + location.x + ',' + location.y,
        price: 100,
        type: TYPE[getRandomInt(0, TYPE.length - 1)],
        rooms: 2,
        guests: 2,
        checkin: TIME[getRandomInt(0, TIME.length - 1)],
        checkout: TIME[getRandomInt(0, TIME.length - 1)],
        features: FEATURES.slice(0, getRandomInt(1, FEATURES.length)),
        description: '',
        photos: PHOTOS.slice(0, getRandomInt(1, PHOTOS.length))
      },
      location: location
    };
  };


  var createAds = function () {
    var arrayOfPins = [];
    for (var i = 1; i <= 8; i++) {
      arrayOfPins.push(createAd(i));
    }
    return arrayOfPins;
  };

  window.data = {
    pins: createAds(),
    filtered: []
  };
})();
