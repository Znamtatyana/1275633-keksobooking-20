'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = PIN_MAIN_WIDTH + 22;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var selects = document.querySelectorAll('select');
  var fieldsets = document.querySelectorAll('fieldset');

  var changeAddress = function (element, sizeX, sizeY) {
    addressInput.value = (parseInt(element.style.left, 10) + Math.floor(0.5 * sizeX)) + ', ' + (parseInt(element.style.top, 10) + sizeY);
  };

  var activateAttribute = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].hasAttribute('disabled')) {
        elements[i].removeAttribute('disabled');
      }
    }
  };

  var deactivateAttribute = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      if (!elements[i].hasAttribute('disabled')) {
        elements[i].setAttribute('disabled', 'disabled');
      }
    }
  };

  var initPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    deactivateAttribute(selects);
    deactivateAttribute(fieldsets);
    addressInput.value = (parseInt(mapPinMain.style.left, 10) + Math.floor(0.5 * PIN_MAIN_WIDTH)) + ', ' + (parseInt(mapPinMain.style.top, 10) + Math.floor(0.5 * PIN_MAIN_WIDTH));
    window.form.changeRoomNumber();
  };

  initPage();

  var onActivatePage = function (evt) {
    evt.stopPropagation();
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      window.backend.load(onSuccess);//  , onError);
      window.move.setMoveListener(evt);
    }
    adForm.classList.remove('ad-form--disabled');
    addressInput.setAttribute('readonly', 'readonly');
    activateAttribute(selects);
    activateAttribute(fieldsets);
    changeAddress(mapPinMain, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
  };

  var onSuccess = function (response) {
    window.data.pins = response;
    window.pin.renderPins();
  };
  // var onError = function (error) {
  //   console.log(error);
  // };

  mapPinMain.addEventListener('click', onActivatePage);
  mapPinMain.addEventListener('mousedown', onActivatePage);
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onActivatePage(evt);
    }
  });

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element) {
      element.remove();
    });
  };

  var onDeactivatePage = function () {
    removePins();
    adForm.reset();
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    onDeactivatePage();
    initPage();
  });

})();
