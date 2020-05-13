const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__subtitle');
const popupAdd = document.querySelector('.popup_target_add');
const popupEdit = document.querySelector('.popup_target_edit');
const popupImg = document.querySelector('.popup_target_img');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title')
const formAdd = document.forms.add;
const formEdit = document.forms.edit;
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const titleInput = document.querySelector('input[name="title"]');
const urlInput = document.querySelector('input[name="url"]');
const exit = document.querySelectorAll('.popup__exit-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.card__container');
const overlays = document.querySelectorAll('.popup__overlay');
const popups = document.querySelectorAll('.popup');

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

function openCard (evt) {
  popupOpen(popupImg);
  popupImage.src = evt.target.src;
  popupTitle.textContent = evt.target.nextElementSibling.textContent;
}

function destroyEl (evt) {
  const card = evt.target.parentElement;
  const cardImage = card.querySelector('.card__image');
  const cardLike = card.querySelector('.card__like');
  const cardDelete = card.querySelector('.card__delete');  
  cardImage.removeEventListener('click', openCard);
  cardLike.removeEventListener('click', likeSwitch);
  cardDelete .removeEventListener('click', destroyEl);
  card.remove();
}

function likeSwitch (evt) {
  evt.target.classList.toggle ("card__like_mode_active");
}

function popupOpen (popup) {
  popup.classList.add ('popup_display_opened');
  document.addEventListener('keydown', pressEsc);
}

function pressEsc (evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      popupClose(popup);
    })
  }
}

function popupClose (popup) {
  popup.classList.remove ('popup_display_opened');
  document.removeEventListener('keydown', pressEsc);
}

  
function editPopupOpen () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupOpen (popupEdit);
}

function addPopupOpen () {
  popupOpen(popupAdd);
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
  resetForm(evt);
  popupClose(popupEdit);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  const cardName = titleInput.value;
  let cardLink = urlInput.value;
  const img = document.createElement('img');
  img.src = urlInput.value;
  img.onload =  () => {
    cardContainer.prepend(createCard(cardName, cardLink));
  } 
  img.onerror = () => {
    cardLink = './images/imageError.jpg';
    cardContainer.prepend(createCard(cardName, cardLink));
  } 
  resetForm(evt);
  popupClose(popupAdd);
}

function resetForm (evt) {
  setTimeout(() => {evt.target.reset()}, 200);
}


initialCards.forEach( (item) => {
  cardContainer.append(createCard(item.name, item.link));
});
editButton.addEventListener('click', editPopupOpen);
addButton.addEventListener('click', addPopupOpen);
exit.forEach(function (item) { 
  item.addEventListener('click', (evt) => {
    popupClose(evt.target.closest('.popup'))
  }); 
}); 
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);
overlays.forEach ( (overlay) => { 
  overlay.addEventListener('click', (evt) => {
    popupClose(evt.target.closest('.popup'));
  });
});
