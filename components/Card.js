export class Card {
  constructor(cardData, cardSelector, handleCardClick, likeRenderer, deleteRenderer) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeConunt = cardData.likes.length;
    this._cardId = cardData._id;
    this._likeRenderer = likeRenderer;
    this._likes = cardData.likes;
    this._cardOwner = cardData.owner._id;
    this._deleteRenderer = deleteRenderer;
  }

  _setAttributes() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLike = this._element.querySelector(".card__like");
    this._cardLikeCount = this._element.querySelector(".card__like-count");
    this._cardDelete = this._element.querySelector(".card__delete");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardLikeCount.textContent = this._likeConunt;
    if (this._likes.some((item) => {return item._id === 'b93f5f7a5c6ac4656761436b'})) {
      this._cardLike.classList.add("card__like_mode_active");
    }
    if (this._cardOwner !== 'b93f5f7a5c6ac4656761436b') {
      this._cardDelete.remove()
    }
  }

  _openCard() {
    this._handleCardClick(this._link, this._name);
  }

  _likeSwitch(evt) {
    this._likeRenderer(this._cardId, evt).then((likeCount)=> {
    this._cardLikeCount.textContent = likeCount;
    evt.target.classList.toggle("card__like_mode_active");
  })
  }

  _destroyElement(evt) {
    this._deleteRenderer(this._cardId, evt)
    /* const card = evt.target.parentElement;
    card.remove();
    this._element = null; */
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._openCard();
    });
    this._cardLike.addEventListener("click", (evt) => {
      this._likeSwitch(evt);
    });
    if(this._cardDelete) {
    this._cardDelete.addEventListener("click", (evt) => {
      this._destroyElement(evt);
    });
  }
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
