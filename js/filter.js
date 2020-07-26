'use strict';

(function () {

  var selectHousingType = document.querySelector('#housing-type');
  var selectHousingPrice = document.querySelector('#housing-price');
  var selectHousingRooms = document.querySelector('#housing-rooms');
  var selectHousingGuests = document.querySelector('#housing-guests');
  var inputFeaturesCollection = document.querySelectorAll('.map__features .map__checkbox');

  var convertPriceToString = function (price) {
    var priceCategory;

    if (price < 10000) {
      priceCategory = 'low';
    } else if (price >= 10000 && price <= 50000) {
      priceCategory = 'middle';
    } else if (price > 50000) {
      priceCategory = 'high';
    }

    return priceCategory;
  };

  var onFilterListener = function () {
    window.card.closeCard();
    window.data.filtered = window.data.pins.filter(function (ad) {
      var filterType = ad.offer.type === selectHousingType.value || selectHousingType.value === 'any';
      var filterGuests = ad.offer.guests === +selectHousingGuests.value || selectHousingGuests.value === 'any';
      var filterPrice = convertPriceToString(ad.offer.price) === selectHousingPrice.value || selectHousingPrice.value === 'any';
      var filterRooms = ad.offer.rooms === +selectHousingRooms.value || selectHousingRooms.value === 'any';

      var features = [];

      inputFeaturesCollection.forEach(function (input) {
        if (input.checked) {
          features.push(input.value);
        }
      });

      var filterFeatures = function () {
        var filter = true;
        for (var i = 0; i < features.length; i++) {
          if (ad.offer.features.indexOf(features[i]) === -1) {
            filter = false;
            break;
          }
        }
        return filter;
      };

      return filterType && filterGuests && filterPrice && filterRooms && filterFeatures();
    });
    window.pin.removePins();
    window.pin.renderPins(window.data.filtered);
  };

  inputFeaturesCollection.forEach(function (checkbox) {
    checkbox.addEventListener('change', onFilterListener);
  });

  selectHousingType.addEventListener('change', onFilterListener);
  selectHousingGuests.addEventListener('change', onFilterListener);
  selectHousingPrice.addEventListener('change', onFilterListener);
  selectHousingRooms.addEventListener('change', onFilterListener);

})();
