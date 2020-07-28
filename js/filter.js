'use strict';

(function () {

  var MAX_ADS = 5;
  var selectHousingType = document.querySelector('#housing-type');
  var selectHousingPrice = document.querySelector('#housing-price');
  var selectHousingRooms = document.querySelector('#housing-rooms');
  var selectHousingGuests = document.querySelector('#housing-guests');
  var inputFeaturesCollection = document.querySelectorAll('.map__features .map__checkbox');

  var convertPriceToString = function (price) {
    if (price < 10000) {
      return 'low';
    } else if (price >= 10000 && price <= 50000) {
      return 'middle';
    } else {
      return 'high';
    }
  };

  var onFilterListener = function () {
    window.card.close();
    var ads = [];
    for (var i = 0; i < window.pin.pins.length; i++) {
      var ad = window.pin.pins[i];
      var filterType = ad.offer.type === selectHousingType.value || selectHousingType.value === 'any';
      var filterGuests = ad.offer.guests === +selectHousingGuests.value || selectHousingGuests.value === 'any';
      var filterPrice = convertPriceToString(ad.offer.price) === selectHousingPrice.value || selectHousingPrice.value === 'any';
      var filterRooms = ad.offer.rooms === +selectHousingRooms.value || selectHousingRooms.value === 'any';

      var checkboxes = document.querySelectorAll('.map__checkbox:checked');
      var features = Array.from(checkboxes).map(function (input) {
        return input.value;
      });

      var filterFeatures = function () {
        for (var j = 0; j < features.length; j++) {
          if (ad.offer.features.indexOf(features[j]) === -1) {
            return false;
          }
        }
        return true;
      };

      if (filterType && filterGuests && filterPrice && filterRooms && filterFeatures() && ad.hasOwnProperty('offer')) {
        ads.push(ad);
      }

      if (ads.length === MAX_ADS) {
        break;
      }

    }
    window.pin.filteredPins = ads;
    window.pin.remove();
    window.pin.render(window.pin.filteredPins);
  };

  inputFeaturesCollection.forEach(function (checkbox) {
    checkbox.addEventListener('change', onFilterListener);
  });

  selectHousingType.addEventListener('change', onFilterListener);
  selectHousingGuests.addEventListener('change', onFilterListener);
  selectHousingPrice.addEventListener('change', onFilterListener);
  selectHousingRooms.addEventListener('change', onFilterListener);

})();
