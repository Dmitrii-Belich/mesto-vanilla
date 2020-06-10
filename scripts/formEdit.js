import {popupOpen, popupClose} from './utils.js'

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
  popupClose(popupEdit);
}

editButton.addEventListener('click', editPopupOpen);
formEdit.addEventListener('submit', formEditSubmitHandler);