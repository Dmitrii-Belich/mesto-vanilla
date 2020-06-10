import {initialCards, config} from './data.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {formEdit} from './formEdit.js'
import {formAdd} from './formAdd.js'
import {cardContainer} from './utils.js'



const editValidator = new FormValidator (config, formEdit)
const addValidator = new FormValidator (config, formAdd)

initialCards.forEach( (item) => {
  cardContainer.append(new Card (item.name, item.link, '#card').getCard());
});
editValidator.enableValidation()
addValidator.enableValidation()