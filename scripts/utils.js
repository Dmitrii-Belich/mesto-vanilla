import {editValidator, addValidator} from './script.js'

const exit = document.querySelectorAll('.popup__exit-button');
const overlays = document.querySelectorAll('.popup__overlay');
const popups = document.querySelectorAll('.popup');

function resetForm (form) {
  setTimeout(() => {form.reset()}, 200);
}

export function popupClose (popup) {
  
  popup.classList.remove ('popup_display_opened');
  document.removeEventListener('keydown', pressEsc);
  const form = popup.querySelector('.popup__container');
  setTimeout(() => {
    if (form) {
      if (form.name === 'add') {
        addValidator.setDefault(false);
      } else if (form.name === 'edit') {
        editValidator.setDefault(true);
      }
    }
  }, 200);
  resetForm(form);
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

exit.forEach((item) => { 
  item.addEventListener('click', (evt) => {
    popupClose(evt.target.closest('.popup'))
  }); 
}); 

overlays.forEach ((overlay) => { 
  overlay.addEventListener('click', (evt) => {
    popupClose(evt.target.closest('.popup'));
  });
});
