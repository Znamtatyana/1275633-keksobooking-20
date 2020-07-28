'use strict';

(function () {
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');

  var onPageActivate = function (evt) {
    evt.stopPropagation();
    if (mapElement.classList.contains('map--faded')) {
      window.backend.load(onSuccess, onError);
      window.form.enableAd();
      window.form.preValidate();
    }
    window.move.onMoveListener(evt);
  };

  var onSuccess = function (response) {
    mapElement.classList.remove('map--faded');
    window.pin.pins = response;
    window.pin.filteredPins = window.pin.pins.filter(function (ad) {
      return ad.hasOwnProperty('offer');
    });
    window.pin.render(window.pin.filteredPins);
    window.form.enableFilter();
    window.form.setAddress(mainPinElement.offsetLeft, mainPinElement.offsetTop);
  };

  var onError = function (error) {
    window.dialog.openError(error);
  };

  var onPageActivateByEnter = function (evt) {
    if (evt.key === 'Enter') {
      onPageActivate(evt);
    }
  };

  mainPinElement.addEventListener('mousedown', onPageActivate);
  mainPinElement.addEventListener('keydown', onPageActivateByEnter);
  window.form.disableAll();
})();
