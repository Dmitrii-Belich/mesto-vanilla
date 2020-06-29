import { FormValidator } from "../components/FormValidator.js";
import ErrorImage from "../images/imageError.jpg";
import PopupWithForm from "../components/PopupWithForm.js";
import { options, config } from "./data.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
export const imgPopup = new PopupWithImage(".popup_target_img");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar-overlay");
const api = new Api(options);
const formAdd = document.forms.add;
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const nameInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');
const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});
const addCard = function (data) {
  cardSection.addItem(
    new Card(
      data,
      "#card",
      function (link, name) {
        imgPopup.open(link, name);
      },
      function (id, evt) {
        if (!evt.target.classList.contains("card__like_mode_active")) {
          return api
            .setLike(id)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              return Promise.resolve(data.likes.length);
            });
        } else {
          return api
            .deleteLike(id)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              return Promise.resolve(data.likes.length);
            });
        }
      },
      function (id, evt) {
        currentCardId = id;
        currentCard = evt.target.parentElement;
        deletePopup.open();
      }
    ).getCard()
  );
};

export const addValidator = new FormValidator(config, formAdd);
export const editValidator = new FormValidator(config, formEdit);
export const avatarValidator = new FormValidator(config, formAvatar);

const addPopup = new PopupWithForm(".popup_target_add", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Создание...";
  const cardName = inputValues.title;
  let cardLink = inputValues.url;
  const img = document.createElement("img");
  img.src = cardLink;
  img.onload = () => {
    api
      .createCard({ name: cardName, link: cardLink })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        addCard(data);
        this._buttonElement.textContent = "Создать";
        this.close();
      });
  };
  img.onerror = () => {
    /*     cardLink = ErrorImage;
    addCard(cardName, cardLink); */
  };
});

const editPopup = new PopupWithForm(".popup_target_edit", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Сохранение...";
  api
    .setUserInfo({
      name: inputValues.forename,
      about: inputValues.job,
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileInfo.setUserInfo({
        name: data.name,
        job: data.about,
      });
      this.close();
      this._buttonElement.textContent = "Сохранить";
    });
});

export const avatarPopup = new PopupWithForm(".popup_target_avatar", function (
  evt,
  inputValues
) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Сохранение...";
  api
    .setUserAvatar({ avatar: inputValues.avatar })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileInfo.setUserAvatar(data.avatar);
      this.close();
      this._buttonElement.textContent = "Сохранить";
    });
});

export const deletePopup = new PopupWithForm(".popup_target_delete", function (
  evt
) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Удаление...";
  api
    .deleteCard(currentCardId)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      currentCard.remove();
      this._buttonElement.textContent = "Да";
      this.close();
    });
});

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

export const avatarPopupOpen = function () {
  avatarValidator.setDefault(false);
  avatarPopup.open();
};

let cardSection = undefined;
let currentCardId = undefined;
let currentCard = undefined;
api
  .getInitialCards()
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    cardSection = new Section(
      {
        items: data,
        renderer: function (item) {
          const card = new Card(
            item,
            "#card",
            function (link, name) {
              imgPopup.open(link, name);
            },
            function (id, evt) {
              if (!evt.target.classList.contains("card__like_mode_active")) {
                return api
                  .setLike(id)
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    return Promise.resolve(data.likes.length);
                  });
              } else {
                return api
                  .deleteLike(id)
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    return Promise.resolve(data.likes.length);
                  });
              }
            },
            function (id, evt) {
              currentCardId = id;
              currentCard = evt.target.parentElement;
              deletePopup.open();
            }
          ).getCard();
          this.addItem(card, true);
        },
      },
      ".card__container"
    );
    cardSection.renderItems();
  });
api
  .getUserInformation()
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    profileInfo.setUserInfo({ name: data.name, job: data.about });
    profileInfo.setUserAvatar(data.avatar);
  });
