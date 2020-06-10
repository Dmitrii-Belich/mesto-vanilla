import {popupOpen, popupClose} from './utils.js'
import {Card} from './Card.js'

export const formAdd = document.forms.add;
export const cardContainer = document.querySelector('.card__container');
const popupAdd = document.querySelector('.popup_target_add');
const titleInput = document.querySelector('input[name="title"]');
const urlInput = document.querySelector('input[name="url"]');
const addButton = document.querySelector('.profile__add-button');

function addPopupOpen () {
  popupOpen(popupAdd);
} 

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  const cardName = titleInput.value;
  let cardLink = urlInput.value;
  const img = document.createElement('img');
  img.src = urlInput.value;
  img.onload =  () => {
    cardContainer.prepend(new Card (cardName, cardLink, '#card').getCard());
  } 
  img.onerror = () => {
    cardLink = './images/imageError.jpg';
    cardContainer.prepend(new Card (cardName, cardLink, '#card').getCard());
  } 
  popupClose(popupAdd);
}

addButton.addEventListener('click', addPopupOpen);
formAdd.addEventListener('submit', formAddSubmitHandler);