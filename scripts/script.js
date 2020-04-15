const formEditElement = document.querySelector('.popup_button_edit').querySelector('.popup__container');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.popup_button_edit').querySelector('.popup__exit-button');
const name = document.querySelector('.profile__name');
const subtitle = document.querySelector('.profile__subtitle'); 
const nameInput = document.querySelector('.popup_input__el_name');
const jobInput = document.querySelector('.popup_input__el_subtitle');
const open = document.querySelector('.popup_button_edit');
const close = document.querySelector('.popup_button_edit');

function formEditOpen () {
  nameInput.value = name.textContent;
  jobInput.value = subtitle.textContent;
  open.classList.add ('popup_display_opened');
}

function formEditClose () {
  close.classList.remove ('popup_display_opened');
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  name.className = 'profile__name';
  if (name.textContent.length > 25) {
    name.classList.add('profile__name_size_xs');
  } else if (name.textContent.length > 20) {
    name.classList.add('profile__name_size_s');
  } else {
    name.classList.add('profile__name_size_m');
  }
  formEditClose();
}

formEditElement.addEventListener('submit', formEditSubmitHandler);
editButton.addEventListener('click', formEditOpen);
closeEditButton.addEventListener('click', formEditClose);

