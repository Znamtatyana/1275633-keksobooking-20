'use strict';
var PIN_WIDTH = 20;
var PIN_HEIGHT = 40;

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
  xMin: domRect.left + PIN_WIDTH,
  yMin: 130 - PIN_HEIGHT,
  xMax: domRect.width - PIN_WIDTH,
  yMax: 630 - PIN_HEIGHT
};

var createAd = function (n) {
  var avatarImgNum = 1 + n;
  var author = {
    avatar: 'img/avatars/user0' + avatarImgNum + '.png'
  };

  var location = {
    x: getRandomInt(mapArea.xMin, mapArea.xMax),
    y: getRandomInt(mapArea.yMin, mapArea.yMax)
  };

  var offer = {
    title: 'Квартира',
    address: 'Адрес' + location.x + ',' + location.y,
    price: 100,
    type: typeOfAd[1],
    rooms: 2,
    guests: 2,
    checkin: checkinTime[1],
    checkout: checkoutTime[1],
    features: featuresAddition[1],
    description: '',
    photos: photosRoom
  };

  var pin = {
    author: author,
    offer: offer,
    location: location
  };

  return pin;
};

var createAds = function () {
  var arrayOfPins = [];
  for (var i = 0; i < 8; i++) {
    var pinNew = createAd(i, mapArea);
    arrayOfPins.push(pinNew);
  }

  return arrayOfPins;
};

// функция создания DOM-элемента на основе JS-объекта
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var createElement = function (ad) {

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
    fragment.appendChild(createElement(pins[i]));
  }
  target.appendChild(fragment);
};

renderPins(createAds(mapArea), pinList);
