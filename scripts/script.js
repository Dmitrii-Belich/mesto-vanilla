import {initialCards, config} from './data.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {formEdit} from './formEdit.js'
import {formAdd} from './formAdd.js'

export const cardContainer = document.querySelector('.card__container');
const exit = document.querySelectorAll('.popup__exit-button');
const overlays = document.querySelectorAll('.popup__overlay');
const popups = document.querySelectorAll('.popup');
const editValidator = new FormValidator (config, formEdit)
const addValidator = new FormValidator (config, formAdd)

function resetForm (form) {
  setTimeout(() => {form.reset()}, 200);
}

export function popupClose (popup) {
  popup.classList.remove ('popup_display_opened');
  document.removeEventListener('keydown', pressEsc);
  const form = popup.querySelector('.popup__container');
  if (form) {
    if (form.name === 'add') {
      addValidator.setDefault(false);
    } else if (form.name === 'edit') {
      editValidator.setDefault(true);
    }
  resetForm(form);
  }
}

function pressEsc (evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      popupClose(popup);
    })
  }
}

export function popupOpen (popup) {
  popup.classList.add ('popup_display_opened');
  document.addEventListener('keydown', pressEsc);
}

exit.forEach(function (item) { 
  item.addEventListener('click', (evt) => {
    popupClose(evt.target.closest('.popup'))
  }); 
}); 
overlays.forEach ( (overlay) => { 
  overlay.addEventListener('click', (evt) => {
    popupClose(evt.target.closest('.popup'));
  });
});
initialCards.forEach( (item) => {
  cardContainer.append(new Card (item.name, item.link, '#card').getCard());
});
editValidator.enableValidation()
addValidator.enableValidation()



