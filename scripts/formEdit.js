import {popupOpen, popupClose} from './script.js'

export const formEdit = document.forms.edit;
const editButton = document.querySelector('.profile__edit-button');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup_target_edit');
const nameInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');

function editPopupOpen () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupOpen (popupEdit);
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

editButton.addEventListener('click', editPopupOpen);
formEdit.addEventListener('submit', formEditSubmitHandler);