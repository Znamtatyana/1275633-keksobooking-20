'use strict';
(function () {

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var changeRoomNumber = function () {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');
    if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Не для гостей');
    } else if (roomNumber.value !== '100' && capacity.value === '0') {
      roomNumber.setCustomValidity('Выберите 100 комнат');
    } else if (roomNumber.value < capacity.value) {
      roomNumber.setCustomValidity('Выберите больше комнат');
    }
  };

  roomNumber.addEventListener('change', function () {
    changeRoomNumber();
  });
  capacity.addEventListener('change', function () {
    changeRoomNumber();
  });

  var TYPES_HOUSING = {
    'palace': '10000',
    'flat': '1000',
    'house': '5000',
    'bungalo': '0'
  };
  var typeHousing = document.querySelector('#type');
  var priceHousing = document.querySelector('#price');

  var changePrice = function () {
    priceHousing.setAttribute('placeholder', TYPES_HOUSING[typeHousing.value]);
    priceHousing.setAttribute('min', TYPES_HOUSING[typeHousing.value]);
  };

  typeHousing.addEventListener('change', changePrice);

  var checkInTime = document.querySelector('#timein');
  var checkOutTime = document.querySelector('#timeout');

  var changeInTime = function () {
    checkInTime.value = checkOutTime.value;
  };
  var changeOutTime = function () {
    checkOutTime.value = checkInTime.value;
  };

  checkInTime.addEventListener('change', changeOutTime);
  checkOutTime.addEventListener('change', changeInTime);

  window.form = {
    changeRoomNumber: changeRoomNumber
  };

})();
