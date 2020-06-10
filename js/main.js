'use strict';
var typeOfAd = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresAddition = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosRoom = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');


// функция генерации случайных данных
var createAds = function (x, y) {
  var ARRAY_PINS = [];

  for (var i = 1; i <= 8; i++) {
    var avatarImgNum = '0' + i;
    var author = {
      avatar: 'img/avatars/user' + avatarImgNum + '.png'
    };

    var location = {
      x: x + 20 * i,
      y: y - 40 * i
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

    ARRAY_PINS.push(pin);
  }
};

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// функция создания DOM-элемента на основе JS-объекта

var createElement = function (ads) {

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin img').src = ads.author.avatar;
  pinElement.querySelector('.map__pin').style = 'left:' + ads.location.x + 'px;' + 'top:' + ads.location.y + 'px;';

  return pinElement;
};

// заполнениe блока DOM-элементами на основе массива JS-объектов

var fragment = document.createDocumentFragment();
for (var i = 0; i < createAds.length; i++) {
  fragment.appendChild(createElement(createAds[i]));
}

pinList.appendChild(fragment);
