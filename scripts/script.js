const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__container');
const popupTitle = document.querySelector('.popup__title');
const first = popup.querySelectorAll('.popup__input')[0];
const second = popup.querySelectorAll('.popup__input')[1];
const save = popup.querySelector('.popup__save')
const exit = document.querySelector('.popup__exit-button')
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const cardTemplate = document.querySelector('#card').content;
const cardOpenTemplate = document.querySelector('#cardOpen').content;
const cardContainer = document.querySelector('.card__container');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard (card) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.card__image').src = card.link;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__image').addEventListener('click', openCard);
  newCard.querySelector('.card__like').addEventListener('click', likeSwitch);
  newCard.querySelector('.card__delete').addEventListener('click', destroyEl)
  Array.from(newCard.lastElementChild.children).forEach(function (item) {
    item.addEventListener('mouseover', delButtonShow);
    item.addEventListener('mouseout', delButtonHide);
  })
  cardContainer.append(newCard);
}

function destroyEl (event) {
  event.toElement.parentElement.remove();
}

function likeSwitch (evt) {
  evt.target.classList.toggle ("card__like_mode_unactive");
  evt.target.classList.toggle ("card__like_mode_active");
}
// Чтобы не засорять экран мусорками =)
function delButtonHide(event) {
  if (event.isTrusted === true) {
    event.fromElement.parentElement.querySelector('.card__delete').className = 'card__delete';
    event.fromElement.parentElement.querySelector('.card__delete').classList.add ('card__delete_display_hide');
  } 
}
  
function delButtonShow(event) {
  if (event.isTrusted === true) {
    event.toElement.parentElement.querySelector('.card__delete').className = 'card__delete';
    event.toElement.parentElement.querySelector('.card__delete').classList.add ('card__delete_display_show');    
  } 
}
  
function editPopupOpen () {
  popupTitle.textContent = 'Редактировать профиль';
  first.value = name.textContent;
  second.value = job.textContent;
  first.setAttribute('maxlength' , '30');
  second.setAttribute('maxlength' , '40');
  save.setAttribute('value', 'Сохранить');
  popup.classList.add ('popup_display_opened');
  form.addEventListener('submit', formEditSubmitHandler);
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = first.value;
  job.textContent = second.value;
  name.className = 'profile__name';
  if (name.textContent.length > 25) {
    name.classList.add('profile__name_size_xs');
  } else if (name.textContent.length > 20) {
    name.classList.add('profile__name_size_s');
  } else {
    name.classList.add('profile__name_size_m');
  }
  popupClose();
}

function addPopupOpen () {
  console.log('tutu')
  popupTitle.textContent = 'Новое место';
  first.setAttribute('placeholder' , 'Название');
  second.setAttribute('placeholder' , 'Ссылка на картинку');
  second.setAttribute('type', 'url');
  second.setAttribute('pattern', '.+\.(jpg|png)');
  save.setAttribute('value', 'Создать')
  popup.classList.add ('popup_display_opened');
  form.addEventListener('submit', formAddSubmitHandler);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  let card = {
    name: '',
    link: ''
  }
  card.name = first.value;
  let img = document.createElement('img');
  img.src = second.value;
  img.onerror =  function () {
    cardContainer.lastElementChild.querySelector('.card__image').src = './images/imageError.jpg'
  } 
  card.link = second.value;
  createCard(card);
  popupClose();
}

function popupClose () {
  popup.classList.remove ('popup_display_opened');
  setTimeout(() => {
    popupTitle.textContent = '';
    first.removeAttribute('maxlength');
    second.removeAttribute('maxlength');
    first.removeAttribute('placeholder');
    second.removeAttribute('placeholder');
    second.setAttribute('type', 'text');
    second.removeAttribute('pattern');
    save.removeAttribute('value');
    form.reset();
    form.removeEventListener('submit', formEditSubmitHandler);
    form.removeEventListener('submit', formAddSubmitHandler);
  }, 200);
}

function openCard (evt) {
  const cardOpen = cardOpenTemplate.cloneNode(true);
  console.log(evt);
  console.log(evt.target);
  cardOpen.querySelector('.popup__image-title').textContent = evt.target.parentElement.querySelector('.card__title').textContent;
  cardOpen.querySelector('.popup__image').src = evt.target.src;
  cardOpen.querySelector('.popup__exit-button').addEventListener('click', cardClose);
  cardContainer.append(cardOpen);
  setTimeout(() => {cardContainer.querySelector('.popup').classList.add('popup_display_opened');}, 20);
}

function cardClose (evt) {
  cardContainer.querySelector('.popup').classList.remove('popup_display_opened');
  setTimeout(() => {evt.target.parentElement.parentElement.remove()}, 200);
}

initialCards.forEach(createCard);
editButton.addEventListener('click', editPopupOpen);
addButton.addEventListener('click', addPopupOpen);
exit.addEventListener('click', popupClose);
