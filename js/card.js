'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var cardCloseButton = cardElement.querySelector('.popup__close');
  var mapPinsElement = document.querySelector('.map__pins');
  var type = {
    bungalo: 'бунгало',
    flat: 'комната',
    house: 'дом',
    palace: 'дворец',
  };

  var renderCard = function (ad) {
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__type').textContent = type[ad.offer.type];
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    var featuresElement = cardElement.querySelector('.popup__features');
    while (featuresElement.firstElementChild) {
      featuresElement.firstElementChild.remove();
    }
    var featureList = new DocumentFragment();
    ad.offer.features.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
      featureList.appendChild(featureElement);
    });
    featuresElement.appendChild(featureList);

    var photosElement = cardElement.querySelector('.popup__photos');
    var photosList = new DocumentFragment();
    ad.offer.photos.forEach(function (photo) {
      var photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;
      photosList.appendChild(photoElement);
    });
    while (photosElement.firstElementChild) {
      photosElement.firstElementChild.remove();
    }
    photosElement.appendChild(photosList);

    mapPinsElement.after(cardElement);

    cardCloseButton.addEventListener('click', closeCard);
    document.addEventListener('keydown', closeCardByEsc);
    window.pin.removeActive();
  };

  var closeCardByEsc = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  var closeCard = function () {
    cardElement.remove();
    window.pin.removeActive();
    cardCloseButton.removeEventListener('click', closeCard);
    document.removeEventListener('keydown', closeCardByEsc);
  };


  window.card = {
    renderCard: renderCard,
    closeCard: closeCard,
  };
})();
