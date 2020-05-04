const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__subtitle');
const popupAdd = document.querySelector('.popup_target_add');
const popupEdit = document.querySelector('.popup_target_edit');
const popupImg = document.querySelector('.popup_target_img');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title')
const formAdd = popupAdd.querySelector('.popup__container');
const formEdit = popupEdit.querySelector('.popup__container');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const titleInput = document.querySelector('input[name="title"]');
const urlInput = document.querySelector('input[name="url"]');
const exit = document.querySelectorAll('.popup__exit-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.card__container');

function createCard (name, link) {
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardLike = newCard.querySelector('.card__like');
  const newCardDelete = newCard.querySelector('.card__delete');
  newCardImage.src = link;
  newCardTitle.textContent = name;
  newCardImage.addEventListener('click', openCard);
  newCardLike.addEventListener('click', likeSwitch);
  newCardDelete.addEventListener('click', destroyEl);
  return newCard;
}

function destroyEl (evt) {
  evt.target.parentElement.remove();
}

function likeSwitch (evt) {
  evt.target.classList.toggle ("card__like_mode_active");
}
/* Я не знаю как нормально реализовать отображение корзины
   при наведении на другие блоки через CSS,
   поэтому оставил ее статичной. В ТЗ не было указания скрывать её,
   а последняя попытка не время для эксперементов. */
  
function editPopupOpen () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupOpen (popupEdit);
  formEdit.addEventListener('submit', formEditSubmitHandler);
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  name.className = 'profile__name';
  if (name.textContent.length > 25) {
    name.classList.add('profile__name_size_xs');
  } else if (name.textContent.length > 20) {
    name.classList.add('profile__name_size_s');
  } else {
    name.classList.add('profile__name_size_m');
  }
  popupClose(popupEdit);
}

function addPopupOpen () {
  popupOpen(popupAdd);
  formAdd.addEventListener('submit', formAddSubmitHandler);
} 

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  const cardName = titleInput.value;
  let cardLink = urlInput.value;
  const img = document.createElement('img');
  img.src = urlInput.value;
  img.onload =  function () {
    cardContainer.prepend(createCard(cardName, cardLink));
  } 
  img.onerror =  function () {
    cardLink = './images/imageError.jpg';
    cardContainer.prepend(createCard(cardName, cardLink));
  } 
  /* Если передавать значение в создающуюся карточку, 
  то она создается до того, как определится результат проверки.
  Я не знаю, как побороть эту асинхронность, 
  кроме того, как заставить создание карточки ждать определенное время,
  или добавить две проверки. */
  popupClose(popupAdd);
}

function popupOpen (popup) {
  popup.classList.add ('popup_display_opened');
}

function popupClose (popup) {
  popup = popup.target ? popup.target : popup ;
  popup.closest('.popup').classList.remove ('popup_display_opened');
  if (popup.closest('.popup__container')) {
    setTimeout(() => {popup.closest('.popup__container').reset()}, 200);
  }  else if (popup.querySelector('.popup__container')) {
    setTimeout(() => {popup.querySelector('.popup__container').reset()}, 200);
  }
}

function openCard (evt) {
  popupOpen(popupImg);
  popupImage.src = evt.target.src;
  popupTitle.textContent = evt.target.nextElementSibling.textContent;
}

initialCards.forEach(function (item) {
  cardContainer.append(createCard(item.name, item.link));
});
editButton.addEventListener('click', editPopupOpen);
addButton.addEventListener('click', addPopupOpen);
exit.forEach(function (item) { 
  item.addEventListener('click', popupClose) 
}); 

