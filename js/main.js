'use strict';

(function () {
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');

  var onActivatePage = function (evt) {
    evt.stopPropagation();
    if (mapElement.classList.contains('map--faded')) {
      window.backend.load(onSuccess, onError);
      window.form.enableAdForm();
      window.form.preValidateForm();
    }
    window.move.onMoveListener(evt);
  };

  var onSuccess = function (response) {
    mapElement.classList.remove('map--faded');
    window.data.filtered = window.data.pins = response;
    window.pin.renderPins(window.data.filtered.slice(0, 5));
    window.form.enableFilterForm();
    window.form.setAddress(mainPinElement.offsetLeft, mainPinElement.offsetTop);
  };

  var onError = function (error) {
    window.dialog.openErrorDialog(error);
  };

  var onActivatePageByEnter = function (evt) {
    if (evt.key === 'Enter') {
      onActivatePage(evt);
    }
  };

  mainPinElement.addEventListener('mousedown', onActivatePage);
  mainPinElement.addEventListener('keydown', onActivatePageByEnter);


  window.form.disableForms();
})();
