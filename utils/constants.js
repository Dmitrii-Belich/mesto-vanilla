import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { options, config } from "./data.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

let cardSection = undefined;
let currentCardId = undefined;
let currentCard = undefined;

const imgPopup = new PopupWithImage(".popup_target_img");
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
          return api.setLike(id)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data) => {
              return Promise.resolve(data.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return api.deleteLike(id)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data) => {
              return Promise.resolve(data.likes.length);
            })
            .catch((err) => {
              console.log(err);
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

const addPopup = new PopupWithForm(".popup_target_add", function (evt, inputValues) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Создание...";
  const cardName = inputValues.title;
  let cardLink = inputValues.url;
  const img = document.createElement("img");
  img.src = cardLink;
  img.onload = () => {
    api.createCard({ name: cardName, link: cardLink })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        addCard(data);
        this._buttonElement.textContent = "Создать";
        this.close();
      })
      .catch((err) => {
        if (err.toString().includes("Ошибка:", 0)) {
          this.showError(err);
        } else {
          this.showError("Невозможно загрузить карточку, попробуйте снова");
        }
        this._buttonElement.textContent = "Создать";
      });
  };
  img.onerror = () => {
    this.showError("Невозможно загрузить ваше изображение, попробуйте снова");
    this._buttonElement.textContent = "Создать";
  };
});

const editPopup = new PopupWithForm(".popup_target_edit", function (evt, inputValues) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Сохранение...";
  api.setUserInfo({
      name: inputValues.forename,
      about: inputValues.job,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileInfo.setUserInfo({
        name: data.name,
        job: data.about,
      });
      this.close();
      this._buttonElement.textContent = "Сохранить";
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        this.showError(err);
      } else {
        this.showError("Невозможно загрузить данные, попробуйте снова");
      }
      this._buttonElement.textContent = "Сохранить";
    });
});

const avatarPopup = new PopupWithForm(".popup_target_avatar", function (evt, inputValues) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Сохранение...";
  api.setUserAvatar({ avatar: inputValues.avatar })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      if (data.errors) {
        this.showError(
          `Невозможно загрузить данные, ${data.errors.avatar.message}, попробуйте снова`
        );
        this._buttonElement.textContent = "Сохранить";
      } else {
        profileInfo.setUserAvatar(data.avatar);
        this.close();
        this._buttonElement.textContent = "Сохранить";
      }
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        this.showError(err);
      } else {
        this.showError("Невозможно загрузить данные, попробуйте снова");
      }
      this._buttonElement.textContent = "Сохранить";
    });
});

const deletePopup = new PopupWithForm(".popup_target_delete", function (evt) {
  evt.preventDefault();
  this._buttonElement = this._popupElement.querySelector(".popup__save");
  this._buttonElement.textContent = "Удаление...";
  api.deleteCard(currentCardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      currentCard.remove();
      this._buttonElement.textContent = "Да";
      this.close();
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        this.showError(err);
      } else {
        this.showError("Невозможно удалить карточку, попробуйте снова");
      }
      this._buttonElement.textContent = "Да";
    });
});

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar-overlay");
export const addValidator = new FormValidator(config, formAdd);
export const editValidator = new FormValidator(config, formEdit);
export const avatarValidator = new FormValidator(config, formAvatar);
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

export const initialRender = function () {
  api.getInitialCards()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
                      if (res.ok) {
                        return res.json();
                      }
                      return Promise.reject(`Ошибка: ${res.status}`);
                    })
                    .then((data) => {
                      return Promise.resolve(data.likes.length);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  return api
                    .deleteLike(id)
                    .then((res) => {
                      if (res.ok) {
                        return res.json();
                      }
                      return Promise.reject(`Ошибка: ${res.status}`);
                    })
                    .then((data) => {
                      return Promise.resolve(data.likes.length);
                    })
                    .catch((err) => {
                      console.log(err);
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
    })
    .catch((err) => {
      if (err.toString().includes("Ошибка:", 0)) {
        console.log(err);
      } else {
        console.log("Не удалось загрузить карточки");
      }
    });
  api.getUserInformation()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileInfo.setUserInfo({ name: data.name, job: data.about });
      profileInfo.setUserAvatar(data.avatar);
    })
    .catch(() => {
      if (err.toString().includes("Ошибка:", 0)) {
        console.log(err);
      } else {
        profileInfo.setUserInfo({
          name: "Не удалось загрузить данные",
          job: "Не удалось загрузить данные",
        });
      }
    });
}