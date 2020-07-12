'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = PIN_MAIN_WIDTH + 22;

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
var pinIsRendered = false;

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }
  pinList.appendChild(fragment);
  pinIsRendered = true;
};

// функция создания карточки объявления

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
  var photo = cardElement.querySelector('.popup__photo');
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
};

// Функция создания сообщения об успешной отправке формы
// var main = document.querySelector('main');
// var messageTemplate = document.querySelector('#success')
//     .content
//     .querySelector('.success');

// var renderMessage = function () {
//   main.appendChild(messageTemplate);
// };

// // Функция создания сообщения об ошибочной отправке формы
// var errorMessageTemplate = document.querySelector('#error')
//     .content
//     .querySelector('.error');

// var renderErrorMessage = function () {
//   main.appendChild(errorMessageTemplate);
// };

var adForm = document.querySelector('.ad-form');
var selects = document.querySelectorAll('select');
var fieldsets = document.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');

var deactivateAttribute = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    if (!elements[i].hasAttribute('disabled')) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  }
};

var activateAttribute = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].hasAttribute('disabled')) {
      elements[i].removeAttribute('disabled');
    }
  }
};

var removePins = function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (element) {
    element.remove();
  });
};

// Синхронизация кол-ва комнат и гостей
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

var initPage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  deactivateAttribute(selects);
  deactivateAttribute(fieldsets);
  addressInput.value = (parseInt(mapPinMain.style.left, 10) + Math.floor(0.5 * PIN_MAIN_WIDTH)) + ', ' + (parseInt(mapPinMain.style.top, 10) + Math.floor(0.5 * PIN_MAIN_WIDTH));
  changeRoomNumber();
};

initPage();


// Неактивное состояние
var deactivatePage = function () {
  removePins();
  adForm.reset();
};

// Активное состояние
var changeAddress = function (element, sizeX, sizeY) {
  addressInput.value = (parseInt(element.style.left, 10) + Math.floor(0.5 * sizeX)) + ', ' + (parseInt(element.style.top, 10) + sizeY);
};
var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addressInput.setAttribute('readonly', 'readonly');
  activateAttribute(selects);
  activateAttribute(fieldsets);
  changeAddress(mapPinMain, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
  if (pinIsRendered === false) {
    renderPins(ads);
  }
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (item, i) {
    item.addEventListener('click', function () {
      renderCard(ads[i]);
    });
    item.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        renderCard(ads[i]);
      }
    });
  });
};

mapPinMain.addEventListener('mousedown', function () {
  activatePage();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

// Синхронизация типа жилья с минимальным значением цены и placeholder
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

// Синхронизация времени заезда - выезда
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

var resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', function () {
  deactivatePage();
  initPage();
});

// закрытие карточки
var removeCard = function () {
  cardElement.remove();
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
