import {initialCards} from './data.js'
import {Card} from './Card.js'
import {editValidator} from './formEdit.js'
import {cardContainer, addValidator} from './formAdd.js'

initialCards.forEach((item) => {
  cardContainer.append(new Card (item.name, item.link, '#card').getCard());
});
editValidator.enableValidation()
addValidator.enableValidation()