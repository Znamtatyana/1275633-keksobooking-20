'use strict';

(function () {
  var TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var pinList = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  var renderCard = function (ad) {
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPES[ad.offer.type];

    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout + '.';

    var featuresList = cardElement.querySelector('.popup__features');
    var featuresFragment = new DocumentFragment();
    for (var i = 0; i < ad.offer.features.length; i++) {
      var item = document.createElement('li');
      item.classList.add('popup__feature');
      item.classList.add('popup__feature--' + ad.offer.features[i]);
      featuresFragment.appendChild(item);
    }
    while (featuresList.firstElementChild) {
      featuresList.firstElementChild.remove();
    }
    featuresList.appendChild(featuresFragment);

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    var photosList = cardElement.querySelector('.popup__photos');
    var photoFragment = new DocumentFragment();
    var photo = cardTemplate.querySelector('.popup__photo');
    for (i = 0; i < ad.offer.photos.length; i++) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = ad.offer.photos[i];
      photoFragment.appendChild(newPhoto);
    }
    while (photosList.firstElementChild) {
      photosList.firstElementChild.remove();
    }
    photosList.appendChild(photoFragment);

    pinList.after(cardElement);
    document.addEventListener('keydown', onPopupEscPress);
    closeCard();
    window.pin.removeActive();
  };

  var removeCard = function () {
    cardElement.remove();
    window.pin.removeActive();
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeCard();
    }
  };

  var closeCard = function () {
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      removeCard();
      document.removeEventListener('keydown', onPopupEscPress);
    });
    popupClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        removeCard();
      }
    });
  };

  window.card = {
    renderCard: renderCard
  };

})();
