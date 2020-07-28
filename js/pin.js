'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_POS_X = 570;
  var MAIN_PIN_POS_Y = 375;
  var MIN_PINS = 0;
  var MAX_PINS = 5;
  var mapPinsElement = document.querySelector('.map__pins');
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPinElement = document.querySelector('.map__pin--main');

  var createPin = function (ad) {
    var pin = pinElement.cloneNode(true);
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;
    pin.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = ad.location.y - PIN_HEIGHT + 'px';
    return pin;
  };

  var renderPins = function (data) {
    var pinsFragment = new DocumentFragment();
    data.slice(MIN_PINS, MAX_PINS).forEach(function (ad) {
      pinsFragment.appendChild(createPin(ad));
    });
    mapPinsElement.appendChild(pinsFragment);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var removeActive = function () {
    var collectionPins = document.querySelectorAll('.map__pin');
    collectionPins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var setDefaultMainPinPosition = function () {
    mainPinElement.style.left = MAIN_PIN_POS_X + 'px';
    mainPinElement.style.top = MAIN_PIN_POS_Y + 'px';
    window.form.setAddress(MAIN_PIN_POS_X, MAIN_PIN_POS_Y);
  };

  window.pin = {
    render: renderPins,
    remove: removePins,
    removeActive: removeActive,
    setDefaultMainPinPosition: setDefaultMainPinPosition,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    pins: [],
    filtered: [],

  };
})();
