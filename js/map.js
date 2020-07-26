'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var target = null;

  var onClickMap = function (evt) {
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
      var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var index = [].slice.call(pinsCollection).indexOf(target);
      window.card.renderCard(window.data.filtered[index]);
      pinsCollection[index].classList.add('map__pin--active');
    }
  };
  mapElement.addEventListener('click', onClickMap);
})();
