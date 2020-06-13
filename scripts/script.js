import {initialCards} from './data.js'
import {Card} from './Card.js'
import {editValidator} from './formEdit.js'
import {cardContainer, addValidator} from './formAdd.js'
import ErrorImage from '../images/imageError.jpg'
import '../pages/index.css';

initialCards.forEach((item) => {
  cardContainer.append(new Card (item.name, item.link, '#card').getCard());
});
editValidator.enableValidation()
addValidator.enableValidation() 