'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_SIZE = 65;
var PIN_MAIN_HEIGHT = PIN_MAIN_SIZE + 22;

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var map = document.querySelector('.map');
var mapRect = map.getBoundingClientRect();

var createAd = function (n) {
  var location = {
    x: getRandomInt(mapRect.left - (PIN_WIDTH / 2), mapRect.width - (PIN_WIDTH / 2)),
    y: getRandomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
  };
  return {
    author: {avatar: 'img/avatars/user0' + n + '.png'},
    offer: {
      title: 'Квартира',
      address: 'Адрес ' + location.x + ',' + location.y,
      price: 100,
      type: TYPE[getRandomInt(0, TYPE.length - 1)],
      rooms: 2,
      guests: 2,
      checkin: TIME[getRandomInt(0, TIME.length - 1)],
      checkout: TIME[getRandomInt(0, TIME.length - 1)],
      features: FEATURES.slice(0, getRandomInt(1, FEATURES.length)),
      description: '',
      photos: PHOTOS.slice(0, getRandomInt(1, PHOTOS.length))
    },
    location: location
  };
};

var createAds = function () {
  var arrayOfPins = [];
  for (var i = 1; i <= 8; i++) {
    arrayOfPins.push(createAd(i));
  }
  return arrayOfPins;
};

// функция создания DOM-элемента на основе JS-объекта
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var createPin = function (ad) {

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  pinElement.style = 'left:' + ad.location.x + 'px;' + 'top:' + ad.location.y + 'px;';
  return pinElement;
};

// заполнениe блока DOM-элементами на основе массива JS-объектов
var ads = createAds();
var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }
  pinList.appendChild(fragment);
};

// // функция создания карточки объявления

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderCard = function (ad) {
  cardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = TYPES[ad.offer.type];

  cardTemplate.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout + '.';

  var featuresList = cardTemplate.querySelector('.popup__features');
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

  cardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
  cardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;

  var photosList = cardTemplate.querySelector('.popup__photos');
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

  pinList.after(cardTemplate);
};

renderCard(ads[1]);

var adForm = document.querySelector('.ad-form');
var selects = document.querySelectorAll('select');
var fieldsets = document.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');

var changeAttribute = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    if (!elements[i].hasAttribute('disabled')) {
      elements[i].setAttribute('disabled', 'disabled');
    } else {
      elements[i].removeAttribute('disabled');
    }
  }
};

// Неактивное состояние
var deactivateMain = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  changeAttribute(selects);
  changeAttribute(fieldsets);
  addressInput.value = (parseInt(mapPinMain.style.left, 10) - Math.floor(0.5 * PIN_MAIN_SIZE)) + ', ' + (parseInt(mapPinMain.style.top, 10) - Math.floor(0.5 * PIN_MAIN_SIZE));
};
deactivateMain();

// Активное состояние
var pinMain = document.querySelector('.map__pin--main');
var changeAddress = function (element, sizeX, sizeY) {
  addressInput.value = (parseInt(element.style.left, 10) - Math.floor(0.5 * sizeX)) + ', ' + (parseInt(element.style.top, 10) - sizeY);
};

var activateMain = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addressInput.setAttribute('disabled', 'disabled');
  changeAttribute(selects);
  changeAttribute(fieldsets);
  renderPins(ads);
  changeAddress(mapPinMain, PIN_MAIN_SIZE, PIN_MAIN_HEIGHT);
};

pinMain.addEventListener('mousedown', function () {
  activateMain();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateMain();
  }
});

