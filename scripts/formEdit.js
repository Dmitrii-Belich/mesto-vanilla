import {popupOpen, popupClose} from './utils.js'
import {FormValidator} from './FormValidator.js'
import {config} from './data.js'

const formEdit = document.forms.edit;
const editButton = document.querySelector('.profile__edit-button');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup_target_edit');
const nameInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');
export const editValidator = new FormValidator (config, formEdit)

function editPopupOpen () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupOpen (popupEdit);
  editValidator.setDefault(true);
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose(popupEdit);
}

editButton.addEventListener('click', editPopupOpen);
formEdit.addEventListener('submit', formEditSubmitHandler);
