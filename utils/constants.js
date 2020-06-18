import { FormValidator } from "../components/FormValidator.js";
import ErrorImage from "../images/imageError.jpg";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialCardsData, config } from "../utils/data.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
const formAdd = document.forms.add;
const formEdit = document.forms.edit;
const initialCards = [];
const profileInfo = new UserInfo ({nameSelector: ".profile__name", jobSelector: ".profile__subtitle"})
initialCardsData.forEach((item) => {
  initialCards.push(new Card(item.name, item.link, "#card").getCard());
});
export const addValidator = new FormValidator(config, formAdd);
export const editValidator = new FormValidator(config, formEdit);

export const addPopup = new PopupWithForm(".popup_target_add", {
  formSubmitHandler: function (evt) {
    evt.preventDefault();
    this._getInputValues();
    const cardName = this._inputValues.title;
    let cardLink = this._inputValues.url;
    const img = document.createElement("img");
    img.src = cardLink;
    console.log("submit");
    img.onload = () => {
      cardSection.addItem(
        new Card(cardName, cardLink, "#card").getCard(),
        (item, container) => {
          container.prepend(item);
        }
      );
    };
    img.onerror = () => {
      cardLink = ErrorImage;
      cardSection.addItem(
        new Card(cardName, cardLink, "#card").getCard(),
        (item, container) => {
          container.prepend(item);
        }
      );
    };
    this.close();
  },
  specialOpen: function () {
    addValidator.setDefault(false);
  },
});

export const editPopup = new PopupWithForm(".popup_target_edit", {
  formSubmitHandler: function (evt) {
    evt.preventDefault();
    this._getInputValues();
    profileInfo.setUserInfo({name: this._inputValues.forename, job: this._inputValues.job})
    this.close();
  },
  specialOpen: function () {
    const info = profileInfo.getUserInfo()
    this._inputs.find((item) => {
      return item.getAttribute("name") === "forename";
    }).value = info.name;
    this._inputs.find((item) => {
      return item.getAttribute("name") === "job";
    }).value = info.job; 
    editValidator.setDefault(true);
  },
});

export const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item, container) => {
      container.append(item);
    },
  },
  ".card__container"
);
