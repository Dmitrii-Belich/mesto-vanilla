import { FormValidator } from "../components/FormValidator.js";
import ErrorImage from "../images/imageError.jpg";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialCardsData, config } from "./data.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
export const imgPopup = new PopupWithImage(".popup_target_img");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
const formAdd = document.forms.add;
const formEdit = document.forms.edit;
const nameInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');
const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
});
const addCard = function (cardName, cardLink) {
  cardSection.addItem(
    new Card(cardName, cardLink, "#card", function (link, name) {
      imgPopup.open(link, name);
    }).getCard()
  );
};

export const addValidator = new FormValidator(config, formAdd);
export const editValidator = new FormValidator(config, formEdit);

const addPopup = new PopupWithForm(".popup_target_add", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  const cardName = inputValues.title;
  let cardLink = inputValues.url;
  const img = document.createElement("img");
  img.src = cardLink;
  img.onload = () => {
    addCard(cardName, cardLink);
  };
  img.onerror = () => {
    cardLink = ErrorImage;
    addCard(cardName, cardLink);
  };
  this.close();
});

const editPopup = new PopupWithForm(".popup_target_edit", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  profileInfo.setUserInfo({
    name: inputValues.forename,
    job: inputValues.job,
  });
  this.close();
});

export const cardSection = new Section(
  {
    items: initialCardsData,
    renderer: function (item) {
      const card = new Card(item.name, item.link, "#card", function (
        link,
        name
      ) {
        imgPopup.open(link, name);
      }).getCard();
      this.addItem(card);
    },
  },
  ".card__container"
);

export const editPopupOpen = function () {
  const info = profileInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;
  editValidator.setDefault(true);
  editPopup.open();
};
export const addPopupOpen = function () {
  addValidator.setDefault(false);
  addPopup.open();
};
