'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var typeOfAd = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresAddition = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosRoom = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  var int = Math.floor(Math.random() * (max - min) + min);
  return int;
};

var domRect = map.getBoundingClientRect();

var mapArea = {
  xMin: domRect.left - (PIN_WIDTH / 2),
  yMin: 130 - PIN_HEIGHT,
  xMax: domRect.width - (PIN_WIDTH / 2),
  yMax: 630 - PIN_HEIGHT
};

var createAd = function (n) {
  var avatarImgNum = 1 + n;

  var location = {
    x: getRandomInt(mapArea.xMin, mapArea.xMax),
    y: getRandomInt(mapArea.yMin, mapArea.yMax)
  };

  var pin = {
    author: {avatar: 'img/avatars/user0' + avatarImgNum + '.png'},
    offer: {
      title: 'Квартира',
      address: 'Адрес ' + location.x + ',' + location.y,
      price: 100,
      type: typeOfAd[3],
      rooms: 2,
      guests: 2,
      checkin: checkinTime[1],
      checkout: checkoutTime[1],
      features: featuresAddition.slice(0, featuresAddition.length - 2),
      description: '',
      photos: photosRoom.slice(0, photosRoom.length)
    },
    location: location
  };

  return pin;
};

var createAds = function () {
  var arrayOfPins = [];
  for (var i = 0; i < 8; i++) {
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
var renderPins = function (pins, target) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }
  target.appendChild(fragment);
};

renderPins(createAds(), pinList);

// функция создания карточки объявления
var cardList = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var createCard = function (ad) {

  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

  var popupType = cardElement.querySelector('.popup__type');
  if(ad.offer.type === 'palace') {
    popupType.textContent = 'Дворец';
  }
  if(ad.offer.type === 'flat') {
    popupType.textContent = 'Квартира';
  }
  if(ad.offer.type === 'house') {
    popupType.textContent = 'Дом';
  }
  if(ad.offer.type === 'bungalo') {
    popupType.textContent = 'Бунгало';
  }

  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout + '.';

  // var featuresList = cardElement.querySelector('.popup__features');
  // var featuresItems = featuresList.children;

  // for (var i = 0; i < featuresItems.length; i++) {
  //   for(var j = 0; j < ad.offer.features.length; j++) {
  //     if (featuresItems[i].text == 'conditioner') {
  //       featuresItems.appendChild(featuresItems[i])
  //     } else {featuresItems[i].remove}
  //   }
  // }
  // featuresList = featuresItems;

  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  var photosList = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelectorAll('.popup__photo');
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var newPhoto = photo[0].cloneNode(true);
    newPhoto.src = ad.offer.photos[i];
    photosList.appendChild(newPhoto);
  }
  photosList.removeChild(photo[0]);
  return cardElement;
};

var renderCard = function (pins, target) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createCard(pins[0]));
  }
  target.appendChild(fragment);
};

renderCard(createAds(), cardList);


console.log(createCard(createAds()[0]));

