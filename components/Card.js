export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setAttributes() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLike = this._element.querySelector(".card__like");
    this._cardDelete = this._element.querySelector(".card__delete");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
  }

  _openCard() {
    this._handleCardClick(this._link, this._name);
  }

  _likeSwitch(evt) {
    evt.target.classList.toggle("card__like_mode_active");
  }

  _destroyElement(evt) {
    const card = evt.target.parentElement;
    card.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._openCard();
    });
    this._cardLike.addEventListener("click", (evt) => {
      this._likeSwitch(evt);
    });
    this._cardDelete.addEventListener("click", (evt) => {
      this._destroyElement(evt);
    });
  }

  _generateCard() {
    this._setAttributes();
    this._setEventListeners();
  }

  getCard() {
    this._generateCard();
    return this._element;
  }
}
