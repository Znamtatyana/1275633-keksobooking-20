'use strict';

(function () {
  var ERROR_OUTLINE = '2px solid #ff6547';
  var ERROR_NONE = 'none';
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  var submitButton = document.querySelector('.ad-form__submit');
  var filterForm = document.querySelector('.map__filters');
  var addressInput = document.querySelector('#address');
  var inputTitleElement = document.querySelector('#title');
  var selectTypeElement = document.querySelector('#type');
  var inputPriceElement = document.querySelector('#price');
  var selectRoomElement = document.querySelector('#room_number');
  var selectCapacityElement = document.querySelector('#capacity');
  var selectTimeInElement = document.querySelector('#timein');
  var selectTimeOutElement = document.querySelector('#timeout');
  var typePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var setAddress = function (x, y) {
    if (mapElement.classList.contains('map--faded')) {
      addressInput.value = Math.floor(x + window.pin.mainPinWidth / 2) + ', ' + Math.floor(y + window.pin.mainPinWidth / 2);
    } else {
      addressInput.value = Math.floor(x + window.pin.mainPinWidth / 2) + ', ' + Math.floor(y + window.pin.mainPinHeight);
    }
  };
  setAddress(mainPinElement.offsetLeft, mainPinElement.offsetTop);

  var disableForm = function (form) {
    [].slice.call(form.children).forEach(function (fieldsetElement) {
      fieldsetElement.setAttribute('disabled', 'disabled');
    });
  };

  var enableForm = function (form) {
    [].slice.call(form.children).forEach(function (fieldsetElement) {
      fieldsetElement.removeAttribute('disabled');
    });
  };

  var disableAll = function () {
    adForm.classList.add('ad-form--disabled');
    disableForm(adForm);
    disableForm(filterForm);
  };

  var enableAd = function () {
    adForm.classList.remove('ad-form--disabled');
    enableForm(adForm);
  };

  var enableFilter = function () {
    enableForm(filterForm);
  };

  var onTypePriceValidate = function () {
    inputPriceElement.placeholder = typePrice[selectTypeElement.value];
    inputPriceElement.min = typePrice[selectTypeElement.value];
  };

  var onRoomCapacityValidate = function () {

    if (selectRoomElement.value === '100' && selectCapacityElement.value !== '0') {
      selectCapacityElement.setCustomValidity('Не для гостей');
      selectRoomElement.setCustomValidity('');
    } else if (selectCapacityElement.value === '0' && selectRoomElement.value !== '100') {
      selectRoomElement.setCustomValidity('Нужно 100 комнат');
      selectCapacityElement.setCustomValidity('');
    } else if (selectRoomElement.value < selectCapacityElement.value) {
      selectRoomElement.setCustomValidity('Нужно больше комнат');
      selectCapacityElement.setCustomValidity('');
    } else {
      selectRoomElement.setCustomValidity('');
      selectCapacityElement.setCustomValidity('');
    }

  };

  var onTimeInValidate = function () {
    selectTimeOutElement.value = selectTimeInElement.value;
  };

  var onTimeOutValidate = function () {
    selectTimeInElement.value = selectTimeOutElement.value;
  };

  var preValidate = function () {
    onTypePriceValidate();
    onRoomCapacityValidate();
  };

  var clearInvalidFields = function () {
    inputTitleElement.style.outline = ERROR_NONE;
    inputPriceElement.style.outline = ERROR_NONE;
    selectCapacityElement.style.outline = ERROR_NONE;
    selectRoomElement.style.outline = ERROR_NONE;
  };

  var onPageDeactivate = function (evt) {
    evt.preventDefault();
    adForm.reset();
    filterForm.reset();
    window.pin.remove();
    window.card.close();
    window.pin.setDefaultMainPinPosition();
    clearInvalidFields();
    preValidate();
    disableAll();
    mapElement.classList.add('map--faded');
    setAddress(mainPinElement.offsetLeft, mainPinElement.offsetTop);
  };

  var markInvalidFields = function () {
    inputTitleElement.style.outline = !inputTitleElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    inputPriceElement.style.outline = !inputPriceElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    selectCapacityElement.style.outline = !selectCapacityElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    selectRoomElement.style.outline = !selectRoomElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
  };

  selectTypeElement.addEventListener('change', onTypePriceValidate);
  selectTimeInElement.addEventListener('change', onTimeInValidate);
  selectTimeOutElement.addEventListener('change', onTimeOutValidate);
  selectCapacityElement.addEventListener('change', onRoomCapacityValidate);
  selectRoomElement.addEventListener('change', onRoomCapacityValidate);

  submitButton.addEventListener('click', function () {
    markInvalidFields();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (adForm.checkValidity()) {
      window.backend.save(new FormData(adForm), function () {
        window.dialog.openSuccess();
        onPageDeactivate(evt);
      }, function (error) {
        window.dialog.openError(error);
      });
    }
  });

  resetButton.addEventListener('click', onPageDeactivate);

  window.form = {
    disableAll: disableAll,
    enableAd: enableAd,
    enableFilter: enableFilter,
    setAddress: setAddress,
    preValidate: preValidate,
  };

})();
