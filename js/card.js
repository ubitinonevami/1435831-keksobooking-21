"use strict";

const MAP_HOUSING_TYPES_TO_RU = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const pinsContainer = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const PhotoSize = {
  WIDTH: 45,
  HEIGHT: 40
};

const Room = {
  ZERO_ROOM: 0,
  ONE_ROOM: 1,
  FIVE_ROOMS: 5
};

const Guest = {
  ONE_GUEST: 1
};

const createFeatures = (ad) => {
  const featuresFragment = document.createDocumentFragment();
  ad.offer.features.forEach((feature) => {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--` + feature);
    featuresFragment.appendChild(newFeature);
  });
  return featuresFragment;
};

const insertFeauturesNodes = (ad, card) => {
  const featuresContainer = card.querySelector(`.popup__features`);
  featuresContainer.innerHTML = ``;
  const featuresFragment = createFeatures(ad);
  featuresContainer.appendChild(featuresFragment);
};

const createPhotoMarkup = (src) => {
  const photo = document.createElement(`img`);
  photo.classList.add(`popup__photo`);
  photo.src = src;
  photo.alt = `Photo`;
  photo.width = PhotoSize.WIDTH;
  photo.height = PhotoSize.HEIGHT;
  return photo;
};

const insertPhotosNodes = (photos, card) => {
  const photoContainer = card.querySelector(`.popup__photos`);
  photoContainer.innerHTML = ``;
  photos.forEach(function (photo) {
    photoContainer.appendChild(createPhotoMarkup(photo));
  });
};

const disableCard = () => {
  const card = pinsContainer.querySelector(`.map__card`);
  if (card) {
    pinsContainer.removeChild(card);
    card.removeEventListener(`click`, disableCard);
  }
};

const onPopupButtonCloseClick = () => {
  disableCard();
};

const onCardEscPress = (evt) => {
  if (window.util.isEscKeyPress(evt.key)) {
    disableCard();
  }
  document.removeEventListener(`keydown`, onCardEscPress);
};

const renderCard = (ad) => {
  const card = cardTemplate.cloneNode(true);
  const {
    offer: {
      title,
      address,
      price,
      type,
      guests,
      rooms,
      checkin,
      checkout,
      description,
      photos,
      features
    },
    author: {
      avatar
    }
  } = ad;

  if (`title` in ad.offer) {
    card.querySelector(`.popup__title`).textContent = title;
  }

  if (`address` in ad.offer) {
    card.querySelector(`.popup__text--address`).textContent = address;
  }

  if (`price` in ad.offer) {
    card.querySelector(`.popup__text--price`).textContent = price + ` ₽/ночь`;
  }

  if (`type` in ad.offer) {
    card.querySelector(`.popup__type`).textContent = MAP_HOUSING_TYPES_TO_RU[type];
  }

  if (`rooms` in ad.offer && `guests` in ad.offer) {
    if (rooms > Room.ONE_ROOM && rooms < Room.FIVE_ROOMS && guests >= 0) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комнаты для ` + guests + ` гостей`;
    }
    if (rooms === Room.ONE_ROOM && guests === Guest.ONE_GUEST) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комната для ` + guests + ` гостя`;
    }
    if (rooms === Room.ZERO_ROOM || rooms >= Room.FIVE_ROOM || guests >= 0) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комнат для ` + guests + ` гостей`;
    }
  }

  if (`checkin` in ad.offer && `checkout` in ad.offer) {
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + checkin + ` ` + `выезд до ` + checkout;
  }

  if (`description` in ad.offer) {
    card.querySelector(`.popup__description`).textContent = description;
  }
  if (photos) {
    insertPhotosNodes(photos, card);
  }

  if (features) {
    insertFeauturesNodes(ad, card);
  }

  if (`avatar` in ad.author) {
    card.querySelector(`.popup__avatar`).src = avatar;
  }
  card.querySelector(`.popup__close`).addEventListener(`click`, onPopupButtonCloseClick);
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};


window.card = {
  render: renderCard,
  disable: disableCard,
};


