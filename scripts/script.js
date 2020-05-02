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
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardLike = newCard.querySelector('.card__like');
  const newCardDelete = newCard.querySelector('.card__delete');
  newCardImage.src = card.link;
  newCardTitle.textContent = card.name;
  newCardImage.addEventListener('click', openCard);
  newCardLike.addEventListener('click', likeSwitch);
  newCardDelete.addEventListener('click', destroyEl);
  Array.from(newCard.lastElementChild.children).forEach(function (item) {
    item.addEventListener('mouseover', delButtonShow);
    item.addEventListener('mouseout', delButtonHide);
  });
  cardContainer.prepend(newCard);
}

function destroyEl (evt) {
  evt.target.parentElement.remove();
}

function likeSwitch (evt) {
  evt.target.classList.toggle ("card__like_mode_active");
}

function delButtonHide(evt) {
  const deleteHide = evt.target.parentElement.querySelector('.card__delete');
  deleteHide.classList.remove ('card__delete_display_show');  
}
  
function delButtonShow(evt) {
  const deleteShow =  evt.target.parentElement.querySelector('.card__delete');
  deleteShow.classList.add ('card__delete_display_show');    
}
  
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
  popupClose(evt);
}

function addPopupOpen () {
  popupOpen(popupAdd);
  formAdd.addEventListener('submit', formAddSubmitHandler);
} 

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  let card = {
    name: '',
    link: ''
  }
  card.name = titleInput.value;
  let img = document.createElement('img');
  img.src = urlInput.value;
  img.onerror =  function () {
    cardContainer.firstElementChild.querySelector('.card__image').src = './images/imageError.jpg'
  } 
  card.link = urlInput.value;
  createCard(card);
  popupClose(evt);
}

function popupOpen (popup) {
  popup.classList.add ('popup_display_opened');
}

function popupClose (evt) {
  evt.target.closest('.popup').classList.remove ('popup_display_opened');
  setTimeout(() => {
    formEdit.reset();
    formAdd.reset();
  }, 200);
  formEdit.removeEventListener('submit', formEditSubmitHandler);
  formAdd.removeEventListener('submit', formAddSubmitHandler);
 
}

function openCard (evt) {
  popupOpen(popupImg);
  popupImage.src = evt.target.src;
  popupTitle.textContent = evt.target.nextElementSibling.textContent;
}

initialCards.forEach(createCard);
editButton.addEventListener('click', editPopupOpen);
addButton.addEventListener('click', addPopupOpen);
exit.forEach(function (item) {
  item.addEventListener('click', popupClose)
});

