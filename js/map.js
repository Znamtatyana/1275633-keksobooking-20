'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var target = null;

  var onMapClick = function (evt) {
    if (evt.target.classList.contains('map__pin') &&
      !evt.target.classList.contains('map__pin--main')) {
      target = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin') &&
      !evt.target.parentElement.classList.contains('map__pin--main')) {
      target = evt.target.parentElement;
    } else {
      target = null;
    }

    if (target) {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var index = [].slice.call(pins).indexOf(target);
      window.card.render(window.pin.filteredPins[index]);
      pins[index].classList.add('map__pin--active');
    }
  };
  mapElement.addEventListener('click', onMapClick);
})();
