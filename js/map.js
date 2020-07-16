'use strict';

(function () {
  var map = document.querySelector('.map');
  var target = null;

  var onClickMap = function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      target = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin')) {
      target = evt.target.parentElement;
    } else {
      target = null;
    }

    if (target) {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var index = [].slice.call(pins).indexOf(target);
      window.card.renderCard(window.data.pins[index]);
      pins[index].classList.add('map__pin--active');
    }
  };

  map.addEventListener('click', onClickMap);
  map.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onClickMap();
    }
  });
})();