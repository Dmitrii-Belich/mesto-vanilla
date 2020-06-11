const exit = document.querySelectorAll('.popup__exit-button');
const overlays = document.querySelectorAll('.popup__overlay');

function resetForm (form) {
  if (form) {
  setTimeout(() => {form.reset()}, 200);
  }
}

export function popupClose (popup) {
  popup.classList.remove ('popup_display_opened');
  document.removeEventListener('keydown', pressEsc);
  const form = popup.querySelector('.popup__container');
  resetForm(form);
  }

function pressEsc(evt) {
  const openedPopup = document.querySelector('.popup_display_opened')
    if (evt.key === 'Escape') {
      popupClose(openedPopup);
    }
  }

export function popupOpen (popup) {
  popup.classList.add ('popup_display_opened');
  document.addEventListener('keydown', pressEsc)
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
