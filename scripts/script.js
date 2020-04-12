let formEditElement = document.querySelector('.popup_button_edit').querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let closeEditButton = document.querySelector('.popup_button_edit').querySelector('.popup__exit-button');
let like = document.querySelectorAll('.element__like');
let addButton = document.querySelector('.profile__add-button');
let formAddElement = document.querySelector('.popup_button_add').querySelector('.popup__container');
let closeAddButton = document.querySelector('.popup_button_add').querySelector('.popup__exit-button');

function formEditOpen () {
  let name = document.querySelector('.profile__name');
  let subtitle = document.querySelector('.profile__subtitle'); 
  let nameInput = document.querySelector('.popup_input__el_name');
  let jobInput = document.querySelector('.popup_input__el_subtitle');
  nameInput.value = name.textContent;
  jobInput.value = subtitle.textContent;
  let open = document.querySelector('.popup_button_edit');
  open.classList.add ('popup_display_opened');
}

function formEditClose () {
  let close = document.querySelector('.popup_button_edit');
  close.classList.remove ('popup_display_opened');
}

function formEditSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup_input__el_name').value;
    let jobInput = document.querySelector('.popup_input__el_subtitle').value;
    console.log(nameInput, jobInput);
    let name = document.querySelector('.profile__name');
    let subtitle = document.querySelector('.profile__subtitle');
    name.textContent = nameInput;
    subtitle.textContent = jobInput;
    name.className = 'profile__name';
    if (name.textContent.length > 25) {
      name.classList.add('profile__name_size_xs');
    }
    else if (name.textContent.length > 20) {
      name.classList.add('profile__name_size_s');
    } else {
      name.classList.add('profile__name_size_m');
    }
    formEditClose();
}

function formAddOpen () {
  let open = document.querySelector('.popup_button_add');
  open.classList.add ('popup_display_opened');
}

function formAddClose () {
  let close = document.querySelector('.popup_button_add');
  close.classList.remove ('popup_display_opened');
}

function AddCard (file) {
  let title = document.querySelector('.popup__input_el_title');
  console.log(title);
  let elements = document.querySelector('.elements');
  elements.insertAdjacentHTML('beforeend', `<div class="element">
  <img src="${file.target.result}" alt="" class="element__image">
  <h2 class="element__title">${title.value}</h2>
  <img src="./images/like.svg" alt="" class="element__like">
  </div>`);
  formAddElement.reset();
}

function formAddSubmitHandler (event) {
  event.preventDefault();
  let file = document.querySelector('.popup__input_el_image');
  var fr = new FileReader();
  fr.readAsDataURL(file.files[0]);
  fr.addEventListener("load", AddCard);
}

function likeActive(event) {
  if (event.toElement.src.indexOf('/images/like.svg') !== -1) {
    event.toElement.setAttribute('src', './images/like-active.svg');
  } else {
    event.toElement.setAttribute('src', './images/like.svg');
  }
}

formEditElement.addEventListener('submit', formEditSubmitHandler);
editButton.addEventListener('click', formEditOpen);
closeEditButton.addEventListener('click', formEditClose);
for (let i = 0; i<like.length; i++) {
like[i].addEventListener('click', likeActive);
}
addButton.addEventListener('click', formAddOpen);
formAddElement.addEventListener('submit', formAddSubmitHandler);
closeAddButton.addEventListener('click', formAddClose);