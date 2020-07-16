'use strict';
(function () {
  var pinList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var createPin = function (ad) {

    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.style = 'left:' + ad.location.x + 'px;' + 'top:' + ad.location.y + 'px;';
    return pinElement;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    window.data.pins.forEach(function (ad) {
      fragment.appendChild(createPin(ad));
    });

    pinList.appendChild(fragment);
  };

  var removeActive = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pinElement) {
      pinElement.classList.remove('map__pin--active');
    });
  };

  window.pin = {
    renderPins: renderPins,
    removeActive: removeActive,
  };
})();
