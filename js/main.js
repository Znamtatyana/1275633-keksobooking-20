'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var mapRect = map.getBoundingClientRect();

var createAd = function (n) {
  var location = {
    x: getRandomInt(mapRect.left - (PIN_WIDTH / 2), mapRect.width - (PIN_WIDTH / 2)),
    y: getRandomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
  };
console.log(location);
  return {
    author: {avatar: 'img/avatars/user0' + n + '.png'},
    offer: {
      title: 'Квартира',
      address: 'Адрес ' + location.x + ',' + location.y,
      price: 100,
      type: TYPE[getRandomInt(1, TYPE.length)],
      rooms: 2,
      guests: 2,
      checkin: TIME[getRandomInt(1, TIME.length)],
      checkout: TIME[getRandomInt(1, TIME.length)],
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

renderPins(ads);
// функция создания карточки объявления

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderCard = function (ad) {
  cardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  var types = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  cardTemplate.querySelector('.popup__type').textContent = types[ad.offer.type];

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
